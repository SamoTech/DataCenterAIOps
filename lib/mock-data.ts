export type Severity = "critical" | "high" | "medium" | "low";

export type Incident = {
  id: string;
  title: string;
  severity: Severity;
  status: "open" | "investigating" | "mitigated";
  service: string;
  startedAt: string;
  signals: string[];
  impactedUsers: string;
  rootCauseHint: string;
};

export type ServiceHealth = {
  name: string;
  status: "healthy" | "degraded" | "down";
  latencyMs: number;
  errorRate: number;
  uptime: string;
};

export const incidents: Incident[] = [
  {
    id: "INC-1024",
    title: "Payment latency spike correlated with Redis saturation",
    severity: "critical",
    status: "investigating",
    service: "payments-api",
    startedAt: "3 min ago",
    signals: ["latency", "5xx", "cpu", "queue depth"],
    impactedUsers: "21% checkout sessions",
    rootCauseHint: "Redis queue pressure after burst traffic from checkout workers"
  },
  {
    id: "INC-1023",
    title: "Notification backlog detected on worker cluster",
    severity: "high",
    status: "open",
    service: "notify-worker",
    startedAt: "12 min ago",
    signals: ["queue lag", "retry spike"],
    impactedUsers: "Delayed emails and SMS",
    rootCauseHint: "Worker concurrency lower than inbound job rate"
  },
  {
    id: "INC-1022",
    title: "Search API elevated error ratio",
    severity: "medium",
    status: "mitigated",
    service: "search-api",
    startedAt: "28 min ago",
    signals: ["4xx/5xx", "trace failures"],
    impactedUsers: "Partial search failures",
    rootCauseHint: "Recent cache invalidation caused hot shard pressure"
  }
];

export const services: ServiceHealth[] = [
  { name: "payments-api", status: "degraded", latencyMs: 924, errorRate: 4.9, uptime: "99.82%" },
  { name: "notify-worker", status: "degraded", latencyMs: 411, errorRate: 2.1, uptime: "99.91%" },
  { name: "search-api", status: "healthy", latencyMs: 168, errorRate: 0.4, uptime: "99.97%" },
  { name: "auth-gateway", status: "healthy", latencyMs: 92, errorRate: 0.1, uptime: "99.99%" },
  { name: "billing-db", status: "healthy", latencyMs: 20, errorRate: 0, uptime: "99.995%" }
];

export const telemetryOverview = {
  activeIncidents: incidents.filter((incident) => incident.status !== "mitigated").length,
  correlatedSignals: 17,
  noisyAlertsReduced: "68%",
  monitoredServices: services.length,
  mttrEstimate: "11 min",
  riskScore: 82
};
