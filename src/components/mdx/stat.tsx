export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <div className="font-mono text-5xl md:text-6xl text-accent leading-none tracking-tight">
        {value}
      </div>
      <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-text-dim mt-3">
        {label}
      </div>
    </div>
  );
}

// Wraps 2-4 <Stat> components in a responsive grid so they line up cleanly
// regardless of label length. Use inside MDX:
//   <Stats>
//     <Stat .../>
//     <Stat .../>
//     <Stat .../>
//   </Stats>
export function Stats({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-10">
      {children}
    </div>
  );
}
