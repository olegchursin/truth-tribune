#!/usr/bin/env tsx
/**
 * One-off migration: remap politics and international articles to general.
 * Run: bun run scripts/migrate-sections.ts
 * Requires: SUPABASE_URL, SUPABASE_SERVICE_KEY in .env.local
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { getSupabaseAdmin } from "../src/lib/supabase";

async function main() {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("articles")
    .update({ section: "general" })
    .in("section", ["politics", "international"])
    .select("id");

  if (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }

  const count = data?.length ?? 0;
  console.log(`Remapped ${count} articles from politics/international to general.`);
}

main();
