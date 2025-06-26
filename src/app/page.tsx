'use client';

import Link from 'next/link';
import { TextReveal } from "@/components/magicui/text-reveal";
import { Button } from "@/components/magicui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, ChevronDown, Star } from "lucide-react";

// Data untuk proyek unggulan
const featuredProjects = [
  {
    title: "Platform E-Commerce",
    description: "Platform e-commerce modern dengan fitur lengkap dan user experience yang optimal.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    rating: 3,
    link: "/portfolio/ecommerce-platform",
  },
  {
    title: "Aplikasi Manajemen Proyek",
    description: "Aplikasi untuk mengelola tugas dan proyek tim dengan antarmuka yang intuitif.",
    tags: ["React", "Node.js", "MongoDB"],
    rating: 4,
    link: "/portfolio/project-management-app",
  },
  {
    title: "Website Portofolio",
    description: "Situs web pribadi untuk menampilkan karya dan keahlian seorang desainer grafis.",
    tags: ["Next.js", "Framer Motion", "Vercel"],
    rating: 5,
    link: "/portfolio/designer-portfolio",
  },
];


export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-bounce"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <TextReveal>Selamat datang di Portofolio Saya</TextReveal>
          </div>

          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
            Saya adalah seorang <span className="font-semibold text-yellow-300">Full Stack Developer</span> yang
            passionate dalam menciptakan pengalaman digital yang luar biasa
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/portfolio" passHref>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Lihat Portofolio
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
            </Link>
            <Link href="/contact" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-full transition-all duration-300"
                >
                  Hubungi Saya
                  <Mail className="ml-2 w-4 h-4" />
                </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/usernameanda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/usernameanda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:emailanda@example.com"
              aria-label="Email"
              className="text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#skills" aria-label="Scroll to skills section">
            <ChevronDown className="w-6 h-6 text-white/60" />
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Keahlian Saya</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Teknologi dan tools yang saya kuasai</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Frontend Development</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Palette className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Backend Development</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <Smartphone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Mobile Development</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">React Native</Badge>
                  <Badge variant="secondary">Flutter</Badge>
                  <Badge variant="secondary">iOS</Badge>
                  <Badge variant="secondary">Android</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-850">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Proyek Unggulan</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Beberapa karya terbaik yang telah saya buat</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 dark:bg-gray-800"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < project.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={project.link} passHref>
                      <Button variant="ghost" className="w-full group-hover:bg-purple-50 dark:group-hover:bg-gray-700 transition-colors">
                        Lihat Detail
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Mari Berkolaborasi</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Punya proyek menarik? Atau ingin berdiskusi tentang teknologi? Saya selalu terbuka untuk peluang kolaborasi
            baru.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:emailanda@example.com">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  emailanda@example.com
                </Button>
            </a>
            <a href="/cv/nama-anda-cv.pdf" download>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-full transition-all duration-300"
                >
                  Download CV
                </Button>
            </a>
          </div>

          <div className="text-white/80 text-sm">
            <p>Dibuat dengan ❤️ menggunakan Next.js dan Tailwind CSS</p>
          </div>
        </div>
      </section>
    </main>
  )
}