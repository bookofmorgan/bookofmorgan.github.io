export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="inline-flex flex-col mr-10 mb-6 align-top">
      <div className="font-mono text-5xl md:text-6xl text-accent leading-none tracking-tight">
        {value}
      </div>
      <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-text-dim mt-3">
        {label}
      </div>
    </div>
  );
}
