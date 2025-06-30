import { NextResponse } from "next/server";

const REPO = "bobur-ops/guestbook";
const GUESTBOOK_TOKEN = process.env.GUESTBOOK_TOKEN;
const ISSUE_NUMBER = 2;

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message || message.length > 500) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/issues/${ISSUE_NUMBER}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GUESTBOOK_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "guestbook-bot",
      },

      body: JSON.stringify({
        body: message,
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "GitHub error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/issues/${ISSUE_NUMBER}/comments`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GUESTBOOK_TOKEN}`,
        "User-Agent": "guestbook-bot",
      },
    }
  );

  const data = await res.json();

  if (!Array.isArray(data)) {
    return NextResponse.json({ error: "GitHub error", data }, { status: 500 });
  }

  const messages = data.map((comment: any) => ({
    id: comment.id,
    body: comment.body,
    date: comment.created_at,
  }));

  return NextResponse.json(messages);
}
