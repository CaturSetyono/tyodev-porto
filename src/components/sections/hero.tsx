'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Container, Row, Col, Button as BootstrapButton } from 'react-bootstrap'; // Menggunakan alias untuk Button
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animasi untuk elemen-elemen konten
      tl.fromTo(imageRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(headingRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(paragraphRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(buttonsRef.current?.children, { opacity: 0, y: 20, stagger: 0.2 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5")
        .fromTo(socialLinksRef.current?.children, { opacity: 0, y: 20, stagger: 0.1 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      // Animasi background blob
      gsap.to(".blob1", {
        x: 60,
        y: 40,
        scale: 1.15,
        rotate: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
      gsap.to(".blob2", {
        x: -50,
        y: -30,
        scale: 1.1,
        rotate: -15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
      gsap.to(".blob3", {
        x: 30,
        y: -40,
        scale: 1.2,
        rotate: 10,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white overflow-hidden"
    >
      {/* Efek 3D Background dengan animasi */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="blob1 absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-3xl rounded-full transform-gpu rotate-12 scale-110 shadow-2xl" style={{ filter: 'blur(80px)' }} />
        <div className="blob2 absolute right-1/4 bottom-1/4 w-[300px] h-[300px] bg-gradient-to-br from-yellow-300 via-pink-300 to-blue-300 opacity-20 blur-2xl rounded-full transform-gpu -rotate-6 scale-125 shadow-xl" style={{ filter: 'blur(60px)' }} />
        <div className="blob3 absolute left-1/2 top-2/3 w-[200px] h-[200px] bg-gradient-to-tl from-blue-200 via-green-200 to-purple-200 opacity-25 blur-2xl rounded-full transform-gpu -translate-x-1/2 -rotate-12 scale-150 shadow-lg" style={{ filter: 'blur(40px)' }} />
      </div>
      <Container className="z-10 max-w-3xl">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <div ref={imageRef} className="mb-8">
              <Image
                src="/images/profile-placeholder.jpg"
                alt="Foto Profil Nama Anda"
                width={150}
                height={150}
                className="rounded-full mx-auto border-4 border-blue-500 dark:border-blue-400 shadow-xl object-cover"
                priority
              />
            </div>

            <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Halo, saya <span className="text-blue-600 dark:text-blue-400">Nama Anda</span>!
            </h1>

            <p ref={paragraphRef} className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Seorang <span className="font-semibold">Full Stack Developer</span> yang bersemangat membangun aplikasi web modern dan intuitif.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10"> {/* Mengurangi gap sedikit */}
              <Link href="/portfolio" passHref legacyBehavior>
                <BootstrapButton 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-blue-500"
                >
                  Lihat Proyek Saya
                </BootstrapButton>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <BootstrapButton 
                  variant="outline-primary" 
                  size="lg" 
                  className="w-full sm:w-auto dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Hubungi Saya
                </BootstrapButton>
              </Link>
            </div>

            <div ref={socialLinksRef} className="flex justify-center space-x-6">
              <a
                href="https://github.com/usernameanda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://linkedin.com/in/usernameanda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="mailto:emailanda@example.com"
                aria-label="Email"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <FaEnvelope size={28} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <Link href="/about" aria-label="Scroll ke bagian Tentang Saya">
          <FaArrowDown className="w-6 h-6 text-gray-500 dark:text-gray-400 animate-bounce" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;