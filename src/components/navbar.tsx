"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY;

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
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 bg-black/50" : "py-6"
      }`}
    >
      <nav
        className={`max-w-6xl mx-auto px-6 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="relative">
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-black/30 backdrop-blur-md border border-white/10"
                : "bg-white/5 backdrop-blur-sm"
            }`}
          ></div>
          <ul className="relative flex items-center justify-center gap-8">
            {["Home", "About", "Skills", "Projects"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-white scale-105"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/30 rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
            <li>
              <Button
                asChild
                variant="ghost"
                className={`relative overflow-hidden transition-all duration-300 ${
                  activeSection === "contact"
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Link href="#contact">
                  Contact
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] animate-shimmer"></span>
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
