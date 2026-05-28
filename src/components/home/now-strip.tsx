import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export function NowStrip() {
  return (
    <section className="py-20 md:py-24">
      <Reveal as="div" className="border border-border bg-bg-elev p-6 md:p-10">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
          // currently
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="font-sans text-xl md:text-2xl text-text leading-snug max-w-[58ch]">
            Rebuilding Conviction Compass v2 — preserving the date a belief was
            written when two people edit the same row.
          </p>
          <Link
            href="/now"
            className="font-mono text-xs text-accent border-b border-accent/40 hover:border-accent pb-0.5 shrink-0"
          >
            → /now
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
