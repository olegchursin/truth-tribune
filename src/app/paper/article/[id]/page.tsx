import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";
import { Header } from "@/components/paper/Header";
import { Footer } from "@/components/paper/Footer";
import { ShareArticleButton } from "@/components/paper/ShareArticleButton";
import type { Slant, ArticleWithRewrite } from "@/lib/types";

const SLANT_COOKIE = "truth-tribune-slant";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const slant = cookieStore.get(SLANT_COOKIE)?.value as Slant | undefined;

  if (slant !== "left" && slant !== "right") {
    redirect("/");
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      *,
      rewrite:article_rewrites!inner(*)
    `
    )
    .eq("id", id)
    .eq("article_rewrites.slant", slant)
    .single();

  if (error || !data) {
    notFound();
  }

  // Transform rewrite from array to single object
  const article: ArticleWithRewrite = {
    ...data,
    rewrite: Array.isArray(data.rewrite) ? data.rewrite[0] : data.rewrite,
  };

  if (!article.rewrite) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />

      <article className="mx-auto flex-1 w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Article header */}
        <header className="mb-8">
          <h1 className="font-serif text-2xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
            {article.rewrite.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={article.original_published_at}>
              {formatDate(article.original_published_at)}
            </time>
            <span>·</span>
            <span className="capitalize">{article.section}</span>
            <span className="ml-auto">
              <ShareArticleButton
                title={article.rewrite.title}
                text={article.rewrite.description ?? undefined}
              />
            </span>
          </div>
        </header>

        {/* Featured image */}
        {article.image_url && (
          <figure className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image_url}
              alt=""
              className="w-full rounded-lg object-cover"
            />
          </figure>
        )}

        {/* Article description/lead */}
        {article.rewrite.description && (
          <p className="mb-6 text-base font-medium leading-relaxed text-gray-700 dark:text-gray-300 sm:text-xl">
            {article.rewrite.description}
          </p>
        )}

        {/* Article body */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.rewrite.full_content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className={i === 0 ? "mb-4 text-base sm:text-lg" : "mb-4"}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Original article info */}
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="mb-4 font-serif text-xl font-bold text-black dark:text-white">
            Original Article
          </h3>
          <div className="rounded-lg bg-muted p-6">
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-medium">Published by:</span>{" "}
              {article.original_source}
              {article.original_author && ` · ${article.original_author}`}
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              <span className="font-medium">Original headline:</span>{" "}
              {article.original_title}
            </p>
            <a
              href={article.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Read original article →
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
