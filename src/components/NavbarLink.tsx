"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarLinkProps = {
  children: React.ReactNode;
  href: string;
  target?: "_blank" | "_self";
};

export default function NavbarLink({
  children,
  href,
  target = "_self",
}: NavbarLinkProps) {
  const pathname = usePathname();

  const isActiveLink =
    pathname === href || (pathname.startsWith(href.toString()) && href !== "/");

  return (
    <Link
      className={cn(
        "hover:underline underline-offset-2 hover:text-accent-foreground transition-colors",
        {
          "text-accent-foreground underline": isActiveLink,
        }
      )}
      href={href}
      target={target}
    >
      {children}
    </Link>
  );
}
