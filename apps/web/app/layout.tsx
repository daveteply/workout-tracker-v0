import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@repo/ui/styles.css';
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className + ' h-full'}>
      <body className="h-full flex flex-col">
        <header>
          <nav className="navbar bg-base-100 capitalize drop-shadow-md bg-primary-content">
            <div className="font-bold text-sm sm:text-xl flex-1">
              Workout Tracker
            </div>
            <div className="flex-none">
              <Link
                className="btn btn-ghost text-xs sm:text-sm"
                href="/tracking"
              >
                start tracking
              </Link>
              <Link
                className="btn btn-ghost text-xs sm:text-sm"
                href="/activity/category"
              >
                activity categories
              </Link>
            </div>
          </nav>
        </header>
        <main className="grow m-5">{children}</main>
        <footer className="footer bg-neutral text-neutral-content p-5">
          Footer content
        </footer>
      </body>
    </html>
  );
}
