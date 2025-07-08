import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Muxammadbobur Komiljonov Git",
  description:
    "Git stats and contributions of Muxammadbobur Komiljonov, showcasing his work in frontend development and open source contributions.",
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
  ],
  metadataBase: new URL("https://www.bobur.me/git"),
  openGraph: {
    title: "Muxammadbobur Komiljonov Git",
    description:
      "Git stats and contributions of Muxammadbobur Komiljonov, showcasing his work in frontend development and open source contributions.",
    url: "https://www.bobur.me/git",
    siteName: "Muxammadbobur Komiljonov",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
