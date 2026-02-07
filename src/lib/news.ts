import { unstable_cache } from "next/cache";
import type { NewsApiArticle } from "./types";

const NEWS_API_BASE = "https://newsapi.org/v2";

export interface TopHeadlinesOptions {
  category?: string;
  country?: string;
  q?: string;
}

async function fetchTopHeadlinesRaw(
  apiKey: string,
  options?: TopHeadlinesOptions
): Promise<NewsApiArticle[]> {
  const country = options?.country ?? "us";
  const params = new URLSearchParams({
    country,
    pageSize: "20",
    apiKey,
  });
  if (options?.category) params.set("category", options.category);
  if (options?.q) params.set("q", options.q);

  const url = `${NEWS_API_BASE}/top-headlines?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`News API error: ${res.status} ${text}`);
  }
  const data = (await res.json()) as {
    status: string;
    totalResults?: number;
    articles: NewsApiArticle[];
  };
  if (data.status !== "ok" || !Array.isArray(data.articles)) {
    throw new Error("News API returned invalid response");
  }
  return data.articles.filter(
    (a) => a.title && a.url && !a.title.includes("[Removed]")
  );
}

export async function fetchTopHeadlines(
  apiKey: string,
  options?: TopHeadlinesOptions
): Promise<NewsApiArticle[]> {
  // Check if we're in a Next.js runtime (has incrementalCache)
  const hasNextCache = typeof process !== 'undefined' && 
    process.env.NEXT_RUNTIME !== undefined;
  
  // Use cache in Next.js runtime, skip in scripts
  if (!hasNextCache) {
    return fetchTopHeadlinesRaw(apiKey, options);
  }
  
  const cacheKey = [
    "news-top-headlines",
    options?.country ?? "us",
    options?.category ?? "",
    options?.q ?? "",
  ];
  return unstable_cache(
    () => fetchTopHeadlinesRaw(apiKey, options),
    cacheKey,
    { revalidate: 3600, tags: ["news"] }
  )();
}

export interface EverythingOptions {
  q: string;
  pageSize?: number;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  language?: string;
}

async function fetchEverythingRaw(
  apiKey: string,
  options: EverythingOptions
): Promise<NewsApiArticle[]> {
  const params = new URLSearchParams({
    q: options.q,
    pageSize: String(options.pageSize ?? 20),
    sortBy: options.sortBy ?? "publishedAt",
    apiKey,
  });
  if (options.language) params.set("language", options.language);

  const url = `${NEWS_API_BASE}/everything?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`News API error: ${res.status} ${text}`);
  }
  const data = (await res.json()) as {
    status: string;
    totalResults?: number;
    articles: NewsApiArticle[];
  };
  if (data.status !== "ok" || !Array.isArray(data.articles)) {
    throw new Error("News API returned invalid response");
  }
  return data.articles.filter(
    (a) => a.title && a.url && !a.title.includes("[Removed]")
  );
}

export async function fetchEverything(
  apiKey: string,
  options: EverythingOptions
): Promise<NewsApiArticle[]> {
  const hasNextCache =
    typeof process !== "undefined" && process.env.NEXT_RUNTIME !== undefined;
  if (!hasNextCache) {
    return fetchEverythingRaw(apiKey, options);
  }
  const cacheKey = [
    "news-everything",
    options.q,
    options.sortBy ?? "publishedAt",
    options.language ?? "",
  ];
  return unstable_cache(
    () => fetchEverythingRaw(apiKey, options),
    cacheKey,
    { revalidate: 3600, tags: ["news"] }
  )();
}
