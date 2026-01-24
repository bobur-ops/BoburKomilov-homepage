import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import { FALLBACK_DEFAULT_THEME } from "@/features/theme/consts";
import PixelCat from "@/features/pixel-cat";
import Script from "next/script";
import GATracker from "@/components/GaTracker";
import PersonSchema from "@/components/PersonSchema";
import ThemeMusic from "@/features/theme-music";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muxammadbobur Komiljonov (Muhammadbobur) - Frontend Developer",
  description:
    "Muxammadbobur Komiljonov (Muhammadbobur/Muhammad Bobur) is a frontend developer from Tashkent specializing in React, Vue, and scalable web apps",
  authors: [{ name: "Muxammadbobur Komiljonov" }],
  verification: {
    google: "HbRhtiiQwV2-b7_v6LDPUXQuI46oHwrhLFT8WqGDZK4", // 👈 This is the key part
  },
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Vue.js",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Software Engineer",
    "Tech Blog",
    "Tashkent",
    "Uzbekistan",
    "Muxammadbobur Komiljonov",
    "Muhammadbobur Komiljonov",
    "Muxammadbobur",
    "Muhammadbobur",
    "Komiljonov",
    "Muxammad Bobur",
    "Muhammad Bobur",
    "Bobur Komiljonov",
    "Bobur",
    "Web Apps",
    "Muxammad Bobur Komiljonov Homepage",
  ],
  metadataBase: new URL("https://bobur.me"),
  openGraph: {
    title: "Muxammadbobur Komiljonov (Muhammadbobur) - Frontend Developer",
    description:
      "Muxammadbobur Komiljonov (Muhammadbobur/Muhammad Bobur) is a frontend developer from Tashkent specializing in React, Vue, and scalable web apps",
    url: "https://bobur.me",
    siteName: "Muxammadbobur Komiljonov",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "https://bobur.me",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-GH2DFPSNBB"
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GH2DFPSNBB');
            `,
          }}
        />

        <PersonSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GATracker />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme={FALLBACK_DEFAULT_THEME}
            enableSystem
            storageKey="theme-v0.1"
            themes={[
              "claude-dark",
              "claude-light",
              "catpuccin-dark",
              "catpuccin-light",
              "amber-minimal-dark",
              "amber-minimal-light",
              "bubblegum-dark",
              "bubblegum-light",
              "caffeine-dark",
              "caffeine-light",
              "cosmic-night-dark",
              "cosmic-night-light",
              "cyberpunk-dark",
              "cyberpunk-light",
              "doom-dark",
              "doom-light",
              "elegant-luxury-dark",
              "elegant-luxury-light",
              "graphite-dark",
              "graphite-light",
              "kodama-grove-dark",
              "kodama-grove-light",
              "mono-dark",
              "mono-light",
              "nature-dark",
              "nature-light",
              "clean-slate-dark",
              "clean-slate-light",
              "tangerine-dark",
              "tangerine-light",
              "vintage-paper-dark",
              "vintage-paper-light",
            ]}
          >
            <div className="min-h-[100dvh] overflow-y-auto max-w-4xl mx-auto pt-14 px-2 md:px-4 lg:px-0">
              <PixelCat />
              <SeoNames />
              <Navbar />
              <ThemeMusic />

              <>{children}</>
            </div>

            <div id="portal-root"></div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

const SeoNames = () => {
  return (
    <>
      <span className="sr-only">Muxammadbobur Komiljonov</span>
      <span className="sr-only">Muhammadbobur Komiljonov</span>
      <span className="sr-only">Muhammad Bobur Komiljonov</span>
      <span className="sr-only">Muxammad Bobur Komiljonov</span>
      <span className="sr-only">Bobur Komiljonov</span>
      <span className="sr-only">Muxammadbobur</span>
      <span className="sr-only">Muhammadbobur</span>
      <span className="sr-only">Bobur</span>
    </>
  );
};
