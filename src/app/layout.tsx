import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav/nav";
import { Footer } from "@/components/nav/footer";
import { LenisProvider } from "@/components/motion/lenis-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://bookofmorgan.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Morgan Swan · process notes from zero-to-one product work",
    template: "%s · Morgan Swan",
  },
  description:
    "Portfolio and process notes from zero-to-one product work. Hypotheses, canvases and the things that shipped.",
  openGraph: {
    title: "Morgan Swan · process notes from zero-to-one product work",
    description:
      "Portfolio and process notes from zero-to-one product work. Hypotheses, canvases and the things that shipped.",
    url: SITE_URL,
    siteName: "Morgan Swan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morgan Swan",
    description:
      "Process notes from zero-to-one product work.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Synchronous theme init. Runs before paint to avoid FOUC.
// Default is light. Dark only applies if explicitly stored.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'light';
    if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
