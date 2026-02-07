import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { ArticleWithRewrite } from '@/lib/types';
import type { Slant } from '@/lib/types';
import { cn } from '@/lib/utils';

const PLACEHOLDER_MOTTOS: Record<Slant, string> = {
  left: 'Eat the rich. Then read the news.',
  right: "Facts don't care about your feelings. Neither do we."
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return '';
  }
}

interface ArticleCardProps {
  article: ArticleWithRewrite;
  showImage?: boolean;
  size?: 'default' | 'compact' | 'feature';
  className?: string;
}

export function ArticleCard({
  article,
  showImage = true,
  size = 'default',
  className
}: ArticleCardProps) {
  const hasImage = showImage && article.image_url;
  const showPlaceholder = showImage && !article.image_url;
  const articleUrl = `/paper/article/${article.id}`;
  const slant = article.rewrite?.slant ?? 'left';

  return (
    <Card
      className={cn(
        'overflow-hidden border border-border bg-card',
        (hasImage || showPlaceholder) && 'pt-0',
        size === 'compact' && 'gap-2 py-3',
        className
      )}
    >
      {hasImage && article.image_url && (
        <Link href={articleUrl}>
          <div
            className={cn(
              'relative w-full overflow-hidden rounded-t-xl bg-muted',
              size === 'compact' ? 'aspect-square' : 'aspect-video'
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image_url}
              alt=""
              className="article-image h-full w-full object-cover"
            />
          </div>
        </Link>
      )}
      {showPlaceholder && (
        <Link href={articleUrl}>
          <div
            className={cn(
              'relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-t-xl bg-muted px-4 py-6',
              size === 'compact' ? 'aspect-square' : 'aspect-video'
            )}
          >
            <Image
              src="/tt-logo-square.svg"
              alt="Truth Tribune"
              width={64}
              height={64}
              className="h-12 w-12 dark:invert sm:h-14 sm:w-14"
            />
            <p className="text-muted-foreground text-center text-xs font-medium sm:text-sm">
              {PLACEHOLDER_MOTTOS[slant]}
            </p>
          </div>
        </Link>
      )}
      <CardHeader className={cn(size === 'compact' && 'px-4 py-0')}>
        <CardTitle
          className={cn('font-serif', size === 'feature' && 'text-2xl')}
        >
          <Link href={articleUrl} className="hover:underline">
            {article.rewrite.title}
          </Link>
        </CardTitle>
      </CardHeader>
      {(size === 'feature' && article.rewrite.description) ||
      (size === 'default' && article.rewrite.description) ? (
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {article.rewrite.description}
          </p>
        </CardContent>
      ) : null}
      <CardFooter
        className={cn(
          'text-muted-foreground flex gap-2 text-xs',
          size === 'compact' && 'px-4 py-0'
        )}
      >
        <span>{formatDate(article.original_published_at)}</span>
      </CardFooter>
    </Card>
  );
}

export function ArticleCardSkeleton({
  showImage = true,
  className
}: {
  showImage?: boolean;
  className?: string;
}) {
  return (
    <Card className={cn('overflow-hidden', showImage && 'pt-0', className)}>
      {showImage && <Skeleton className="aspect-video w-full rounded-none" />}
      <CardHeader>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-3 w-24" />
      </CardFooter>
    </Card>
  );
}
