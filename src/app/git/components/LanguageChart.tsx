"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

type Props = {
  languageData: { name: string; value: number }[];
};

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function LanguageChart({ languageData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Most Used Languages</CardTitle>
      </CardHeader>

      <CardContent style={{ height: 400 }}>
        <ResponsiveContainer>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={languageData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Bar dataKey="value" fill="var(--color-value)" />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
