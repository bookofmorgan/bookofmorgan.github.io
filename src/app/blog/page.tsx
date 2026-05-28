import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Morgan Swan",
  description: "Notes and essays.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  if (posts.length === 0) notFound();
  return (
    <div className="max-w-[1180px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
      <header className="border-b border-border pb-10 mb-12">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-dim mb-6 flex items-center gap-2">
          <span className="text-accent">$</span>
          <span>ls ./blog</span>
        </div>
        <h1 className="font-sans text-4xl md:text-5xl font-medium tracking-tight">
          Blog
        </h1>
      </header>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block border border-border bg-bg-elev p-6 hover:border-accent/50 transition-colors group"
            >
              <div className="font-mono text-[11px] text-text-dim mb-2">
                {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "short", day: "numeric" },
                )}
              </div>
              <h2 className="font-sans text-2xl font-medium text-text group-hover:text-accent transition-colors mb-2">
                {post.frontmatter.title}
              </h2>
              <p className="font-sans text-base text-text-dim leading-relaxed max-w-[60ch]">
                {post.frontmatter.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
