"use client";

import { PropsWithChildren } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function MdxWrapper({ children }: PropsWithChildren) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose dark:prose-invert text-foregroundd py-6 w-full max-w-none text-foreground"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
