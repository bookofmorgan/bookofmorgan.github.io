"use client";

import { createElement, useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

type Tag = "div" | "section" | "article" | "header" | "h1" | "h2" | "h3" | "p";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: Tag;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  duration = 0.7,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [delay, duration, y]);

  return createElement(as, { ref, className }, children);
}
