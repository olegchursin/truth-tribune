import Link from "next/link";
import { ArticleWithRewrite } from "@/lib/types";

export function BreakingTicker({ articles }: { articles: ArticleWithRewrite[] }) {
  const items = articles.slice(0, 3);

  return (
    <div className="border-b border-border bg-muted/50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2.5 sm:px-6">
        <span className="shrink-0 font-semibold text-black dark:text-white">
          Breaking News
        </span>
        <span className="text-muted-foreground shrink-0">·</span>
        {items.map((article, i) => (
          <span key={article.id} className="flex shrink-0 items-center gap-x-2">
            {i > 0 && (
              <span className="text-muted-foreground shrink-0">·</span>
            )}
            <Link
              href={`/paper/article/${article.id}`}
              className="text-muted-foreground hover:text-foreground text-sm underline-offset-2 transition-colors hover:underline"
            >
              {article.rewrite.title}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}
