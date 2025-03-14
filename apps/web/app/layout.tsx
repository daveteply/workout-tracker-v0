import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import './globals.css';
import { Inter } from 'next/font/google';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { Toaster } from 'react-hot-toast';

import { MemberSelector } from './components/members/members';
import { getMembers } from '../utils/data-fetch';
import { getCurrentMember, updateCurrentMember } from './components/members/member-actions';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Workout Tracker',
  description: 'Generated by create next app',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const members = await getMembers();
  const currentMember = await getCurrentMember();

  return (
    <html lang="en" className={inter.className + ' h-full'} data-theme="night">
      <body className="prose h-full text-md sm:text-lg md:text-xl flex flex-col max-w-none">
        <header className="sticky top-0 z-10">
          <nav className="navbar bg-base-100 shadow-sm">
            <div className="flex items-center flex-1 navbar-start">
              <Link className="btn btn-ghost text-xl no-underline" href="/">
                <Image
                  className="mx-2"
                  src={'/favicon/favicon-32x32.png'}
                  alt={'Workout Tracker Logo Icon'}
                  width={32}
                  height={32}
                />
                <span className="hidden sm:inline capitalize font-bold text-xl no-underline">
                  workout tracker
                </span>
              </Link>
            </div>
            <div className="flex-none">
              <MemberSelector
                members={members}
                currentMemberSlug={currentMember}
                updateMemberAction={updateCurrentMember}
              />
            </div>

            <div className="flex-none">
              <div data-testid="config-dropdown" className="dropdown dropdown-end">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <Bars3Icon className="size-5" />
                  </div>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 shadow capitalize">
                    <li>
                      <Link className="no-underline" href="/activity/category">
                        activity categories
                      </Link>
                    </li>
                    <li>
                      <Link className="no-underline" href="/activity/attributes">
                        activity attributes
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="container grow px-4 mx-auto sm:w-xl md:w-3xl lg:w-5xl">{children}</main>
        <footer className="footer bg-neutral text-neutral-content p-5 sticky bottom-0">
          Footer content
        </footer>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
