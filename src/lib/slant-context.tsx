'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  getStoredSlant,
  setSlantCookie,
  type Slant,
} from '@/lib/slant-client';

type SlantContextValue = {
  slant: Slant;
  setSlant: (slant: Slant) => void;
  mounted: boolean;
};

const SlantContext = createContext<SlantContextValue | null>(null);

export function SlantProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [slant, setSlantState] = useState<Slant>('left');

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const stored = getStoredSlant();
    if (stored) setSlantState(stored);
  }, [mounted]);

  const setSlant = useCallback(
    (newSlant: Slant) => {
      setSlantCookie(newSlant);
      setSlantState(newSlant);
      router.refresh();
    },
    [router]
  );

  return (
    <SlantContext.Provider value={{ slant, setSlant, mounted }}>
      {children}
    </SlantContext.Provider>
  );
}

export function useSlant(): SlantContextValue {
  const ctx = useContext(SlantContext);
  if (!ctx) {
    throw new Error('useSlant must be used within SlantProvider');
  }
  return ctx;
}
