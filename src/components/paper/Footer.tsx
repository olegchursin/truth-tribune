'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from './Logo';
import { SECTIONS, SECTION_LABELS } from '@/lib/feed';

function currentYear() {
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-12 hidden sm:block">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/paper" className="flex items-center">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">
              Get News
            </h3>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>
                <Link href="/paper" className="hover:underline">
                  Home
                </Link>
              </li>
              {SECTIONS.map(slug => (
                <li key={slug}>
                  <Link href={`/paper/${slug}`} className="hover:underline">
                    {SECTION_LABELS[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">
              Project
            </h3>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>
                <Link href="/paper/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/paper/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/paper/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/paper/terms" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/paper/legal" className="hover:underline">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">
              Perspective
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Truth Tribune shows the same news through left and right slants.
              We make media framing obvious so you can see how headlines shape
              the story.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              <Link href="/" className="hover:underline">
                Change perspective
              </Link>
            </p>
          </div>
        </div>
        <div className="text-muted-foreground mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm">
          <span>© Common Sense Software {currentYear()}</span>
          <div className="flex flex-wrap items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
