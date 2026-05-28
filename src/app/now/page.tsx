import type { Metadata } from "next";
import { useMDXComponents } from "@/mdx-components";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently working on.",
};

export default async function NowPage() {
  const { default: NowMDX } = await import("@/../content/now.mdx");
  const components = useMDXComponents();
  return (
    <article className="max-w-[1180px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
      <header className="border-b border-border pb-8 mb-12">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-dim mb-3 flex items-center gap-2">
          <span className="text-accent">$</span>
          <span>cat now.mdx</span>
        </div>
      </header>
      <div className="prose-content max-w-[68ch]">
        <NowMDX components={components} />
      </div>
    </article>
  );
}
