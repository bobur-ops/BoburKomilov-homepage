import ThemeSwitcher from "@/features/theme/ThemeSwitcher";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="h-14 left-0 right-0 fixed top-0 flex items-center justify-center bg-accent/65 backdrop-blur-xl border-b">
      <div className="w-full max-w-4xl flex justify-between items-center px-2 md:px-4 lg:px-0">
        <Link href="/">Muxammadbobur K.</Link>
        <div className="flex items-center gap-2">
          {/* <Link href="/about" className="hover:underline underline-offset-2">
            About
          </Link> */}
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
