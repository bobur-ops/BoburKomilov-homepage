import axios from "axios";

export interface MessageReactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export type Message = {
  id: number;
  body: string;
  date: string;
  reactions: MessageReactions;
};

export const getGuestbookMessages = async () => {
  const res = await axios.get("http://localhost:4321/api/guestbook");

  return res.data as Message[];
};

export const postGuestbookMessage = async (message: string) => {
  const res = await axios.post("http://localhost:4321/api/guestbook", {
    message,
  });

  return res.data;
};

export const reactionEmojis: Record<string, string> = {
  "+1": "👍",
  "-1": "👎",
  laugh: "😄",
  hooray: "🎉",
  confused: "😕",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const emojiKeys = Object.keys(reactionEmojis);
