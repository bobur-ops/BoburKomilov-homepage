"use client";

import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileLinksMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Close the menu when the pathname changes
    setIsOpen(false);
  }, [pathname]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="outline-none cursor-pointer md:hidden">
        <div className="relative z-50 p-2 rounded-md focus:outline-none">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="text-foreground hover:text-accent-foreground transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link className="w-full h-full" href={"/blog"}>
            Blog
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full h-full" href={"/uses"}>
            Uses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full h-full" href={"/git"}>
            Git
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            target="_blank"
            className="w-full h-full"
            href={"https://github.com/bobur-ops/BoburKomilov-homepage"}
          >
            Source
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
