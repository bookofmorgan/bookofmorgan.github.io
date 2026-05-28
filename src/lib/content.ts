import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export const WorkTagSchema = z.enum([
  "pmf",
  "app",
  "code",
  "business-model",
  "flowchart",
  "ui",
]);

export const WorkFrontmatterSchema = z.object({
  title: z.string().min(1),
  thesis: z.string().min(1),
  role: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  tags: z.array(WorkTagSchema).min(1),
  heroImage: z.string().optional(),
  featured: z.boolean().optional().default(false),
  order: z.number().int().optional(),
  draft: z.boolean().optional().default(false),
});

export type WorkFrontmatter = z.infer<typeof WorkFrontmatterSchema>;

export const BlogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string(),
  tags: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

export interface WorkItem {
  slug: string;
  frontmatter: WorkFrontmatter;
}

export interface BlogItem {
  slug: string;
  frontmatter: BlogFrontmatter;
}

function readMdxFiles(dir: string): { slug: string; raw: string; full: string }[] {
  const full = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(full, file);
      const raw = fs.readFileSync(filePath, "utf8");
      return {
        slug: file.replace(/\.mdx?$/, ""),
        raw,
        full: filePath,
      };
    });
}

export function getAllWork(): WorkItem[] {
  const isProd = process.env.NODE_ENV === "production";
  return readMdxFiles("work")
    .map(({ slug, raw, full }) => {
      const { data } = matter(raw);
      const parsed = WorkFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.error(`Invalid frontmatter in ${full}:`, parsed.error.flatten());
        throw new Error(`Invalid frontmatter in ${full}`);
      }
      return { slug, frontmatter: parsed.data };
    })
    .filter((item) => !isProd || !item.frontmatter.draft)
    .sort((a, b) => {
      if (a.frontmatter.order != null && b.frontmatter.order != null) {
        return a.frontmatter.order - b.frontmatter.order;
      }
      return b.frontmatter.year - a.frontmatter.year;
    });
}

export function getWorkSlugs(): string[] {
  return getAllWork().map((item) => item.slug);
}

export function getFeaturedWork(): WorkItem[] {
  return getAllWork().filter((item) => item.frontmatter.featured);
}

function readAllBlogPostsRaw(): BlogItem[] {
  return readMdxFiles("blog")
    .map(({ slug, raw, full }) => {
      const { data } = matter(raw);
      const parsed = BlogFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.error(`Invalid frontmatter in ${full}:`, parsed.error.flatten());
        throw new Error(`Invalid frontmatter in ${full}`);
      }
      return { slug, frontmatter: parsed.data };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime(),
    );
}

export function getAllBlogPosts(): BlogItem[] {
  const isProd = process.env.NODE_ENV === "production";
  return readAllBlogPostsRaw().filter(
    (item) => !isProd || !item.frontmatter.draft,
  );
}

// Used by generateStaticParams under `output: "export"`, which requires at
// least one param. Returns every slug on disk; the page component still calls
// notFound() for drafts in production so they 404 on direct visit.
export function getAllBlogSlugsForBuild(): string[] {
  return readAllBlogPostsRaw().map((p) => p.slug);
}

export function blogIsEnabled(): boolean {
  return getAllBlogPosts().length > 0;
}
