import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { blogIsEnabled } from "@/lib/content";

export function Nav() {
  const showBlog = blogIsEnabled();
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-sm text-text hover:text-accent transition-colors flex items-center gap-2"
        >
          <span className="text-accent">~/</span>
          <span>morgan.swan</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-5">
          <NavLinks showBlog={showBlog} />
          <span className="text-text-fade font-mono text-xs hidden md:inline">·</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
