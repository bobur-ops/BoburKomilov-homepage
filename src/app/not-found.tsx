import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-destructive text-xl font-bold">
        404 - Page Not Found
      </h2>
      <p className="text-muted-foreground mt-2">
        Sorry, the page you’re looking for doesn’t exist.
      </p>

      <div className="flex items-center justify-center mt-4 gap-4">
        <Link href={"/"}>
          <Button>Home Page</Button>
        </Link>
      </div>
    </div>
  );
}
