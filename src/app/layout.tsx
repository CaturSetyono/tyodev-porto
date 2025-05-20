import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/Navbar';
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
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}> {/* Tambahkan warna latar default */}
       <Navbar /> 
        <main>{children}</main>
        {/* Anda bisa menambahkan Footer di sini jika ada */}
      </body>
    </html>
  );
}