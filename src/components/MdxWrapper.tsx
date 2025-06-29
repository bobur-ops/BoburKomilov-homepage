"use client";

import { PropsWithChildren } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function MdxWrapper({
  children,
  className,
  isProse = true,
}: PropsWithChildren<{
  className?: string;
  isProse?: boolean;
}>) {
  return (
    <div className={cn(className)}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn("py-6 w-full max-w-none", {
            "prose dark:prose-invert text-foreground": isProse,
          })}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
