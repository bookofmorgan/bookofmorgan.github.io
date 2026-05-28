import Image from "next/image";

export function BeforeAfter({
  before,
  after,
  beforeLabel = "before",
  afterLabel = "after",
  alt,
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
}) {
  return (
    <figure className="my-10 max-w-[78ch] grid grid-cols-1 md:grid-cols-2 gap-3">
      {[
        { src: before, label: beforeLabel },
        { src: after, label: afterLabel },
      ].map(({ src, label }) => (
        <div
          key={label}
          className="aspect-[4/3] border border-border bg-bg-elev relative overflow-hidden"
        >
          <Image
            src={src}
            alt={`${label} — ${alt}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest uppercase text-accent bg-bg/70 px-2 py-1 backdrop-blur-sm">
            {label}
          </div>
        </div>
      ))}
    </figure>
  );
}
