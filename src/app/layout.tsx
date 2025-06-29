import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";

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
    "Bobur Komiljonov is a frontend developer from Tashkent specializing in React, Vue, and scalable web apps. Discover his latest projects, experience with Yandex and Smart-Base, and download his CV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-[100dvh] overflow-y-auto max-w-4xl mx-auto pt-14 px-2 md:px-4 lg:px-0">
            <Navbar />
            <>{children}</>
          </div>

          <div id="portal-root"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
