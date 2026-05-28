export function Quote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="my-12 max-w-[68ch] border-l-2 border-accent pl-6">
      <blockquote className="font-sans italic text-xl md:text-2xl leading-snug text-text">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="font-mono text-xs text-text-dim mt-4 flex items-center gap-2">
          <span className="text-accent">—</span>
          <span>{attribution}</span>
        </figcaption>
      )}
    </figure>
  );
}
