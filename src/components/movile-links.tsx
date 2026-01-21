import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function MobileLinksMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
          <a className="w-full h-full" href={"/blog"}>
            Blog
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a className="w-full h-full" href={"/uses"}>
            Uses
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a className="w-full h-full" href={"/git"}>
            Git
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a className="w-full h-full" href={"/guestbook"}>
            Guestbook
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            target="_blank"
            className="w-full h-full"
            href={"https://github.com/bobur-ops/BoburKomilov-homepage"}
          >
            Source
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
