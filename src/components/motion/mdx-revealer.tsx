"use client";

import { useEffect, useRef } from "react";

// Wraps server-rendered MDX content and reveals its direct children on
// scroll. Single IntersectionObserver, not one per element. Targets the
// block-level elements that read as "sections" so prose flows in section
// by section, not character by character.
const REVEAL_SELECTOR = [
  ":scope > h2",
  ":scope > h3",
  ":scope > p",
  ":scope > ul",
  ":scope > ol",
  ":scope > figure",
  ":scope > pre",
  ":scope > blockquote",
  ":scope > aside",
  ":scope > details",
  ":scope > hr",
  ":scope > .not-prose",
].join(", ");

export function MdxRevealer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    targets.forEach((el) => el.classList.add("reveal"));

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Stagger only within the same intersection batch — elements that
        // come into view together cascade, but a paragraph scrolled into
        // view alone reveals immediately with no delay.
        const arriving = entries.filter((e) => e.isIntersecting);
        arriving.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${i * 35}ms`;
          el.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
