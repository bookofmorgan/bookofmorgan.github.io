"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { WorkItem } from "@/lib/content";
import { cn } from "@/lib/utils";

// experiment: this filter UI uses Framer Motion LayoutGroup. GSAP is harder
// to use for grid-reorder animations. If we move off framer-motion entirely,
// rewrite this with the View Transitions API.

const ALL = "all" as const;

type Filter = typeof ALL | string;

export function WorkGrid({ items }: { items: WorkItem[] }) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.frontmatter.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [items]);

  const [filter, setFilter] = useState<Filter>(ALL);

  const filtered =
    filter === ALL
      ? items
      : items.filter((i) =>
          (i.frontmatter.tags as readonly string[]).includes(filter),
        );

  return (
    <LayoutGroup>
      {/* filter chips */}
      <motion.div layout className="flex flex-wrap gap-2 mb-10">
        <FilterChip
          label="all"
          active={filter === ALL}
          onClick={() => setFilter(ALL)}
          count={items.length}
        />
        {allTags.map((t) => (
          <FilterChip
            key={t}
            label={t}
            active={filter === t}
            onClick={() => setFilter(t)}
            count={
              items.filter((i) =>
                (i.frontmatter.tags as readonly string[]).includes(t),
              ).length
            }
          />
        ))}
      </motion.div>

      {/* grid */}
      <motion.ul
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/work/${item.slug}`}
                className="group block border border-border bg-bg-elev hover:border-accent/50 transition-colors h-full"
              >
                {/* editor-like title bar */}
                <div className="border-b border-border px-4 py-2 flex items-center gap-2 font-mono text-[11px] text-text-dim">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-border-bright" />
                    <span className="w-2 h-2 rounded-full bg-border-bright" />
                    <span className="w-2 h-2 rounded-full bg-border-bright" />
                  </div>
                  <span className="ml-2">{item.slug}.mdx</span>
                </div>
                <div className="p-6">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-text-dim mb-3 flex items-center gap-2">
                    <span>{item.frontmatter.year}</span>
                    <span className="text-text-fade">·</span>
                    <span>{item.frontmatter.role}</span>
                  </div>
                  <h2 className="font-sans text-2xl md:text-3xl font-medium text-text group-hover:text-accent transition-colors mb-3 leading-tight">
                    {item.frontmatter.title}
                  </h2>
                  <p className="font-sans text-[15px] text-text-dim leading-relaxed mb-6 max-w-[40ch]">
                    {item.frontmatter.thesis}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
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
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <div className="font-mono text-sm text-text-dim mt-12 text-center py-12 border border-dashed border-border">
          // no work tagged{" "}
          <span className="text-accent">{filter}</span> yet
        </div>
      )}
    </LayoutGroup>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-mono text-xs px-3 py-1.5 border transition-colors lowercase flex items-center gap-2",
        active
          ? "border-accent text-accent"
          : "border-border-bright text-text-dim hover:text-text hover:border-text-dim",
      )}
    >
      <span>{label}</span>
      <span className={cn("text-[10px]", active ? "text-accent/70" : "text-text-fade")}>
        {count}
      </span>
    </button>
  );
}
