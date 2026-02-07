import { getSupabaseClient } from "./supabase";
import type { ArticleWithRewrite, Slant } from "./types";

export const SECTIONS = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
] as const;
export type SectionSlug = (typeof SECTIONS)[number];

export const SECTION_PARAMS = {
  business: { country: "us", category: "business" },
  entertainment: { country: "us", category: "entertainment" },
  health: { country: "us", category: "health" },
  science: { country: "us", category: "science" },
  sports: { country: "us", category: "sports" },
  technology: { country: "us", category: "technology" },
} as const;

export const SECTION_LABELS: Record<SectionSlug, string> = {
  business: "Business",
  entertainment: "Entertainment",
  health: "Health",
  science: "Science",
  sports: "Sports",
  technology: "Technology",
};

export async function getFeed(
  slant: Slant,
  section?: string
): Promise<ArticleWithRewrite[]> {
  const supabase = getSupabaseClient();

  let query = supabase
    .from("articles")
    .select(
      `
      *,
      rewrite:article_rewrites!inner(*)
    `
    )
    .eq("article_rewrites.slant", slant)
    .order("original_published_at", { ascending: false })
    .limit(20);

  if (section && SECTIONS.includes(section as SectionSlug)) {
    query = query.eq("section", section);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching articles from Supabase:", error);
    throw error;
  }

  // Transform the data to match ArticleWithRewrite type
  // Supabase returns rewrite as an array, we need just the first one
  const articles = (data || []).map((article: any) => ({
    ...article,
    rewrite: Array.isArray(article.rewrite)
      ? article.rewrite[0]
      : article.rewrite,
  })) as ArticleWithRewrite[];

  return articles;
}
