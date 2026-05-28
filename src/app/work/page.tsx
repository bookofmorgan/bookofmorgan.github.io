import { getAllWork } from "@/lib/content";
import { WorkGrid } from "@/components/work/work-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in zero-to-one product work.",
};

export default function WorkIndexPage() {
  const items = getAllWork();
  return (
    <div className="max-w-[1180px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
      <header className="border-b border-border pb-10 mb-12">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-dim mb-6 flex items-center gap-2">
          <span className="text-accent">$</span>
          <span>ls ./work</span>
        </div>
        <h1 className="font-sans text-4xl md:text-5xl font-medium tracking-tight mb-4">
          Work
        </h1>
        <p className="font-sans text-lg text-text-dim max-w-[60ch]">
          Case studies in zero-to-one product work. Hypotheses, canvases and
          the things that shipped.
        </p>
      </header>
      <WorkGrid items={items} />
    </div>
  );
}
