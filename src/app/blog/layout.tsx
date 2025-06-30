import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Bobur Komiljonov - Blog",
  description:
    "Muxammadbobur Komiljonov's Blog, where he shares insights on frontend development, React, and his journey as a developer in Uzbekistan.",
  authors: [{ name: "Muxammadbobur Komiljonov" }],
  keywords: [
    "Frontend",
    "React",
    "Developer",
    "Blog",
    "Uzbekistan",
    "Muxammadbobur",
    "Komiljonov",
    "Tech Stack",
    "Uses",
    "Tools",
    "Guestbook",
    "Git",
    "Posts",
    "Frontend Development",
  ],
  metadataBase: new URL("https://www.bobur.me/blog"),
  openGraph: {
    title: "Muxammadbobur Komiljonov - Blog",
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
