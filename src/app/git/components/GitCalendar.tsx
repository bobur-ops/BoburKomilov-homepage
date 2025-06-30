"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function GitCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Contribution Calendar</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-auto">
          <Image
            src={`https://github-contributions-api.deno.dev/bobur-ops.svg`}
            alt="GitHub contribution calendar"
            className="w-full"
            width={1920}
            height={500}
          />
        </div>
      </CardContent>
    </Card>
  );
}
