interface SpeechBubbleProps {
  message: string;
  visible: boolean;
}

export function SpeechBubble({ message, visible }: SpeechBubbleProps) {
  if (!visible) return null;

  return (
    <div
      className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1.5 bg-accent text-foreground shadow-md"
      style={{
        whiteSpace: "nowrap",
        imageRendering: "pixelated",
      }}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
