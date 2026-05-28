import Image from "next/image";

export function Gallery({
  items,
  cols = 2,
}: {
  items: { src: string; alt: string; caption?: string }[];
  cols?: 2 | 3;
}) {
  const gridCols = cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <figure className={`my-10 grid grid-cols-1 ${gridCols} gap-3 max-w-none`}>
      {items.map((item, i) => (
        <div key={i} className="space-y-2">
          <div className="aspect-[4/3] border border-border bg-bg-elev relative overflow-hidden">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
          {item.caption && (
            <figcaption className="font-mono text-[11px] text-text-dim">
              {item.caption}
            </figcaption>
          )}
        </div>
      ))}
    </figure>
  );
}
