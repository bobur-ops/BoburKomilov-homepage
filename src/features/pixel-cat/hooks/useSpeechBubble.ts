import { useState, useEffect } from "react";
import { messages, INTERACTION_CONFIG } from "../config";
import { randomChance } from "@/utils/randomChance";

export function useSpeechBubble() {
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (randomChance(INTERACTION_CONFIG.bubbleChance)) {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowBubble(true);

        setTimeout(
          () => setShowBubble(false),
          INTERACTION_CONFIG.bubbleDisplayDuration
        );
      }
    }, INTERACTION_CONFIG.bubbleCheckInterval);

    return () => clearInterval(interval);
  }, []);

  return {
    showBubble,
    message,
  };
}
