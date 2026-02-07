'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Info, X } from 'lucide-react';
import { AboutContent } from '@/components/shared/AboutContent';
import { SECTIONS, SECTION_LABELS } from '@/lib/feed';
import { cn } from '@/lib/utils';
import { SLANT_MOTTOS } from '@/lib/slant-client';
import { useSlant } from '@/lib/slant-context';
import { Logo } from './Logo';

const NAV_ITEMS: { label: string; href: string; slug: string | null }[] = [
  { label: 'Home', href: '/paper', slug: null },
  ...SECTIONS.map(slug => ({
    label: SECTION_LABELS[slug],
    href: `/paper/${slug}`,
    slug
  }))
];

export function Header() {
  const pathname = usePathname();
  const { slant, setSlant: setSlantGlobal, mounted } = useSlant();
  const [aboutOpen, setAboutOpen] = useState(false);

  function handleSlantChange(
    newSlant: 'left' | 'right'
  ) {
    setSlantGlobal(newSlant);
  }
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const navList = (
    <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
      {NAV_ITEMS.map(({ label, href, slug }) => {
        const isActive =
          href === '/paper'
            ? pathname === '/paper'
            : slug !== null && pathname === `/paper/${slug}`;
        return (
          <li key={label}>
            <Link
              href={href}
              className={cn(
                'text-sm font-medium hover:underline',
                isActive
                  ? 'text-foreground font-semibold underline'
                  : 'text-foreground'
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header className="border-b border-border bg-white dark:bg-black">
      {/* Mobile: sticky floating motto pill with about trigger */}
      <div className="fixed top-3 left-4 right-4 z-50 sm:hidden">
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2.5 text-xs text-muted-foreground shadow-md backdrop-blur">
          <span className="min-w-0 flex-1 truncate">
            {mounted ? SLANT_MOTTOS[slant] : SLANT_MOTTOS.left}
          </span>
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="About Truth Tribune"
          >
            <Info className="size-4" />
          </button>
        </div>
      </div>

      {/* Desktop: motto bar */}
      <div className="hidden border-b border-border bg-muted/50 py-1.5 text-xs text-muted-foreground sm:block">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link
            href="/paper/about"
            className="order-1 hover:text-foreground hover:underline sm:order-2 sm:inline"
          >
            About Truth Tribune
          </Link>
          <span className="order-2 sm:order-1">
            {mounted ? SLANT_MOTTOS[slant] : SLANT_MOTTOS.left}
          </span>
        </div>
      </div>

      <Sheet open={aboutOpen} onOpenChange={setAboutOpen}>
        <SheetContent side="bottom" className="flex max-h-[85vh] flex-col overflow-hidden rounded-t-2xl px-4 sm:px-6" showCloseButton={false}>
          <SheetHeader className="flex shrink-0 flex-row items-center justify-between gap-4 py-3 px-0">
            <SheetTitle className="text-lg">About Truth Tribune</SheetTitle>
            <SheetClose className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close">
              <X className="size-4" />
            </SheetClose>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-2">
            <AboutContent hideTitle />
          </div>
        </SheetContent>
      </Sheet>
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 pt-20 sm:pt-3 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 sm:flex">
            <ToggleGroup
              type="single"
              value={slant}
              onValueChange={(v: string | undefined) =>
                v && (v === 'left' || v === 'right') && handleSlantChange(v)
              }
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem
                value="left"
                aria-label="Left perspective"
                aria-current={slant === 'left' ? 'true' : undefined}
              >
                {slant === 'left' && (
                  <span
                    className="size-2 shrink-0 rounded-full bg-emerald-500"
                    aria-hidden
                  />
                )}
                Left
              </ToggleGroupItem>
              <ToggleGroupItem
                value="right"
                aria-label="Right perspective"
                aria-current={slant === 'right' ? 'true' : undefined}
              >
                {slant === 'right' && (
                  <span
                    className="size-2 shrink-0 rounded-full bg-emerald-500"
                    aria-hidden
                  />
                )}
                Right
              </ToggleGroupItem>
            </ToggleGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="What is this selector?"
                >
                  <Info className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[240px]">
                <p>
                  Choose which political perspective shapes how headlines are
                  framed: Left or Right. Articles are rewritten to match your
                  selection.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Link href="/paper" className="flex items-center justify-self-center">
          <Logo className="h-14 w-auto sm:h-16" />
        </Link>
        <div className="hidden justify-self-end text-muted-foreground text-sm sm:block">
          <span>{date}</span>
        </div>
      </div>
      <nav className="hidden border-t border-border py-2 sm:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">{navList}</div>
      </nav>
    </header>
  );
}
