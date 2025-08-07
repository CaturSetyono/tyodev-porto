import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portofolio Saya',
  description: 'Website portofolio pribadi dibuat dengan Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
      </body>
    </html>
  );
}