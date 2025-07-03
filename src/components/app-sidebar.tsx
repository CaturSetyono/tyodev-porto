'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: "/github.svg",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: "/linkedin.svg",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourusername",
    icon: "/twitter.svg",
  },
];

export default function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black border-r z-40 transition-transform ${open ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:static md:block`}>
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 py-6 border-b">
        <Image src="/window.svg" alt="Logo" width={32} height={32} />
        <span className="text-xl font-bold tracking-tight text-black dark:text-white">Tyodev</span>
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-8 px-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      {/* Socials */}
      <div className="flex gap-4 px-6 mt-12">
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
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-full shadow-lg"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle Sidebar"
      >
        {open ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>
    </aside>
  );
}
