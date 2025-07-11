"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-slate-900" />
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <div
          className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px)`,
            top: "10%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-2xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.2}px)`,
            top: "50%",
            right: "10%",
          }}
        />
        <div
          className="absolute w-48 h-48 bg-pink-500/15 rounded-full blur-lg transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.5}px)`,
            bottom: "20%",
            left: "30%",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
              <span className="text-white/80 text-sm">Available for work</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <div className="relative">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  <span className="block">Creative</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Developer
                  </span>
                </h1>
                {/* Decorative Line */}
                <div className="absolute -right-4 top-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full transform -translate-y-1/2 hidden lg:block" />
              </div>

              <p className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed">
                Saya menciptakan pengalaman digital yang memukau dengan menggabungkan{" "}
                <span className="text-purple-300 font-semibold">desain inovatif</span> dan{" "}
                <span className="text-pink-300 font-semibold">teknologi terdepan</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
                <div className="text-white/60 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">3+</div>
                <div className="text-white/60 text-sm">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
                <div className="text-white/60 text-sm">Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 group transition-all duration-300"
              >
                Lihat Portfolio
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent transition-all duration-300"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex justify-center">
            {/* Main Profile Card */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-sm w-full">
              {/* Profile Image */}
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl mb-6 relative overflow-hidden">
                <img
                  src="/placeholder.svg?height=192&width=192"
                  alt="Profile"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent" />
              </div>

              {/* Name and Title */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Your Name</h3>
                <p className="text-white/70">Full Stack Developer</p>
              </div>

              {/* Floating Tech Stack */}
              <div className="absolute -top-3 -left-3 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30 animate-bounce">
                <span className="text-white text-xs font-medium">React</span>
              </div>
              <div
                className="absolute -top-3 -right-3 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="text-white text-xs font-medium">Next.js</span>
              </div>
              <div
                className="absolute -bottom-3 -left-3 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30 animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <span className="text-white text-xs font-medium">TypeScript</span>
              </div>
              <div
                className="absolute -bottom-3 -right-3 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30 animate-bounce"
                style={{ animationDelay: "1.5s" }}
              >
                <span className="text-white text-xs font-medium">Tailwind</span>
              </div>
            </div>

            {/* Decorative Circles */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full -z-10 animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full -z-10 animate-spin"
              style={{ animationDuration: "30s", animationDirection: "reverse" }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll untuk melihat lebih</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
