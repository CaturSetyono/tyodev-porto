import Link from "next/link";
import Image from "next/image";
import { navLinks, socials } from "@/lib/config"; // <- Impor dari config

// Hapus definisi navLinks dan socials yang lama dari sini

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-black py-8 px-4 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold text-black dark:text-white tracking-tight mb-1">
            Tyodev
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Tyodev. All rights reserved.
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4">
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
                width={24}
                height={24}
                className="group-hover:invert dark:group-hover:invert-0 transition"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}