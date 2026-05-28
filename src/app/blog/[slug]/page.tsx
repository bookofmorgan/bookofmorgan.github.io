import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import { useMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllBlogPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} — Morgan Swan`,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  const { default: PostMDX } = await import(`@/../content/blog/${slug}.mdx`);
  const components = useMDXComponents();

  return (
    <article className="max-w-[1180px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
      <header className="border-b border-border pb-8 mb-12">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-dim mb-6 flex items-center gap-3">
          <Link href="/blog" className="hover:text-accent transition-colors">
            ← blog
          </Link>
          <span className="text-text-fade">/</span>
          <span>{slug}.mdx</span>
        </div>
        <h1 className="font-sans text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
          {post.frontmatter.title}
        </h1>
        <div className="font-mono text-xs text-text-dim">
          {new Date(post.frontmatter.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </header>
      <div className="prose-content max-w-[68ch]">
        <PostMDX components={components} />
      </div>
    </article>
  );
}
