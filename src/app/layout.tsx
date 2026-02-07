import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Lora } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const lora = Lora({
  variable: '--font-serif',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Truth Tribune',
  description: 'The truth, as you see it.',
  applicationName: 'Truth Tribune',
  icons: { icon: '/tt-logo-square-dark.svg' },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Truth Tribune'
  }
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
