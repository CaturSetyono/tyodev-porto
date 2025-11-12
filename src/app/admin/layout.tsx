import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Portfolio Management",
  description: "Admin dashboard untuk mengelola konten portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
