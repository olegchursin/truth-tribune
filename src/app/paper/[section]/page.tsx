import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getFeed, SECTIONS, SECTION_LABELS } from "@/lib/feed";
import { Header } from "@/components/paper/Header";
import { BreakingTicker } from "@/components/paper/BreakingTicker";
import { ArticleCard } from "@/components/paper/ArticleCard";
import { Footer } from "@/components/paper/Footer";
import type { Slant } from "@/lib/types";

const SLANT_COOKIE = "truth-tribune-slant";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!SECTIONS.includes(section as (typeof SECTIONS)[number])) {
    notFound();
  }

  const cookieStore = await cookies();
  const slant = cookieStore.get(SLANT_COOKIE)?.value as Slant | undefined;
  if (slant !== "left" && slant !== "right") {
    redirect("/");
  }

  const articles = await getFeed(slant, section);
  const label = SECTION_LABELS[section as keyof typeof SECTION_LABELS];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      <div className="flex flex-1 flex-col">
        <div className="hidden sm:block">
          <BreakingTicker articles={articles} />
        </div>
        <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-6 sm:px-6">
        <section>
          <h1 className="mb-4 font-serif text-2xl font-bold text-black dark:text-white sm:text-3xl">
            {label.toUpperCase()}
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                showImage={true}
                size="default"
              />
            ))}
          </div>
        </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
