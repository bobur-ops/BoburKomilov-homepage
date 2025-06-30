"use client";

import MdxWrapper from "@/components/MdxWrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

type Message = { id: number; body: string; date: string };

export default function GuestbookPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    await fetch("/api/guestbook", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    setMessage("");
    const updated = await fetch("/api/guestbook").then((r) => r.json());
    setMessages(updated);
    setLoading(false);
  };

  return (
    <MdxWrapper>
      <h1 className="text-2xl font-bold">📖 Guestbook</h1>
      <Textarea
        placeholder="Leave a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-24"
      />
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Sign"}
        </Button>
      </div>
      <ul className="space-y-4 pt-6">
        {messages.map((msg) => (
          <li key={msg.id} className="border-b pb-2 text-sm">
            <p>{msg.body}</p>
            <span className="text-muted-foreground text-xs">
              {new Date(msg.date).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </MdxWrapper>
  );
}
