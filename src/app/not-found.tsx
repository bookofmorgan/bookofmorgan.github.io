import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[1180px] mx-auto px-6 md:px-10 pt-24 pb-24">
      <div className="font-mono text-[11px] text-text-dim mb-6 flex items-center gap-2">
        <span className="text-accent">$</span>
        <span>cat: that page: no such file or directory</span>
      </div>
      <h1 className="font-mono text-6xl md:text-8xl font-medium text-text mb-6 cursor-block">
        404
      </h1>
      <p className="font-sans text-lg text-text-dim leading-relaxed max-w-[60ch] mb-10">
        The page you asked for doesn&apos;t exist — possibly never did,
        possibly moved. Try the index.
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-xs">
        <Link
          href="/"
          className="border border-accent text-accent px-3 py-2 hover:bg-accent hover:text-bg transition-colors"
        >
          → home
        </Link>
        <Link
          href="/work"
          className="border border-border-bright text-text-dim hover:text-text hover:border-text-dim px-3 py-2 transition-colors"
        >
          → work
        </Link>
      </div>
    </div>
  );
}
