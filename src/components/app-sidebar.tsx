'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation"; // 1. Impor usePathname
import { navLinks, socials } from "@/lib/config";
import { cn } from "@/lib/utils"; // 2. Impor cn

export default function AppSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // 3. Dapatkan path saat ini

  return (
    <>
      {/* Overlay untuk mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black border-r z-40 transition-transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        {/* Brand */}
        <div className="flex items-center gap-2 px-6 py-5 border-b">
          <Image src="/window.svg" alt="Logo" width={32} height={32} />
          <span className="text-xl font-bold tracking-tight text-black dark:text-white">Tyodev</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col gap-1 mt-6 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              // 4. Gunakan cn untuk menambahkan style aktif secara dinamis
              className={cn(
                "py-2.5 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium",
                pathname === link.href && "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
              )}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Socials di bagian bawah */}
        <div className="absolute bottom-6 left-0 w-full">
            <div className="flex gap-4 justify-center">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-black hover:scale-110 dark:hover:bg-white transition-all"
                aria-label={social.name}
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={20}
                  height={20}
                  className="group-hover:invert dark:group-hover:invert-0 transition"
                />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-white dark:bg-black text-black dark:text-white p-2 rounded-full shadow-lg"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle Sidebar"
      >
        {open ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>
    </>
  );
}