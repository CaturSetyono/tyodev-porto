<<<<<<< HEAD
"use client";
=======
export default function Home() {
  return (
    <main className="flex bg-gray-50 dark:bg-gray-900 min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Selamat datang di Portofolio Saya
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Ini adalah halaman utama portofolio saya yang dibuat dengan Next.js.
      </p>
>>>>>>> 1a626899b69d963c2c44e779e47e77084dc01a24

import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import FooterSection from "@/components/footer-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
