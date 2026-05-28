import type { MDXComponents } from "mdx/types";
import { Hypothesis } from "@/components/mdx/hypothesis";
import { Canvas } from "@/components/mdx/canvas";
import { Flowchart } from "@/components/mdx/flowchart";
import { BeforeAfter } from "@/components/mdx/before-after";
import { Stat } from "@/components/mdx/stat";
import { Quote } from "@/components/mdx/quote";
import { Gallery } from "@/components/mdx/gallery";
import { Details } from "@/components/mdx/details";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-sans text-4xl md:text-5xl font-medium tracking-tight mb-6 mt-12 text-text">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-mono text-2xl font-medium mt-16 mb-5 text-text">
      <span className="text-text-dim">## </span>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-mono text-xl font-medium mt-10 mb-4 text-text">
      <span className="text-text-dim">### </span>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-sans text-base md:text-[17px] leading-[1.75] text-text my-5 max-w-[68ch]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="font-sans text-base leading-[1.75] my-5 max-w-[68ch] space-y-2 pl-6 list-disc marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-sans text-base leading-[1.75] my-5 max-w-[68ch] space-y-2 pl-6 list-decimal marker:text-text-dim">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-accent border-b border-accent/40 hover:border-accent transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-text-dim">{children}</em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-6 my-8 font-sans italic text-text-dim text-lg max-w-[60ch]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-border" />,
  code: ({ children }) => (
    <code className="font-mono text-[0.92em] bg-bg-elev px-1.5 py-0.5 border border-border text-accent">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="font-mono text-sm bg-bg-elev border border-border p-5 my-6 overflow-x-auto leading-relaxed">
      {children}
    </pre>
  ),
  // Custom MDX components
  Hypothesis,
  Canvas,
  Flowchart,
  BeforeAfter,
  Stat,
  Quote,
  Gallery,
  Details,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
