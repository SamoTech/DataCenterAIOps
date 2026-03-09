import { telemetryOverview } from "@/lib/mock-data";

type TelemetryPayload = {
  service?: string;
  signal?: string;
  value?: number;
  severity?: string;
  message?: string;
};

export async function GET() {
  return Response.json({
    overview: telemetryOverview,
    supportedSignals: ["latency", "errors", "cpu", "memory", "queue_depth", "trace_failures"],
    generatedAt: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as TelemetryPayload;

  if (!body.service || !body.signal) {
    return Response.json(
      {
        ok: false,
        message: "service and signal are required"
      },
      { status: 400 }
    );
  }

  const severity = body.severity ?? "medium";
  const recommendation =
    severity === "critical" || severity === "high"
      ? "Open an incident and correlate recent traces, logs, and dependency saturation."
      : "Track the signal and continue anomaly monitoring.";

  return Response.json({
    ok: true,
    accepted: {
      service: body.service,
      signal: body.signal,
      value: body.value ?? null,
      severity,
      message: body.message ?? "Telemetry event received"
    },
    aiops: {
      incidentSuggested: severity === "critical" || severity === "high",
      recommendation
    },
    receivedAt: new Date().toISOString()
  });
}
