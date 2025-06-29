"use client";

import { format } from "date-fns";

type Props = {
  createdAt: string;
};

export default function CreatedAt({ createdAt }: Props) {
  return (
    <p className="flex justify-end text-sm">
      {format(new Date(createdAt), "MMMM d, yyyy")}
    </p>
  );
}
