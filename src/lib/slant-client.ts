export const SLANT_COOKIE_NAME = 'truth-tribune-slant';
export const SLANT_LOCALSTORAGE_KEY = 'truth-tribune-preference';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export type Slant = 'left' | 'right';

export const SLANT_MOTTOS: Record<Slant, string> = {
  left: "Abolish billionaires. Anyway, here's the news.",
  right: "Facts don't care about feelings. Neither do we."
};

export function getStoredSlant(): Slant | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SLANT_COOKIE_NAME}=([^;]*)`)
  );
  const fromCookie = match?.[1];
  if (fromCookie === 'left' || fromCookie === 'right') return fromCookie;
  const fromStorage = localStorage.getItem(SLANT_LOCALSTORAGE_KEY);
  if (fromStorage === 'left' || fromStorage === 'right') return fromStorage;
  return null;
}

export function setSlantCookie(slant: Slant): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${SLANT_COOKIE_NAME}=${slant}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  localStorage.setItem(SLANT_LOCALSTORAGE_KEY, slant);
}
