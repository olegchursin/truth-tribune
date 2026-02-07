'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from 'next-themes';
import { SECTIONS, SECTION_LABELS } from '@/lib/feed';
import { SLANT_MOTTOS } from '@/lib/slant-client';
import { useSlant } from '@/lib/slant-context';
import { Home, Layers, Menu, Monitor, Moon, Scale, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileBottomDock() {
  const pathname = usePathname();
  const { slant, setSlant, mounted } = useSlant();
  const { theme, setTheme } = useTheme();
  const [topicOpen, setTopicOpen] = useState(false);
  const [perspectiveOpen, setPerspectiveOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function handleSlantChange(newSlant: 'left' | 'right') {
    setSlant(newSlant);
    setPerspectiveOpen(false);
  }

  const dockItemClass =
    'flex flex-col items-center justify-center gap-0.5 py-2 text-muted-foreground transition-colors active:bg-muted/50 rounded-lg min-w-0 flex-1';
  const iconClass = 'size-6 shrink-0';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around rounded-3xl border border-border bg-background/95 py-2 shadow-lg backdrop-blur">
        <Link
          href="/paper"
          className={cn(
            dockItemClass,
            pathname === '/paper' && 'text-foreground font-medium'
          )}
          aria-label="Home"
        >
          <Home className={iconClass} aria-hidden />
          <span className="text-[10px]">Home</span>
        </Link>

        <Sheet open={perspectiveOpen} onOpenChange={setPerspectiveOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={dockItemClass}
              aria-label="Perspective"
            >
              <Scale className={iconClass} aria-hidden />
              <span className="text-[10px]">Perspective</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl px-4">
            <SheetHeader className="px-0">
              <SheetTitle>Perspective</SheetTitle>
              <p className="text-muted-foreground text-sm">
                {mounted ? SLANT_MOTTOS[slant] : SLANT_MOTTOS.left}
              </p>
            </SheetHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Truth Tribune shows the same news through left and right slants.
                We make media framing obvious so you can see how headlines shape
                the story.
              </p>
              <div className="pb-6">
                <ToggleGroup
                type="single"
                value={slant}
                onValueChange={(v: string | undefined) =>
                  v && (v === 'left' || v === 'right') && handleSlantChange(v)
                }
                variant="outline"
                size="lg"
                className="grid w-full grid-cols-2"
              >
                <ToggleGroupItem
                  value="left"
                  aria-label="Left perspective"
                  className="py-4"
                >
                  {slant === 'left' && (
                    <span
                      className="mr-2 size-2 shrink-0 rounded-full bg-emerald-500"
                      aria-hidden
                    />
                  )}
                  Left
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="right"
                  aria-label="Right perspective"
                  className="py-4"
                >
                  {slant === 'right' && (
                    <span
                      className="mr-2 size-2 shrink-0 rounded-full bg-emerald-500"
                      aria-hidden
                    />
                  )}
                  Right
                </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={topicOpen} onOpenChange={setTopicOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={dockItemClass}
              aria-label="Topics"
            >
              <Layers className={iconClass} aria-hidden />
              <span className="text-[10px]">Topic</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl px-4">
            <SheetHeader className="px-0">
              <SheetTitle>Topics</SheetTitle>
            </SheetHeader>
            <ul className="grid grid-cols-2 gap-2 pb-6">
              {SECTIONS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/paper/${slug}`}
                    className={cn(
                      'block rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted',
                      pathname === `/paper/${slug}`
                        ? 'bg-muted text-foreground'
                        : 'text-foreground'
                    )}
                    onClick={() => setTopicOpen(false)}
                  >
                    {SECTION_LABELS[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>

        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={dockItemClass}
              aria-label="Menu"
            >
              <Menu className={iconClass} aria-hidden />
              <span className="text-[10px]">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl px-4">
            <SheetHeader className="px-0">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 pb-6">
              <div className="space-y-2">
                <span className="text-sm font-medium block mb-3">Theme</span>
                <ToggleGroup
                  type="single"
                  value={theme ?? 'system'}
                  onValueChange={(v) => v && setTheme(v)}
                  variant="outline"
                  size="lg"
                  className="grid w-full grid-cols-3"
                >
                  <ToggleGroupItem value="light" aria-label="Light" className="py-3">
                    <Sun className="size-4" aria-hidden />
                    Light
                  </ToggleGroupItem>
                  <ToggleGroupItem value="dark" aria-label="Dark" className="py-3">
                    <Moon className="size-4" aria-hidden />
                    Dark
                  </ToggleGroupItem>
                  <ToggleGroupItem value="system" aria-label="System" className="py-3">
                    <Monitor className="size-4" aria-hidden />
                    System
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                Project
              </h3>
              <ul className="flex flex-col gap-1 text-sm">
                <li>
                  <Link
                    href="/paper/about"
                    className="block rounded-lg border border-border px-4 py-3 font-medium text-foreground hover:bg-muted"
                    onClick={() => setSettingsOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/paper/contact"
                    className="block rounded-lg border border-border px-4 py-3 font-medium text-foreground hover:bg-muted"
                    onClick={() => setSettingsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/paper/privacy"
                    className="block rounded-lg border border-border px-4 py-3 font-medium text-foreground hover:bg-muted"
                    onClick={() => setSettingsOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/paper/terms"
                    className="block rounded-lg border border-border px-4 py-3 font-medium text-foreground hover:bg-muted"
                    onClick={() => setSettingsOpen(false)}
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/paper/legal"
                    className="block rounded-lg border border-border px-4 py-3 font-medium text-foreground hover:bg-muted"
                    onClick={() => setSettingsOpen(false)}
                  >
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
