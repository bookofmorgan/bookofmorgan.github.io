import Link from "next/link";
import type { WorkItem } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedWork({ items }: { items: WorkItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="py-20 md:py-28 border-b border-border">
      <Reveal as="header" className="mb-12">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-dim mb-4 flex items-center gap-2">
          <span className="text-accent">$</span>
          <span>ls --featured</span>
        </div>
        <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight">
          Featured work
        </h2>
      </Reveal>
      <ul className="space-y-6">
        {items.map((item, idx) => (
          <Reveal as="div" key={item.slug} delay={idx * 0.08}>
            <Link
              href={`/work/${item.slug}`}
              className="group block border border-border bg-bg-elev hover:border-accent/50 transition-colors"
            >
              <div className="border-b border-border px-4 py-2 flex items-center gap-2 font-mono text-[11px] text-text-dim">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-border-bright" />
                  <span className="w-2 h-2 rounded-full bg-border-bright" />
                  <span className="w-2 h-2 rounded-full bg-border-bright" />
                </div>
                <span className="ml-2">~/work/{item.slug}.mdx</span>
                <span className="ml-auto text-text-fade">
                  {item.frontmatter.year}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-border p-6 md:p-8 bg-bg flex flex-col justify-between min-h-[200px]">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest uppercase text-text-fade mb-3">
                      // project
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-medium text-text group-hover:text-accent transition-colors mb-3 leading-tight">
                      {item.frontmatter.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.frontmatter.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] tracking-wide uppercase border border-border-bright px-2 py-0.5 text-text-dim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-8 p-6 md:p-10">
                  <p className="font-sans text-lg md:text-xl text-text leading-relaxed max-w-[58ch]">
                    {item.frontmatter.thesis}
                  </p>
                  <div className="font-mono text-[11px] text-accent mt-6 inline-flex items-center gap-2 border-b border-accent/40 group-hover:border-accent transition-colors">
                    → read case study
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
      <Reveal as="div" className="mt-10 text-center">
        <Link
          href="/work"
          className="font-mono text-xs text-text-dim hover:text-accent transition-colors border-b border-border-bright hover:border-accent pb-0.5"
        >
          all work →
        </Link>
      </Reveal>
    </section>
  );
}
