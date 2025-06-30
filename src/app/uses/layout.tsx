import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Bobur Komiljonov - Uses",
  description: "Muxammadbobur Komiljonov's tech stack and tools",
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
  ],
  metadataBase: new URL("https://www.bobur.me/uses"),
  openGraph: {
    title: "Muxammadbobur Komiljonov - Uses",
    description:
      "Discover the tech stack and tools used by Muxammadbobur Komiljonov",
    url: "https://www.bobur.me/uses",
    siteName: "Muxammadbobur Komiljonov",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
