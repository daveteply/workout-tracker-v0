import type { Metadata } from 'next';
import '../app/styles.css';

export const metadata: Metadata = {
  title: 'Database Seeder UI',
  description: 'Mock various forms of data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
