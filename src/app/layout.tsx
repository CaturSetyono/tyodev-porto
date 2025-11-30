import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
<<<<<<< HEAD
import './globals.css';
import Navbar from '@/components/navbar';
=======
>>>>>>> 1a626899b69d963c2c44e779e47e77084dc01a24
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Catur Setyono - Web Developer',
  description: 'Website portofolio pribadi dibuat oleh Catur Setyono',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
=======
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}> {/* Tambahkan warna latar default */}
        {children}
>>>>>>> 1a626899b69d963c2c44e779e47e77084dc01a24
      </body>
    </html>
  );
}