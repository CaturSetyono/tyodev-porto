import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Impor file CSS global Anda
import Header from '@/components/sections/header'; // Impor komponen Header Anda

// Inisialisasi font Inter dari Google Fonts
const inter = Inter({ subsets: ['latin'] });

// Metadata untuk SEO dan informasi halaman
export const metadata: Metadata = {
  title: 'Portofolio Saya', // Ganti dengan judul portofolio Anda
  description: 'Website portofolio pribadi dibuat dengan Next.js', // Ganti dengan deskripsi singkat
};

// Komponen RootLayout utama
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id"> {/* Mengatur bahasa utama halaman ke Bahasa Indonesia */}
      <body className={inter.className}>
        {<Header />}
        {children} {/* 'children' akan merender konten halaman aktif */}
        {/* 
          Contoh:
          <Footer />
        */}
      </body>
    </html>
  );
}