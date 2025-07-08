// @ts-ignore
// @ts-nocheck

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GATracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-GH2DFPSNBB", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
