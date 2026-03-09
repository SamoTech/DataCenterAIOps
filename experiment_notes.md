# Experiment Notes

## Iteration 1

- Target file: `lib/mock-data.ts`
- Evaluation harness: Static TypeScript contract review against existing Next.js consumers
- Metric: incident analytical fields per record
- Previous metric: 9
- New metric: 13
- Decision: keep
- Rationale: Added deterministic timestamps, durations, severity scores, impacted systems, and richer service metadata without changing existing consumer fields.
