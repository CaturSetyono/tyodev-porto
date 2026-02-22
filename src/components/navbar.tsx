"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Home, User, Cpu, Briefcase, Mail } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY;

      if (scrollPosition > lastScrollY && scrollPosition > 100) {
        // Hide navbar
        setVisible(false);
        setMenuOpen(false);
      } else if (scrollPosition < lastScrollY || scrollPosition <= 100) {
        // Show navbar
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

  const navItems = [
    { name: "Home", icon: <Home size={20} />, href: "#home" },
    { name: "About", icon: <User size={20} />, href: "#about" },
    { name: "Skills", icon: <Cpu size={20} />, href: "#skills" },
    { name: "Projects", icon: <Briefcase size={20} />, href: "#projects" },
  ];

  return (
    <>
      <header
        className={`fixed top-1/2 -translate-y-1/2 left-0 z-50 transition-all duration-300 transform ${visible ? "translate-x-0" : "-translate-x-full"
          } ${scrolled ? "pl-3" : "pl-5"} hidden md:block`}
      >
        <nav className="h-full flex flex-col justify-center">
          <div
            className={`flex flex-col items-center justify-center rounded-2xl px-3 py-6 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 min-h-[400px] gap-8 ${scrolled
                ? "bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg dark:shadow-none"
                : "bg-white/30 dark:bg-slate-800/50 backdrop-blur-md"
              }`}
          >
            {/* Desktop Menu */}
            <ul className="flex flex-col items-center gap-6 relative">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${activeSection === item.name.toLowerCase()
                        ? "bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-slate-900 dark:text-white border border-cyan-500/30"
                        : "text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                      }`}
                  >
                    {item.icon}
                  </Link>

                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-[60] shadow-xl">
                    {item.name}
                    {/* Arrow */}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45"></div>
                  </div>

                  {activeSection === item.name.toLowerCase() && (
                    <span className="absolute -left-3 top-1/4 h-1/2 w-[3px] bg-gradient-to-b from-cyan-400 to-indigo-400 rounded-full animate-[slideIn_0.3s_ease]"></span>
                  )}
                </li>
              ))}

              <li className="my-2 w-full h-[1px] bg-slate-200 dark:bg-slate-700/50"></li>

              <li className="relative group">
                <Button
                  asChild
                  variant="ghost"
                  className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center w-11 h-11 ${activeSection === "contact"
                      ? "bg-gradient-to-br from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                    }`}
                >
                  <Link href="#contact">
                    <Mail size={20} />
                  </Link>
                </Button>
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-[60] shadow-xl">
                  Contact
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45"></div>
                </div>
              </li>

              <li className="relative group">
                {mounted && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                    className="cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-white/80 dark:hover:text-white dark:hover:bg-slate-700/50 rounded-xl w-11 h-11"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                )}
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-[60] shadow-xl">
                  Theme
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45"></div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Top Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform md:hidden ${visible ? "translate-y-0" : "-translate-y-full"
          } ${scrolled ? "py-3" : "py-5"}`}
      >
        <nav className="mx-auto px-6">
          <div
            className={`flex items-center justify-between rounded-xl px-6 py-3 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 ${scrolled
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

            {/* Mobile Menu Button */}
            <button
              className="text-slate-900 dark:text-white p-2 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="mt-3 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-slate-200/30 dark:border-slate-600/30 p-4 shadow-lg dark:shadow-none animate-fadeIn">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 text-sm font-medium transition-all duration-300 ${activeSection === item.name.toLowerCase()
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
                        }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun size={20} className="text-slate-600 dark:text-white/70" />
                    <span className="text-sm font-medium text-slate-600 dark:text-white/70">
                      Theme
                    </span>
                  </div>
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
                    <Link href="#contact" className="flex items-center justify-center gap-2">
                      <Mail size={18} /> Contact
                    </Link>
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
