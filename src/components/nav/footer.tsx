export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs text-text-dim">
        <div className="flex items-center gap-3">
          <span className="text-accent">$</span>
          <span>morgan.swan</span>
          <span className="text-text-fade">·</span>
          <span>process notes</span>
          <span className="text-text-fade">·</span>
          <span>{year}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:morganswan@outlook.com?subject=Portfolio%20contact&body=Hey%20Morgan..."
            className="hover:text-accent transition-colors"
          >
            email
          </a>
          <a
            href="https://github.com"
            className="hover:text-accent transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          <a
            href="https://x.com"
            className="hover:text-accent transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            x
          </a>
        </div>
      </div>
    </footer>
  );
}
