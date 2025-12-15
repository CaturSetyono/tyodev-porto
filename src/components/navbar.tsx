"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY;

      // Handle navbar visibility based on scroll direction
      if (scrollPosition > lastScrollY && scrollPosition > 100) {
        // Scrolling down and past 100px - hide navbar
        setVisible(false);
        setMenuOpen(false); // Close mobile menu when hiding navbar
      } else if (scrollPosition < lastScrollY || scrollPosition <= 100) {
        // Scrolling up or at top - show navbar
        setVisible(true);
      }
      setLastScrollY(scrollPosition);

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(section);
          }
        }
      });

      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = ["Home", "About", "Skills", "Projects"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "py-3" : "py-5"}`}
    >
      <nav className="max-w-6xl mx-auto px-6 mt-2 md:mt-4">
        <div
          className={`flex items-center justify-between rounded-xl px-6 py-3 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 ${
            scrolled
              ? "bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none"
              : "bg-white/30 dark:bg-slate-800/50 backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <Link
            href="#home"
            className="text-xl font-bold text-slate-900 dark:text-white tracking-wide"
          >
            tyodev
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 relative">
            {navItems.map((item) => (
              <li key={item} className="relative">
                <Link
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
                  }`}
                >
                  {item}
                </Link>
                {activeSection === item.toLowerCase() && (
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full animate-[slideIn_0.3s_ease]"></span>
                )}
              </li>
            ))}
            <li>
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className="cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-white/80 dark:hover:text-white dark:hover:bg-slate-700/50 rounded-full w-9 h-9"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
            </li>
            <li>
              <Button
                asChild
                variant="ghost"
                className={`relative overflow-hidden transition-all duration-300 rounded-lg ${
                  activeSection === "contact"
                    ? "bg-gradient-to-r from-cyan-500/80 to-indigo-500/80 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-white/80 dark:hover:text-white dark:hover:bg-slate-700/50"
                }`}
              >
                <Link href="#contact">
                  Contact
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] animate-shimmer"></span>
                </Link>
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-900 dark:text-white p-2 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-slate-200/30 dark:border-slate-600/30 p-4 animate-fadeIn shadow-lg dark:shadow-none">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className={`block text-sm font-medium transition-all duration-300 ${
                      activeSection === item.toLowerCase()
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-white/70">
                  Theme
                </span>
                {mounted && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-white/80 dark:hover:text-white dark:hover:bg-slate-700/50 rounded-full w-9 h-9"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                )}
              </li>
              <li>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full bg-gradient-to-r from-cyan-500/80 to-indigo-500/80 text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link href="#contact">Contact</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
