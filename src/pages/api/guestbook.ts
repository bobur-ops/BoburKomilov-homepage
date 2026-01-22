import type { APIRoute } from "astro";
import axios from "axios";

const REPO = "bobur-ops/guestbook";
const ISSUE_NUMBER = 2;
const GUESTBOOK_TOKEN = import.meta.env.GUESTBOOK_TOKEN;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message || message.length > 500) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
      });
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
      return new Response(JSON.stringify({ error: "GitHub error" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};

export const GET: APIRoute = async () => {
  try {
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
      return new Response(
        JSON.stringify({ error: "GitHub error", data: res.data }),
        { status: 500 },
      );
    }

    const messages = res.data
      .sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map((comment: any) => ({
        id: comment.id,
        body: comment.body,
        date: comment.created_at,
        reactions: comment.reactions,
      }));

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
