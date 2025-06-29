// components/Portal.tsx
"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const modalRoot = document.getElementById("portal-root");
  return modalRoot ? createPortal(children, modalRoot) : null;
}
