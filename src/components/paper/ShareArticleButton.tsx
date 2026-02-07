'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  text?: string;
};

export function ShareArticleButton({ title, text }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text ?? title,
          url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await copyUrl(url);
        }
      }
      return;
    }

    await copyUrl(url);
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: open in new window so user can copy from address bar
      window.open(url, '_blank', 'noopener');
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-1.5"
      aria-label={copied ? 'Link copied' : 'Share article'}
    >
      <Share2 className="size-4" aria-hidden />
      {copied ? 'Copied' : 'Share'}
    </Button>
  );
}
