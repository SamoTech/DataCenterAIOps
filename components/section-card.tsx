type SectionCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <section className="section-card">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
