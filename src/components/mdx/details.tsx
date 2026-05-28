interface DetailsProps {
  summary?: string;
  children: React.ReactNode;
}

// Native HTML <details>. Works without JS. The hidden content is in the DOM
// at all times, so layout settles once on first paint, and Cmd-F can find
// text inside the collapsed section.
export function Details({ summary, children }: DetailsProps) {
  return (
    <details className="my-16 group">
      <summary
        className="
          cursor-pointer
          list-none
          [&::-webkit-details-marker]:hidden
          border border-border-bright
          px-5 py-3
          font-mono text-sm text-accent
          hover:border-accent hover:bg-bg-elev
          transition-colors
          flex items-center gap-3
        "
      >
        <span className="text-text-fade">$</span>
        <span>{summary || "cat full-case-study.mdx"}</span>
        <span className="ml-auto font-mono text-[11px] text-text-fade group-open:hidden">
          [+] expand
        </span>
        <span className="ml-auto font-mono text-[11px] text-text-fade hidden group-open:inline">
          [-] collapse
        </span>
      </summary>
      <div className="pt-8 mt-8 border-t border-border">
        {children}
      </div>
    </details>
  );
}
