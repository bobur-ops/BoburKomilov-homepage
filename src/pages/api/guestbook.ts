import type { APIRoute } from "astro";
import { createMessage, fetchMessages } from "../../api/guestbook";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const messages = await fetchMessages();
    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Server error" }),
      { status: 500 },
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message } = await request.json();
    await createMessage(message);

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: err.message || "Bad request" }),
      { status: 400 },
    );
  }
};
