"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function HeroReveal({ totalProjects }: { totalProjects: number }) {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.querySelectorAll<HTMLElement>("[data-anim]").forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.set("[data-anim]", { opacity: 0, y: 18 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to("[data-anim='prompt']", { opacity: 1, y: 0, duration: 0.5 })
        .to("[data-anim='headline']", {
          opacity: 1,
          y: 0,
          duration: 0.9,
        }, "-=0.25")
        .to("[data-anim='subhead']", {
          opacity: 1,
          y: 0,
          duration: 0.7,
        }, "-=0.5")
        .to("[data-anim='chips']", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
        }, "-=0.4");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="pt-16 md:pt-24 pb-24 md:pb-32 border-b border-border"
    >
      <div
        data-anim="prompt"
        className="font-mono text-[12px] text-text-dim mb-6 flex items-center gap-2"
      >
        <span className="text-accent">$</span>
        <span>whoami</span>
      </div>
      <h1
        data-anim="headline"
        className="font-mono text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight font-medium text-text cursor-block"
      >
        morgan.swan
      </h1>
      <p
        data-anim="subhead"
        className="font-sans text-lg md:text-xl text-text-dim leading-relaxed max-w-[60ch] mt-8"
      >
        shipping zero-to-one{" "}
        <span className="font-mono text-text-fade">//</span>{" "}
        hypothesis-driven product work
      </p>
      <div className="flex flex-wrap gap-2 mt-10">
        {["pmf", "apps", "code", "business models"].map((t) => (
          <span
            key={t}
            data-anim="chips"
            className="font-mono text-[11px] tracking-wide border border-border-bright px-3 py-1.5 lowercase text-text-dim"
          >
            {t}
          </span>
        ))}
        <Link
          href="/work"
          data-anim="chips"
          className="font-mono text-[11px] tracking-wide border border-accent text-accent px-3 py-1.5 lowercase hover:bg-accent hover:text-bg transition-colors"
        >
          → /work ({totalProjects})
        </Link>
      </div>
    </section>
  );
}
