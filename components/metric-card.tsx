type MetricCardProps = {
  label: string;
  value: string | number;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-helper">{helper}</div>
    </div>
  );
}
