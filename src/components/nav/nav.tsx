import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { blogIsEnabled } from "@/lib/content";

export function Nav() {
  const showBlog = blogIsEnabled();
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-[1180px] mx-auto px-4 md:px-10 py-2 flex items-center justify-between gap-2 min-h-[56px]">
        <Link
          href="/"
          className="font-mono text-sm text-text hover:text-accent transition-colors flex items-center gap-2 min-h-[44px] -mx-2 px-2"
        >
          <span className="text-accent">~/</span>
          <span className="hidden sm:inline">morgan.swan</span>
          <span className="sm:hidden">swan</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <NavLinks showBlog={showBlog} />
          <span className="text-text-fade font-mono text-xs hidden md:inline">·</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
