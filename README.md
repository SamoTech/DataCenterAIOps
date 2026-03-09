# DataCenterAIOps

Open-source AIOps control center for logs, metrics, traces, and incidents.

DataCenterAIOps is a lightweight MVP that turns telemetry into a clean incident dashboard with service health, severity scoring, noisy alert reduction, and root-cause hints.

## What is included

- Next.js dashboard for incidents, services, and telemetry overview
- Mock AIOps engine with correlated incidents and impact scoring
- API endpoints for incidents, services, and telemetry ingest
- Clean starter structure for extending into a full platform

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## API routes

- `GET /api/incidents`
- `GET /api/services`
- `GET /api/telemetry`
- `POST /api/telemetry`

Example ingest request:

```bash
curl -X POST http://localhost:3000/api/telemetry \
  -H "Content-Type: application/json" \
  -d '{
    "service": "payments-api",
    "signal": "latency",
    "value": 920,
    "severity": "high",
    "message": "Latency spike detected"
  }'
```

## Project structure

```text
app/
  api/
  globals.css
  layout.tsx
  page.tsx
components/
  metric-card.tsx
  section-card.tsx
lib/
  mock-data.ts
```

## MVP direction

This starter is designed to evolve into:

- OpenTelemetry ingestion
- Alert correlation engine
- Incident timeline
- AI root-cause assistant
- Slack and Telegram notifications
- Postmortem generation

## License

MIT
