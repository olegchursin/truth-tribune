import Link from "next/link";
import { Header } from "@/components/paper/Header";
import { Footer } from "@/components/paper/Footer";
import { AboutContent } from "@/components/shared/AboutContent";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      <main className="mx-auto flex-1 w-full max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/paper"
          className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm"
        >
          ← Back to paper
        </Link>

        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
