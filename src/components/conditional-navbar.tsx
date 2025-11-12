"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Jangan tampilkan navbar di halaman admin
  if (pathname.startsWith("/admin")) {
    return null;
  }
  
  return <Navbar />;
}