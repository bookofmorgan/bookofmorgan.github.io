import Link from "next/link";
import { getAllWork, getFeaturedWork } from "@/lib/content";
import { HeroReveal } from "@/components/home/hero-reveal";
import { FeaturedWork } from "@/components/home/featured-work";
import { NowStrip } from "@/components/home/now-strip";

export default function HomePage() {
  const featured = getFeaturedWork();
  const all = getAllWork();
  return (
    <div className="max-w-[1180px] mx-auto px-6 md:px-10">
      <HeroReveal totalProjects={all.length} />
      <FeaturedWork items={featured} />
      <NowStrip />
    </div>
  );
}
