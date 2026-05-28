import Image from "next/image";

interface CanvasProps {
  src: string;
  caption?: string;
  alt: string;
  aspect?: "wide" | "square" | "tall";
}

export function Canvas({ src, caption, alt, aspect = "wide" }: CanvasProps) {
  const aspectClass = {
    wide: "aspect-[16/9]",
    square: "aspect-square",
    tall: "aspect-[4/5]",
  }[aspect];

  return (
    <figure className="my-10 max-w-[78ch]">
      <div
        className={`${aspectClass} border border-border bg-bg-elev relative overflow-hidden`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
        <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest uppercase text-text-fade bg-bg/70 px-2 py-1 backdrop-blur-sm">
          canvas
        </div>
      </div>
      {caption && (
        <figcaption className="font-mono text-xs text-text-dim mt-3 flex items-start gap-2">
          <span className="text-accent shrink-0">//</span>
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
