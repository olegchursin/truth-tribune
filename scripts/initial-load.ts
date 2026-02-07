#!/usr/bin/env tsx

/**
 * Initial data loading script
 * Run with: bun run scripts/initial-load.ts
 * or: tsx scripts/initial-load.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(__dirname, "../.env.local") });

import { fetchAndRewriteAllNews } from "../src/lib/jobs/fetch-and-rewrite";

async function main() {
  console.log("🚀 Starting initial data load...\n");
  console.log("This will fetch news from all sections and rewrite them for both slants.");
  console.log("This may take several minutes due to rate limiting.\n");

  try {
    const result = await fetchAndRewriteAllNews();
    console.log("\n✅ Initial data load completed successfully!");
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Initial data load failed:", error);
    process.exit(1);
  }
}

main();
