# DataCenterAIOps

Open-source AIOps control center for logs, metrics, traces, and incidents.

DataCenterAIOps is a lightweight MVP that turns telemetry into a clean incident dashboard with service health, severity scoring, noisy alert reduction, root-cause hints, and an in-app beta feedback flow for early user validation.

## What is included

- Next.js dashboard for incidents, services, and telemetry overview
- Mock AIOps engine with correlated incidents and impact scoring
- API endpoints for incidents, services, telemetry ingest, and beta feedback
- Early-access and user rating form directly inside the demo
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
- `POST /api/feedback`

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

Example feedback request:

```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ossama",
    "email": "beta@example.com",
    "rating": 5,
    "role": "DevOps Engineer",
    "message": "Strong concept, I want alert routing and Telegram integration"
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
  feedback-form.tsx
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
- Persistent beta feedback storage
- Postmortem generation

## License

MIT
