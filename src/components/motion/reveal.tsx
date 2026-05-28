"use client";

import { createElement, useEffect, useRef } from "react";

type Tag = "div" | "section" | "article" | "header" | "h1" | "h2" | "h3" | "p";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}

// CSS + IntersectionObserver scroll reveal. Off-main-thread once the
// .is-visible class is added. Replaces the older GSAP ScrollTrigger
// implementation, which was ~700ms and pulled GSAP into every page.
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              el.classList.add("is-visible");
            }, delay * 1000);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const finalClassName = ["reveal", className].filter(Boolean).join(" ");

  return createElement(as, { ref, className: finalClassName }, children);
}
