'use client';

import type { Metadata } from 'next';
import { Inter as FontSans, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <SessionProvider>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <NextTopLoader
            color='#635BFF'
            crawlSpeed={300}
            showSpinner={false}
            shadow='none'
          />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
