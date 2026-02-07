import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getFeed, SECTION_LABELS } from "@/lib/feed";
import { Header } from "@/components/paper/Header";
import { BreakingTicker } from "@/components/paper/BreakingTicker";
import { ArticleCard } from "@/components/paper/ArticleCard";
import { ArticleCardCompact } from "@/components/paper/ArticleCardCompact";
import { Footer } from "@/components/paper/Footer";
import type { Slant } from "@/lib/types";

const SLANT_COOKIE = "truth-tribune-slant";

export default async function PaperPage() {
  const cookieStore = await cookies();
  const slant = cookieStore.get(SLANT_COOKIE)?.value as Slant | undefined;
  if (slant !== "left" && slant !== "right") {
    redirect("/");
  }

  const [
    articles,
    scienceArticles,
    businessArticles,
    sportsArticles,
    entertainmentArticles,
    healthArticles,
  ] = await Promise.all([
    getFeed(slant),
    getFeed(slant, "science"),
    getFeed(slant, "business"),
    getFeed(slant, "sports"),
    getFeed(slant, "entertainment"),
    getFeed(slant, "health"),
  ]);

  const banner = articles.slice(0, 3);
  const recent = articles.slice(3, 8);
  const focus = articles[7];
  const business = businessArticles.slice(0, 5);
  const science = scienceArticles.slice(0, 9);
  const healthSection = healthArticles.slice(0, 5);
  const sports = sportsArticles.slice(0, 5);
  const entertainment = entertainmentArticles.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      <div className="flex flex-1 flex-col">
        <div className="hidden sm:block">
          <BreakingTicker articles={articles} />
        </div>
        <main className="mx-auto grid flex-1 grid-cols-1 gap-6 px-4 py-6 lg:gap-8 sm:px-6 w-full max-w-7xl">
        {/* Top 3-column banner */}
        <section className="grid gap-6 md:grid-cols-3">
          {banner.map((a) => (
            <ArticleCard key={a.id} article={a} showImage={true} size="default" />
          ))}
        </section>

        {/* Main area: Recent (1/4) | In Focus (2/4) | Business (1/4) */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
          <aside className="lg:col-span-1">
            <h2 className="mb-4 font-serif text-xl font-bold text-black dark:text-white">
              Recent News
            </h2>
            <div className="space-y-0">
              {recent.map((a) => (
                <ArticleCardCompact key={a.id} article={a} />
              ))}
            </div>
          </aside>
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-serif text-xl font-bold text-black dark:text-white">
              In Focus
            </h2>
            {focus && (
              <ArticleCard
                article={focus}
                showImage={true}
                size="feature"
              />
            )}
          </div>
          <aside className="lg:col-span-1">
            <h2 className="mb-4 font-serif text-xl font-bold text-black dark:text-white">
              Business
            </h2>
            <div className="space-y-0">
              {business.map((a) => (
                <ArticleCardCompact key={a.id} article={a} />
              ))}
            </div>
          </aside>
        </section>

        {/* Sections: Entertainment above; then Health, Science, Sports — 3 columns */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Entertainment: full width at top */}
          <div className="lg:col-span-12">
            <Link
              href="/paper/entertainment"
              className="mb-4 block font-serif text-xl font-bold text-black hover:underline dark:text-white"
            >
              {SECTION_LABELS.entertainment}
            </Link>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {entertainment.map((a) => (
                <ArticleCard
                  key={a.id}
                  article={a}
                  showImage={true}
                  size="default"
                />
              ))}
            </div>
          </div>

          {/* Health: feature + compact list (same as Sports) */}
          <div className="lg:col-span-4">
            <Link
              href="/paper/health"
              className="mb-4 block font-serif text-xl font-bold text-black hover:underline dark:text-white"
            >
              {SECTION_LABELS.health}
            </Link>
            {healthSection[0] && (
              <ArticleCard article={healthSection[0]} showImage={true} size="feature" />
            )}
            <div className="mt-4 space-y-0">
              {healthSection.slice(1, 5).map((a) => (
                <ArticleCardCompact key={a.id} article={a} />
              ))}
            </div>
          </div>

          {/* Science: vertical compact list */}
          <div className="lg:col-span-4">
            <Link
              href="/paper/science"
              className="mb-4 block font-serif text-xl font-bold text-black hover:underline dark:text-white"
            >
              {SECTION_LABELS.science}
            </Link>
            <div className="space-y-0">
              {science.map((a) => (
                <ArticleCardCompact key={a.id} article={a} />
              ))}
            </div>
          </div>

          {/* Sports: feature + compact list */}
          <div className="lg:col-span-4">
            <Link
              href="/paper/sports"
              className="mb-4 block font-serif text-xl font-bold text-black hover:underline dark:text-white"
            >
              {SECTION_LABELS.sports}
            </Link>
            {sports[0] && (
              <ArticleCard article={sports[0]} showImage={true} size="feature" />
            )}
            <div className="mt-4 space-y-0">
              {sports.slice(1, 5).map((a) => (
                <ArticleCardCompact key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
