export function Hypothesis({
  belief,
  reason,
  signal,
}: {
  belief: string;
  reason: string;
  signal: string;
}) {
  return (
    <aside className="my-10 border border-border bg-bg-elev relative max-w-[68ch]">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
      <div className="pl-7 pr-6 py-6">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-accent mb-5">
          // hypothesis
        </div>
        <dl className="space-y-3 font-sans text-[15px] leading-[1.65] text-text">
          <div>
            <dt className="inline text-text-dim mr-2">We believed</dt>
            <dd className="inline">{belief}.</dd>
          </div>
          <div>
            <dt className="inline text-text-dim mr-2">Because</dt>
            <dd className="inline">{reason}.</dd>
          </div>
          <div>
            <dt className="inline text-text-dim mr-2">We&apos;d know if</dt>
            <dd className="inline">{signal}.</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
