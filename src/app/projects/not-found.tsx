import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <p className="text-6xl font-bold mb-4">404</p>
        <p className="text-muted mb-8">Project not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </div>
    </main>
  );
}
