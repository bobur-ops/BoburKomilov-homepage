import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Muxammadbobur Komiljonov Guestbook",
  description:
    "Muxammadbobur Komiljonov's guestbook where you can leave messages and feedback",
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
  ],
  metadataBase: new URL("https://www.bobur.me/guestbook"),
  openGraph: {
    title: "Muxammadbobur Komiljonov Guestbook",
    description:
      "Leave your messages and feedback in Muxammadbobur Komiljonov's guestbook",
    url: "https://www.bobur.me/guestbook",
    siteName: "Muxammadbobur Komiljonov",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
