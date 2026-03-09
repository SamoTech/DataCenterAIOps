export type Severity = "critical" | "high" | "medium" | "low";

export type Incident = {
  id: string;
  title: string;
  severity: Severity;
  severityScore: number;
  status: "open" | "investigating" | "mitigated";
  service: string;
  startedAt: string;
  detectedAt: string;
  durationMinutes: number;
  signals: string[];
  impactedUsers: string;
  impactedSystems: string[];
  rootCauseHint: string;
};

export type ServiceHealth = {
  name: string;
  status: "healthy" | "degraded" | "down";
  latencyMs: number;
  errorRate: number;
  uptime: string;
  region: string;
  owner: string;
  saturation: number;
};

const severityWeights: Record<Severity, number> = {
  critical: 40,
  high: 28,
  medium: 16,
  low: 8
};

export const incidents: Incident[] = [
  {
    id: "INC-1024",
    title: "Payment latency spike correlated with Redis saturation",
    severity: "critical",
    severityScore: severityWeights.critical,
    status: "investigating",
    service: "payments-api",
    startedAt: "3 min ago",
    detectedAt: "2026-03-09T21:01:00Z",
    durationMinutes: 3,
    signals: ["latency", "5xx", "cpu", "queue depth"],
    impactedUsers: "21% checkout sessions",
    impactedSystems: ["checkout-ui", "redis-cluster", "worker-pool"],
    rootCauseHint: "Redis queue pressure after burst traffic from checkout workers"
  },
  {
    id: "INC-1023",
    title: "Notification backlog detected on worker cluster",
    severity: "high",
    severityScore: severityWeights.high,
    status: "open",
    service: "notify-worker",
    startedAt: "12 min ago",
    detectedAt: "2026-03-09T20:52:00Z",
    durationMinutes: 12,
    signals: ["queue lag", "retry spike"],
    impactedUsers: "Delayed emails and SMS",
    impactedSystems: ["mail-queue", "sms-provider", "job-runner"],
    rootCauseHint: "Worker concurrency lower than inbound job rate"
  },
  {
    id: "INC-1022",
    title: "Search API elevated error ratio",
    severity: "medium",
    severityScore: severityWeights.medium,
    status: "mitigated",
    service: "search-api",
    startedAt: "28 min ago",
    detectedAt: "2026-03-09T20:36:00Z",
    durationMinutes: 28,
    signals: ["4xx/5xx", "trace failures"],
    impactedUsers: "Partial search failures",
    impactedSystems: ["search-cache", "query-router"],
    rootCauseHint: "Recent cache invalidation caused hot shard pressure"
  }
];

export const services: ServiceHealth[] = [
  {
    name: "payments-api",
    status: "degraded",
    latencyMs: 924,
    errorRate: 4.9,
    uptime: "99.82%",
    region: "us-east-1",
    owner: "payments",
    saturation: 87
  },
  {
    name: "notify-worker",
    status: "degraded",
    latencyMs: 411,
    errorRate: 2.1,
    uptime: "99.91%",
    region: "eu-central-1",
    owner: "messaging",
    saturation: 73
  },
  {
    name: "search-api",
    status: "healthy",
    latencyMs: 168,
    errorRate: 0.4,
    uptime: "99.97%",
    region: "us-east-1",
    owner: "discovery",
    saturation: 36
  },
  {
    name: "auth-gateway",
    status: "healthy",
    latencyMs: 92,
    errorRate: 0.1,
    uptime: "99.99%",
    region: "global-edge",
    owner: "identity",
    saturation: 19
  },
  {
    name: "billing-db",
    status: "healthy",
    latencyMs: 20,
    errorRate: 0,
    uptime: "99.995%",
    region: "us-east-1",
    owner: "finance-platform",
    saturation: 24
  }
];

const activeIncidents = incidents.filter((incident) => incident.status !== "mitigated");
const degradedServices = services.filter((service) => service.status === "degraded").length;
const healthyServices = services.filter((service) => service.status === "healthy").length;
const correlatedSignals = new Set(incidents.flatMap((incident) => incident.signals)).size;
const averageDurationMinutes = Math.round(
  activeIncidents.reduce((total, incident) => total + incident.durationMinutes, 0) / activeIncidents.length
);
const riskScore = Math.min(
  100,
  activeIncidents.reduce((total, incident) => total + incident.severityScore, 0) + degradedServices * 7
);
const serviceAvailability = `${((healthyServices / services.length) * 100).toFixed(0)}%`;

export const telemetryOverview = {
  activeIncidents: activeIncidents.length,
  correlatedSignals,
  noisyAlertsReduced: "68%",
  monitoredServices: services.length,
  mttrEstimate: `${averageDurationMinutes} min`,
  riskScore,
  degradedServices,
  healthyServices,
  serviceAvailability,
  lastUpdated: "2026-03-09T21:04:00Z"
};
