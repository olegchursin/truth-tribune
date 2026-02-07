import Groq from "groq-sdk";
import { unstable_cache } from "next/cache";
import type { Slant } from "./types";

const slantLabel = (s: Slant) =>
  s === "left" ? "left-liberal" : "right-conservative";

function createSystemPrompt(slant: Slant): string {
  return `You rewrite news headlines and short descriptions to favor a ${slantLabel(slant)} perspective. Keep factual structure and the tone of a newspaper. Output only valid JSON with exactly two keys: "title" (string) and "description" (string). No markdown, no code block.`;
}

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

async function rewriteOneRaw(
  apiKey: string,
  slant: Slant,
  title: string,
  description: string | null
): Promise<{ title: string; description: string }> {
  await waitForRateLimit();
  const groq = new Groq({ apiKey });
  const content = `Headline: ${title}\nDescription: ${description ?? "No description"}`;
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: createSystemPrompt(slant) },
      { role: "user", content },
    ],
    temperature: 0.3,
    max_tokens: 300,
  });
  const raw =
    completion.choices[0]?.message?.content?.trim() ?? "{}";
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

export async function rewriteArticle(
  apiKey: string,
  slant: Slant,
  articleId: string,
  title: string,
  description: string | null
): Promise<{ title: string; description: string }> {
  return unstable_cache(
    () => rewriteOneRaw(apiKey, slant, title, description),
    ["rewrite", articleId, slant],
    { revalidate: 3600, tags: ["rewrite"] }
  )();
}

export async function rewriteArticlesBatch(
  apiKey: string,
  slant: Slant,
  items: { id: string; title: string; description: string | null }[]
): Promise<{ title: string; description: string }[]> {
  const results = await Promise.all(
    items.map((item) =>
      rewriteArticle(apiKey, slant, item.id, item.title, item.description)
    )
  );
  return results;
}
