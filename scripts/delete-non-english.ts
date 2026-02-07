#!/usr/bin/env tsx
/**
 * Delete articles detected as non-English from the DB.
 * Run: bun ./scripts/delete-non-english.ts
 * Requires: SUPABASE_URL, SUPABASE_SERVICE_KEY in .env.local
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { franc } from "franc-min";
import { getSupabaseAdmin } from "../src/lib/supabase";

async function main() {
  const supabase = getSupabaseAdmin();

  const { data: articles, error: fetchError } = await supabase
    .from("articles")
    .select("id, original_title, original_description");

  if (fetchError) {
    console.error("Failed to fetch articles:", fetchError);
    process.exit(1);
  }

  if (!articles?.length) {
    console.log("No articles in DB.");
    process.exit(0);
  }

  const toDelete: string[] = [];
  const minLength = 20; // franc needs some text; short snippets often misdetect

  for (const a of articles) {
    const text = [a.original_title, a.original_description]
      .filter(Boolean)
      .join(" ");
    if (text.length < minLength) continue; // keep short/empty
    const lang = franc(text);
    if (lang !== "eng" && lang !== "und") {
      toDelete.push(a.id);
    }
  }

  if (toDelete.length === 0) {
    console.log("No non-English articles found.");
    process.exit(0);
  }

  console.log(`Deleting ${toDelete.length} non-English articles (rewrites cascade)...`);
  const { error: deleteError, count } = await supabase
    .from("articles")
    .delete({ count: "exact" })
    .in("id", toDelete);

  if (deleteError) {
    console.error("Delete failed:", deleteError);
    process.exit(1);
  }
  console.log(`Deleted ${count ?? toDelete.length} articles.`);
}

main();
