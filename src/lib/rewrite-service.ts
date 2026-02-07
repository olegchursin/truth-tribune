import Groq from "groq-sdk";
import type { Slant, NewsApiArticle, Article, ArticleRewrite } from "./types";
import { getSupabaseAdmin } from "./supabase";

const GROQ_RPM = 30;
const MIN_MS_BETWEEN_REQUESTS = Math.ceil((60 * 1000) / GROQ_RPM);

let nextStartTime = 0;
let queueResolve: (() => void) | null = null;
let queuePromise = Promise.resolve<void>(undefined);

async function waitForRateLimit(): Promise<void> {
  const prev = queuePromise;
  queuePromise = new Promise<void>((r) => {
    queueResolve = r;
  });
  await prev;
  const now = Date.now();
  const waitMs = Math.max(0, nextStartTime - now);
  if (waitMs > 0) {
    await new Promise((r) => setTimeout(r, waitMs));
  }
  nextStartTime = Date.now() + MIN_MS_BETWEEN_REQUESTS;
  queueResolve!();
}

function getSlantLabel(slant: Slant): string {
  return slant === "left" ? "far-left progressive" : "far-right conservative";
}

function createHeadlinePrompt(slant: Slant): string {
  if (slant === "left") {
    return `Rewrite this headline and description from a far-left progressive perspective. Emphasize corporate greed, systemic oppression, climate urgency, billionaire exploitation, and the failures of capitalism. Use language that champions workers, marginalized communities, and bold government action. Make conservatives angry. Output only valid JSON with exactly two keys: "title" (string) and "description" (string). No markdown, no code block.`;
  } else {
    return `Rewrite this headline and description from a far-right conservative perspective. Emphasize individual liberty, government overreach, traditional values, woke culture threats, and the free market. Use language that champions patriots, entrepreneurs, and limited government. Make liberals angry. Output only valid JSON with exactly two keys: "title" (string) and "description" (string). No markdown, no code block.`;
  }
}

function createFullContentPrompt(slant: Slant): string {
  const slantLabel = getSlantLabel(slant);
  if (slant === "left") {
    return `Given this headline and description, generate a full 500-800 word news article written from a ${slantLabel} perspective. Include 3-5 paragraphs with specific details inferred from the headline. Emphasize corporate greed, systemic injustice, climate crisis, worker exploitation, and the need for progressive reform. Maintain journalistic tone but with clear leftist bias that would infuriate conservatives. Output only the article text, no JSON, no markdown.`;
  } else {
    return `Given this headline and description, generate a full 500-800 word news article written from a ${slantLabel} perspective. Include 3-5 paragraphs with specific details inferred from the headline. Emphasize individual freedom, government waste, traditional values under attack, and free market solutions. Maintain journalistic tone but with clear conservative bias that would infuriate liberals. Output only the article text, no JSON, no markdown.`;
  }
}

async function rewriteHeadline(
  groq: Groq,
  slant: Slant,
  title: string,
  description: string | null
): Promise<{ title: string; description: string }> {
  await waitForRateLimit();

  const content = `Headline: ${title}\nDescription: ${description ?? "No description"}`;
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: createHeadlinePrompt(slant) },
      { role: "user", content },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  const raw = completion.choices[0]?.message?.content?.trim() ?? "{}";
  try {
    const parsed = JSON.parse(raw) as { title?: string; description?: string };
    return {
      title: typeof parsed.title === "string" ? parsed.title : title,
      description:
        typeof parsed.description === "string"
          ? parsed.description
          : description ?? "",
    };
  } catch {
    return { title, description: description ?? "" };
  }
}

async function generateFullContent(
  groq: Groq,
  slant: Slant,
  rewrittenTitle: string,
  rewrittenDescription: string
): Promise<string> {
  await waitForRateLimit();

  const content = `Headline: ${rewrittenTitle}\nDescription: ${rewrittenDescription}`;
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: createFullContentPrompt(slant) },
      { role: "user", content },
    ],
    temperature: 0.7,
    max_tokens: 1200,
  });

  return completion.choices[0]?.message?.content?.trim() ?? "";
}

function articleId(url: string): string {
  return url.replace(/[^a-z0-9]/gi, "").slice(0, 64) || "unknown";
}

export async function rewriteAndSaveArticle(
  article: NewsApiArticle,
  section: string
): Promise<void> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY");
  }

  const groq = new Groq({ apiKey });
  const supabase = getSupabaseAdmin();
  const id = articleId(article.url);

  // Check if article already exists
  const { data: existing } = await supabase
    .from("articles")
    .select("id")
    .eq("id", id)
    .single();

  if (existing) {
    console.log(`Article ${id} already exists, skipping`);
    return;
  }

  // Insert article record
  const articleRecord: Article = {
    id,
    original_url: article.url,
    original_source: article.source.name,
    original_author: article.author,
    original_title: article.title,
    original_description: article.description,
    original_published_at: article.publishedAt,
    section,
    image_url: article.urlToImage,
  };

  const { error: articleError } = await supabase
    .from("articles")
    .insert(articleRecord);

  if (articleError) {
    console.error(`Failed to insert article ${id}:`, articleError);
    return;
  }

  // Rewrite for both slants
  for (const slant of ["left", "right"] as Slant[]) {
    try {
      const { title, description } = await rewriteHeadline(
        groq,
        slant,
        article.title,
        article.description
      );

      const fullContent = await generateFullContent(
        groq,
        slant,
        title,
        description
      );

      const rewrite: Omit<ArticleRewrite, "id" | "created_at"> = {
        article_id: id,
        slant,
        title,
        description,
        full_content: fullContent,
      };

      const { error: rewriteError } = await supabase
        .from("article_rewrites")
        .insert(rewrite);

      if (rewriteError) {
        console.error(
          `Failed to insert rewrite for ${id} (${slant}):`,
          rewriteError
        );
      } else {
        console.log(`✓ Rewrote ${id} (${slant}): ${title.slice(0, 50)}...`);
      }
    } catch (error) {
      console.error(`Error rewriting ${id} (${slant}):`, error);
    }
  }
}
