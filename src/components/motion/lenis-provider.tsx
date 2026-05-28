// Lenis smooth scroll was here. It conflicted with image-bearing pages
// (case study Canvas/Flowchart components) where trackpad wheel events
// stopped propagating once the first image loaded. Native scroll handles
// this correctly. Keeping the file as a pass-through so callers do not
// need to be touched; remove when convenient.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
