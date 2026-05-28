import Image from "next/image";

export function Flowchart({
  src,
  caption,
  alt,
}: {
  src: string;
  caption?: string;
  alt: string;
}) {
  return (
    <figure className="my-12 max-w-none -mx-4 md:-mx-12 lg:-mx-20">
      <div className="aspect-[21/9] border border-border bg-bg-elev relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest uppercase text-text-fade bg-bg/70 px-2 py-1 backdrop-blur-sm">
          flowchart
        </div>
      </div>
      {caption && (
        <figcaption className="font-mono text-xs text-text-dim mt-3 px-4 md:px-12 lg:px-20 flex items-start gap-2">
          <span className="text-accent shrink-0">//</span>
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
