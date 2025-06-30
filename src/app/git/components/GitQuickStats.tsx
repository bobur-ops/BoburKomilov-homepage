"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";

interface GitQuickStatsProps {
  stars: number;
  forks: number;
  followers: number;
  publicRepos: number;
}

export default function GitQuickStats({
  followers,
  forks,
  publicRepos,
  stars,
}: GitQuickStatsProps) {
  const stats = [
    { label: "Stars", value: stars },
    { label: "Forks", value: forks },
    { label: "Followers", value: followers },
    { label: "Public Repos", value: publicRepos },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick GitHub Stats</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
