import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import ConditionalNavbar from "@/components/conditional-navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Catur Setyono - Web Developer",
  description: "Website portofolio pribadi dibuat oleh Catur Setyono",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <ConditionalNavbar />
        <main className="flex-grow">{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
