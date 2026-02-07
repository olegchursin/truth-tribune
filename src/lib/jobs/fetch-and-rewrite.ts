import { fetchTopHeadlines } from "@/lib/news";
import { rewriteAndSaveArticle } from "@/lib/rewrite-service";
import { SECTIONS, SECTION_PARAMS } from "@/lib/feed";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function fetchAndRewriteAllNews() {
  const newsKey = process.env.NEWS_API_KEY;
  if (!newsKey) {
    throw new Error("Missing NEWS_API_KEY");
  }

  const results = [];
  const startTime = Date.now();

  console.log("Starting news fetch and rewrite job...");

  for (const section of SECTIONS) {
    console.log(`\nFetching ${section} section...`);
    try {
      const articles = await fetchTopHeadlines(
        newsKey,
        SECTION_PARAMS[section as keyof typeof SECTION_PARAMS]
      );
      console.log(`Found ${articles.length} articles for ${section}`);

      // Take top 20 per section
      const articlesToProcess = articles.slice(0, 20);
      for (let i = 0; i < articlesToProcess.length; i++) {
        const article = articlesToProcess[i];
        console.log(
          `[${section}] Processing ${i + 1}/${articlesToProcess.length}: ${article.title.slice(0, 60)}...`
        );
        try {
          await rewriteAndSaveArticle(article, section);
          results.push({ section, title: article.title, success: true });
        } catch (error) {
          console.error(`Failed to process article:`, error);
          results.push({
            section,
            title: article.title,
            success: false,
            error: String(error),
          });
        }
      }
    } catch (error) {
      console.error(`Failed to fetch ${section} section:`, error);
    }
  }

  // Clean up old articles (keep last 7 days)
  console.log("\nCleaning up old articles...");
  const supabase = getSupabaseAdmin();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { error: deleteError, count } = await supabase
    .from("articles")
    .delete({ count: "exact" })
    .lt("original_published_at", sevenDaysAgo);

  if (deleteError) {
    console.error("Error deleting old articles:", deleteError);
  } else {
    console.log(`Deleted ${count ?? 0} old articles`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const successCount = results.filter((r) => r.success).length;

  console.log(`\n✓ Job completed in ${duration}s`);
  console.log(`  Processed: ${results.length} articles`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${results.length - successCount}`);

  return {
    duration,
    total: results.length,
    success: successCount,
    failed: results.length - successCount,
    results,
  };
}
