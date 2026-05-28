"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const baseLinks = [
  { href: "/work", label: "work" },
  { href: "/about", label: "about" },
  { href: "/now", label: "now" },
];

export function NavLinks({ showBlog }: { showBlog: boolean }) {
  const pathname = usePathname();
  const links = showBlog
    ? [...baseLinks, { href: "/blog", label: "blog" }]
    : baseLinks;

  return (
    <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-2 font-mono text-xs md:text-sm">
      {links.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-2 sm:px-3 min-h-[44px] flex items-center transition-colors border border-transparent",
              active
                ? "text-accent border-accent/40"
                : "text-text-dim hover:text-text",
            )}
          >
            <span className={cn("hidden sm:inline", active ? "text-accent" : "text-text-fade")}>
              ./
            </span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
