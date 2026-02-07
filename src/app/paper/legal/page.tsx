import { cookies } from "next/headers";
import Link from "next/link";
import { Header } from "@/components/paper/Header";
import { Footer } from "@/components/paper/Footer";
import { getLegalContent } from "@/lib/legal-content";
import type { Slant } from "@/lib/types";

const SLANT_COOKIE = "truth-tribune-slant";

export default async function LegalPage() {
  const cookieStore = await cookies();
  const slant = (cookieStore.get(SLANT_COOKIE)?.value ?? "left") as Slant;
  const safeSlant = slant === "right" ? "right" : "left";
  const content = getLegalContent("legal", safeSlant);

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
        <h1 className="font-serif text-3xl font-bold text-black dark:text-white">
          {content.heading}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">{content.subheading}</p>
        <div className="mt-10 space-y-8">
          {content.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-serif text-xl font-semibold text-black dark:text-white">
                {section.title}
              </h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
