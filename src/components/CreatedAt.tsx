"use client";

import { format } from "date-fns";

type Props = {
  createdAt: string;
  readTime: string;
};

export default function CreatedAt({ createdAt, readTime }: Props) {
  return (
    <p className="flex justify-start text-sm">
      {format(new Date(createdAt), "MMMM d, yyyy")}{" "}
      {readTime && `• ${readTime}`}
    </p>
  );
}
