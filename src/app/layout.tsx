import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import { FALLBACK_DEFAULT_THEME } from "@/features/theme/consts";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import PixelCat from "@/features/pixel-cat";
import Script from "next/script";
import GATracker from "@/components/GaTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bobur Komiljonov - Frontend Developer Portfolio",
  description:
    "Muxammadbobur Komiljonov is a frontend developer from Tashkent specializing in React, Vue, and scalable web apps. Discover his latest projects, experience with Yandex and Smart-Base, and download his CV.",
  authors: [{ name: "Muxammadbobur Komiljonov" }],
  keywords: [
    "Frontend",
    "React",
    "Developer",
    "Blog",
    "Uzbekistan",
    "Muxammadbobur",
    "Komiljonov",
  ],
  metadataBase: new URL("https://www.bobur.me"),
  openGraph: {
    title: "Muxammadbobur Komiljonov - Frontend Developer",
    description: "Personal portfolio and blog",
    url: "https://www.bobur.me",
    siteName: "Muxammadbobur Komiljonov",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
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

              <Navbar />
              <ScrollProgress />
              <>{children}</>
            </div>

            <div id="portal-root"></div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
