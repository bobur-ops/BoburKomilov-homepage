"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-destructive text-xl font-bold">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground mt-2">{error.message}</p>

      <div className="flex items-center justify-center mt-4 gap-4">
        <Button onClick={() => reset()}>Try Again</Button>
        <Link href={"/"}>
          <Button>Home Page</Button>
        </Link>
      </div>
    </div>
  );
}
