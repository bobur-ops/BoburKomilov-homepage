import axios from "axios";
import { variables } from "../config/variables";
import { format } from "date-fns";

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
  formattedDate: string;
  reactions: MessageReactions;
};

const REPO = "bobur-ops/guestbook";
const ISSUE_NUMBER = 2;
const GUESTBOOK_TOKEN = variables.guestbookToken;

export async function fetchMessages(): Promise<Message[]> {
  const res = await axios.get(
    `https://api.github.com/repos/${REPO}/issues/${ISSUE_NUMBER}/comments`,
    {
      headers: {
        Authorization: `Bearer ${GUESTBOOK_TOKEN}`,
        "User-Agent": "guestbook-bot",
      },
      params: {
        sort: "created",
        direction: "desc",
      },
    },
  );

  if (!Array.isArray(res.data)) {
    throw new Error("GitHub API returned invalid data");
  }

  return res.data
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .map((comment: any) => ({
      id: comment.id,
      body: comment.body,
      date: comment.created_at,
      formattedDate: format(new Date(comment.created_at), "PPpp"),
      reactions: comment.reactions,
    }));
}

export async function createMessage(message: string): Promise<void> {
  if (!message || message.length > 500) {
    throw new Error("Invalid message");
  }

  const res = await axios.post(
    `https://api.github.com/repos/${REPO}/issues/${ISSUE_NUMBER}/comments`,
    { body: message },
    {
      headers: {
        Authorization: `Bearer ${GUESTBOOK_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "guestbook-bot",
      },
    },
  );

  if (res.status !== 201) {
    throw new Error("Failed to create GitHub comment");
  }
}

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
