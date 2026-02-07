import Link from "next/link";
import type { ArticleWithRewrite } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function ArticleCardCompact({
  article,
  className,
}: {
  article: ArticleWithRewrite;
  className?: string;
}) {
  const articleUrl = `/paper/article/${article.id}`;

  return (
    <article className={cn("border-b border-border py-3 last:border-0", className)}>
      <Link
        href={articleUrl}
        className="font-serif font-medium text-black hover:underline dark:text-white"
      >
        {article.rewrite.title}
      </Link>
      <div className="text-muted-foreground mt-1 text-xs">
        {formatDate(article.original_published_at)}
      </div>
    </article>
  );
}
