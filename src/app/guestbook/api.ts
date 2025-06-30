import axios from "axios";

export type Message = { id: number; body: string; date: string };

export const getGuestbookMessages = async () => {
  const res = await axios.get("/api/guestbook");

  return res.data as Message[];
};

export const postGuestbookMessage = async (message: string) => {
  const res = await axios.post("/api/guestbook", {
    message,
  });

  return res.data;
};
