#!/usr/bin/env tsx
/**
 * One-off: delete all articles with section = 'general'.
 * Run: bun ./scripts/delete-general-section.ts
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
    .delete()
    .eq("section", "general")
    .select("id");

  if (error) {
    console.error("Delete failed:", error);
    process.exit(1);
  }

  const count = data?.length ?? 0;
  console.log(`Deleted ${count} articles with section 'general'.`);
}

main();
