"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const trackList = [
  "/lofi/Marshmallow-Lukrembo.mp3",
  "/lofi/Travel-Lukrembo.mp3",
  "/lofi/Bread-Lukrembo.mp3",
  "/lofi/Vibing-Pufino.mp3",
];

export default function LofiPlayer() {
  const [canPlay, setCanPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<null | string>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleGesture = () => {
      setCanPlay(true);
      window.removeEventListener("click", handleGesture);
    };

    window.addEventListener("click", handleGesture);

    return () => {
      window.removeEventListener("click", handleGesture);
    };
  }, []);

  useEffect(() => {
    if (canPlay && !audioRef.current) {
      const randomTrack =
        trackList[Math.floor(Math.random() * trackList.length)];
      setCurrentTrack(randomTrack);

      const audio = new Audio(randomTrack);
      audio.loop = true;
      audio.volume = 0.001;
      audioRef.current = audio;

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Error playing audio:", err);
        });
    }
  }, [canPlay]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-muted px-2 py-1 shadow-lg backdrop-blur-md">
      <Button variant="ghost" size="icon" onClick={togglePlayback}>
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </Button>
      <span className="text-sm text-muted-foreground w-[150px] truncate text-right">
        {currentTrack ? currentTrack.split("/").pop() : "No track loaded"}
      </span>
    </div>
  );
}
