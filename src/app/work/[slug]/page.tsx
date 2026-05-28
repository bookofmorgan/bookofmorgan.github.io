import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllWork, getWorkSlugs } from "@/lib/content";
import { useMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getAllWork().find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.thesis,
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const all = getAllWork();
  const item = all.find((w) => w.slug === slug);
  if (!item) notFound();

  const { default: MDXContent } = await import(`@/../content/work/${slug}.mdx`);
  const components = useMDXComponents();

  const related = all
    .filter((w) => w.slug !== slug)
    .slice(0, 2);

  return (
    <article className="max-w-[1180px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
      {/* HERO */}
      <header className="border-b border-border pb-12 mb-16">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-dim mb-8 flex flex-wrap items-center gap-3">
          <Link href="/work" className="hover:text-accent transition-colors">
            ← work
          </Link>
          <span className="text-text-fade">/</span>
          <span>{slug}.mdx</span>
        </div>
        <h1 className="font-sans text-4xl md:text-6xl font-medium tracking-tight mb-6 leading-[1.05]">
          {item.frontmatter.title}
        </h1>
        <p className="font-sans text-xl md:text-2xl text-text-dim leading-snug max-w-[60ch] mb-10">
          {item.frontmatter.thesis}
        </p>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 font-mono text-xs">
          <div>
            <dt className="text-text-fade uppercase tracking-widest text-[10px] mb-1.5">
              role
            </dt>
            <dd className="text-text">{item.frontmatter.role}</dd>
          </div>
          <div>
            <dt className="text-text-fade uppercase tracking-widest text-[10px] mb-1.5">
              year
            </dt>
            <dd className="text-text">{item.frontmatter.year}</dd>
          </div>
          <div className="col-span-2 md:col-span-2">
            <dt className="text-text-fade uppercase tracking-widest text-[10px] mb-1.5">
              tags
            </dt>
            <dd className="text-text flex flex-wrap gap-1.5">
              {item.frontmatter.tags.map((t) => (
                <span
                  key={t}
                  className="border border-border-bright px-2 py-0.5 lowercase"
                >
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </header>

      {/* CONTENT */}
      <div className="prose-content">
        <MDXContent components={components} />
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <footer className="mt-24 pt-10 border-t border-border">
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-6">
            // related
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/work/${r.slug}`}
                  className="block border border-border bg-bg-elev p-5 hover:border-accent/50 transition-colors group"
                >
                  <div className="font-mono text-[10px] tracking-widest uppercase text-text-dim mb-2">
                    {r.frontmatter.year} · {r.frontmatter.tags.join(", ")}
                  </div>
                  <div className="font-sans text-xl text-text group-hover:text-accent transition-colors">
                    {r.frontmatter.title}
                  </div>
                  <p className="font-sans text-sm text-text-dim mt-2 line-clamp-2">
                    {r.frontmatter.thesis}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
