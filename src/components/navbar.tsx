"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
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
          className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 border border-white/10 shadow-lg ${
            scrolled
              ? "bg-black/40 backdrop-blur-lg"
              : "bg-white/5 backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <Link
            href="#home"
            className="text-xl font-bold text-white tracking-wide"
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
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item}
                </Link>
                {activeSection === item.toLowerCase() && (
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-[slideIn_0.3s_ease]"></span>
                )}
              </li>
            ))}
            <li>
              <Button
                asChild
                variant="ghost"
                className={`relative overflow-hidden transition-all duration-300 rounded-full ${
                  activeSection === "contact"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
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
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-black/50 backdrop-blur-lg border border-white/10 shadow-lg p-4 animate-fadeIn">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className={`block text-sm font-medium transition-all duration-300 ${
                      activeSection === item.toLowerCase()
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
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
