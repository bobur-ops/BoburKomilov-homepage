import axios from "axios";
import { NextResponse } from "next/server";

const REPO = "bobur-ops/guestbook";
const GUESTBOOK_TOKEN = process.env.GUESTBOOK_TOKEN;
const ISSUE_NUMBER = 2;

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message || message.length > 500) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const res = await axios.post(
    `https://api.github.com/repos/${REPO}/issues/${ISSUE_NUMBER}/comments`,
    {
      body: message,
    },
    {
      headers: {
        Authorization: `Bearer ${GUESTBOOK_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "guestbook-bot",
      },
    }
  );

  if (!res.data || res.status !== 201) {
    return NextResponse.json({ error: "GitHub error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const res = await axios(
    `https://api.github.com/repos/${REPO}/issues/${ISSUE_NUMBER}/comments`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GUESTBOOK_TOKEN}`,
        "User-Agent": "guestbook-bot",
      },
      params: {
        sort: "created",
        direction: "desc",
      },
    }
  );
  const data = res.data;

  if (!Array.isArray(data)) {
    return NextResponse.json({ error: "GitHub error", data }, { status: 500 });
  }

  const messages = data
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .map((comment: any) => ({
      id: comment.id,
      body: comment.body,
      date: comment.created_at,
    }));

  return NextResponse.json(messages);
}
