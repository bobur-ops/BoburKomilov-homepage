import ThemeSwitcher from "@/features/theme/ThemeSwitcher";
import Link from "next/link";
import Portal from "./Portal";
import MobileLinksMenu from "./MobileLinksMenu";
import NavbarLink from "./NavbarLink";

export default function Navbar() {
  return (
    <Portal>
      <div className="h-14 left-0 right-0 fixed top-0 flex z-10 items-center justify-center bg-accent/65 backdrop-blur-xl border-b">
        <div className="w-full max-w-4xl flex justify-between items-center px-2 md:px-4 lg:px-0">
          <Link href="/">Muxammadbobur K.</Link>
          <div className="hidden md:flex items-center gap-6">
            <NavbarLink href="/blog">Blog</NavbarLink>
            <NavbarLink href="/uses">Uses</NavbarLink>
            <NavbarLink href="/git">Git</NavbarLink>
            <NavbarLink
              href="https://github.com/bobur-ops/BoburKomilov-homepage"
              target="_blank"
            >
              Source
            </NavbarLink>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <MobileLinksMenu />
          </div>
        </div>
      </div>
    </Portal>
  );
}
