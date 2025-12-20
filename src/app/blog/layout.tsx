import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Muxammadbobur Komiljonov Blog",
  description:
    "Muxammadbobur Komiljonov's Blog, where he shares insights on frontend development, React, and his journey as a developer in Uzbekistan.",
  authors: [{ name: "Muxammadbobur Komiljonov" }],
  keywords: [
    "Frontend Development Blog",
    "React Blog",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Software Engineering",
    "Developer Blog",
    "Uzbekistan Developers",
    "Muxammadbobur Komiljonov",
  ],
  metadataBase: new URL("https://www.bobur.me/blog"),
  openGraph: {
    title: "Muxammadbobur Komiljonov Blog",
    description:
      "Muxammadbobur Komiljonov's Blog, where he shares insights on frontend development, React, and his journey as a developer in Uzbekistan.",
    url: "https://www.bobur.me/blog",
    siteName: "Muxammadbobur Komiljonov",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
