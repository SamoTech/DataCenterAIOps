import { FeedbackForm } from "@/components/feedback-form";
import { MetricCard } from "@/components/metric-card";
import { SectionCard } from "@/components/section-card";
import { incidents, services, telemetryOverview } from "@/lib/mock-data";

const severityClass: Record<string, string> = {
  critical: "sev critical",
  high: "sev high",
  medium: "sev medium",
  low: "sev low"
};

const statusClass: Record<string, string> = {
  open: "status open",
  investigating: "status investigating",
  mitigated: "status mitigated"
};

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="hero">
        <div>
          <span className="eyebrow">DataCenterAIOps</span>
          <h1>Correlate logs, metrics, and traces into smart incidents.</h1>
          <p>
            A starter open-source AIOps dashboard for modern teams. Monitor service health,
            reduce alert noise, collect beta feedback, and surface likely root causes in one place.
          </p>
        </div>
        <div className="hero-panel">
          <div className="hero-badge">Risk score: {telemetryOverview.riskScore}/100</div>
          <p>
            {telemetryOverview.activeIncidents} active incidents, {telemetryOverview.correlatedSignals} correlated signals,
            estimated MTTR {telemetryOverview.mttrEstimate}.
          </p>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Active incidents"
          value={telemetryOverview.activeIncidents}
          helper="Issues that still need attention"
        />
        <MetricCard
          label="Monitored services"
          value={telemetryOverview.monitoredServices}
          helper="Core APIs, workers, and databases"
        />
        <MetricCard
          label="Noisy alerts reduced"
          value={telemetryOverview.noisyAlertsReduced}
          helper="Correlated into fewer action items"
        />
        <MetricCard
          label="Estimated MTTR"
          value={telemetryOverview.mttrEstimate}
          helper="Recovery time after triage"
        />
      </div>

      <SectionCard title="Early access" subtitle="Let users try the concept, rate it, and request what should ship next">
        <div className="early-access-grid">
          <div className="early-access-copy">
            <div className="beta-pill">Live demo</div>
            <h3>Validate the product before full release.</h3>
            <p>
              Use this section to capture interest, collect quick product ratings, and learn which integrations matter most.
            </p>
            <ul className="check-list">
              <li>Collect a simple 1-5 rating</li>
              <li>Capture email and role for follow-up</li>
              <li>Ask what feature should come next</li>
            </ul>
          </div>
          <FeedbackForm />
        </div>
      </SectionCard>

      <div className="content-grid">
        <SectionCard title="Incident feed" subtitle="Correlated incidents with impact and root-cause hints">
          <div className="incident-list">
            {incidents.map((incident) => (
              <article key={incident.id} className="incident-item">
                <div className="incident-top">
                  <div>
                    <div className="incident-id">{incident.id}</div>
                    <h3>{incident.title}</h3>
                  </div>
                  <div className="incident-tags">
                    <span className={severityClass[incident.severity]}>{incident.severity}</span>
                    <span className={statusClass[incident.status]}>{incident.status}</span>
                  </div>
                </div>
                <div className="incident-meta">
                  <span>Service: {incident.service}</span>
                  <span>Started: {incident.startedAt}</span>
                  <span>Impact: {incident.impactedUsers}</span>
                </div>
                <p className="hint">Likely cause: {incident.rootCauseHint}</p>
                <div className="signals-row">
                  {incident.signals.map((signal) => (
                    <span key={signal} className="signal-chip">
                      {signal}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Service health" subtitle="Live posture across your most important systems">
          <div className="service-table-wrap">
            <table className="service-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Latency</th>
                  <th>Error rate</th>
                  <th>Uptime</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.name}>
                    <td>{service.name}</td>
                    <td>
                      <span className={`service-state ${service.status}`}>{service.status}</span>
                    </td>
                    <td>{service.latencyMs} ms</td>
                    <td>{service.errorRate}%</td>
                    <td>{service.uptime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="What this MVP proves" subtitle="A clean base for your next commits">
        <div className="proof-grid">
          <div>
            <h3>Unified view</h3>
            <p>One dashboard for incidents, telemetry posture, and service health.</p>
          </div>
          <div>
            <h3>Actionable triage</h3>
            <p>Every incident includes severity, impact, and a likely root-cause hint.</p>
          </div>
          <div>
            <h3>Extendable API</h3>
            <p>Add OpenTelemetry, Slack, Telegram, auth, feedback storage, and persistence without rewriting the core.</p>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
