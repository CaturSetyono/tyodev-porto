import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppSidebar from '@/components/app-sidebar';
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
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        {/* Sidebar akan diposisikan secara fixed oleh class di dalamnya */}
        <AppSidebar />
        
        {/* Konten utama dengan margin kiri untuk desktop */}
        <div className="flex flex-col flex-1 md:ml-64">
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}