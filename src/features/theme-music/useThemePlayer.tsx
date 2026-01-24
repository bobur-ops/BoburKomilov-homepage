import { useState, useEffect, useRef, useCallback } from "react";

export const useThemePlayer = (audioSrc?: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  // Initialize audio element
  useEffect(() => {
    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;

    const handleCanPlay = () => setIsReady(true);
    audio.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.pause();
      audio.src = "";
    };
  }, [audioSrc]);

  // Attempt to play on first user interaction
  useEffect(() => {
    const handleInteraction = async () => {
      if (hasInteractedRef.current || !audioRef.current || !isReady) return;

      hasInteractedRef.current = true;

      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("Failed to autoplay music:", error);
      }
    };

    const events = ["click", "keydown", "touchstart"];
    events.forEach((event) => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [isReady]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to play music:", error);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    isPlaying,
    isReady,
    play,
    pause,
    toggle,
  };
};
