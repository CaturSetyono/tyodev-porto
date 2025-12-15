import React from "react";
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="#home"
              className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide"
            >
              tyodev<span className="text-cyan-600 dark:text-cyan-400">.</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm text-sm">
              Building digital experiences with modern technologies. Focused on
              creating responsive, accessible, and performant web applications
              that solve real-world problems.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors bg-white dark:bg-slate-900 p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                aria-label="Github"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors bg-white dark:bg-slate-900 p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors bg-white dark:bg-slate-900 p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors bg-white dark:bg-slate-900 p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {["Home", "About", "Skills", "Projects", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-400 transition-colors" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-lg">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                "Web Development",
                "Frontend Architecture",
                "UI/UX Implementation",
                "Performance Optimization",
              ].map((item) => (
                <li
                  key={item}
                  className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm flex items-center gap-1.5">
            © {currentYear} Catur Setyono. Made with{" "}
            <Heart
              size={14}
              className="text-red-500 fill-red-500 animate-pulse"
            />{" "}
            in Indonesia.
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
