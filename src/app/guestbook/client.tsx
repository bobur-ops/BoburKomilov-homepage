"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuestbookMessages, postGuestbookMessage } from "./api";
import { useState } from "react";
import { format } from "date-fns";

export default function GuestbookClient() {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["guestbook"],
    queryFn: getGuestbookMessages,
  });

  const postNewMessage = useMutation({
    mutationFn: postGuestbookMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guestbook"] });
      setMessage("");
    },
  });

  const handleSubmit = async () => {
    if (!message.trim() || postNewMessage.isPending) return;
    postNewMessage.mutate(message);
  };

  const messages = data || [];

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold">📖 Guestbook</h1>
      <Textarea
        placeholder="Leave a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-18"
        onKeyUp={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.blur();
            handleSubmit();
          }
        }}
      />
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit} disabled={postNewMessage.isPending}>
          {postNewMessage.isPending ? "Sending..." : "Send Message"}
        </Button>
      </div>
      <ul className="pt-6 max-h-[600px] overflow-y-auto">
        {messages.map((msg) => (
          <li key={msg.id} className="border-b pb-2 text-sm">
            <p>{msg.body}</p>
            <span className="text-muted-foreground text-xs">
              {format(new Date(msg.date), "PPpp")}
            </span>
          </li>
        ))}
        {!isLoading && messages.length === 0 && (
          <li>No messages yet. Be the first!</li>
        )}
        {isLoading && <li>Loading messages...</li>}
      </ul>
    </div>
  );
}
