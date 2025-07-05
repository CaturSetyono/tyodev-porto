'use client';

// --- Bagian Impor ---
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Komponen untuk efek noise
const NoiseBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-30 opacity-10">
    <div className="h-full w-full bg-[url('/noise.png')] opacity-20" />
  </div>
);

// --- Definisi Komponen Utama ---
export default function Home() {
  // --- Refs (Referensi ke Elemen DOM) ---
  // Refs untuk elemen utama yang akan dianimasikan
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  // Refs untuk bentuk-bentuk di latar belakang
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // --- Efek Animasi (useEffect) ---
  useEffect(() => {
    // --- Timeline Animasi Entri (Saat Halaman Dimuat) ---
    // Animasi ini berjalan sekali saat komponen pertama kali muncul.
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    // Menggunakan clip-path untuk efek "reveal from bottom" yang lebih modern.
    const animateFromClip = {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      opacity: 0,
      y: 70,
    };
    const animateToClip = {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      y: 0,
    };

    tl.fromTo(nameRef.current, animateFromClip, animateToClip)
      .fromTo(titleRef.current, animateFromClip, animateToClip, "-=1.0")
      .fromTo(descRef.current, animateFromClip, animateToClip, "-=1.0")
      .fromTo(buttonsRef.current, animateFromClip, animateToClip, "-=1.0")
      .fromTo(imageRef.current, 
        { opacity: 0, scale: 0.8, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.75)' }, 
        "-=1.0"
      );

    // --- Animasi Mengambang (Looping) ---
    // Animasi ini membuat gambar dan blob bergerak terus-menerus.
    gsap.to(imageRef.current, {
      y: '+=15',
      x: '+=5',
      rotation: 1,
      repeat: -1,
      yoyo: true,
      duration: 3.5,
      ease: 'sine.inOut'
    });

    gsap.to(blob1Ref.current, {
      y: '+=40',
      x: '-=25',
      rotation: 20,
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 8,
      ease: 'sine.inOut'
    });
    
    gsap.to(blob2Ref.current, {
      y: '-=30',
      x: '+=25',
      rotation: -20,
      scale: 0.9,
      repeat: -1,
      yoyo: true,
      duration: 9,
      ease: 'sine.inOut'
    });

    // --- Efek Parallax (Interaktif) ---
    // Fungsi ini akan dipanggil setiap kali mouse bergerak.
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Menghitung pergerakan mouse dari tengah layar (-0.5 sampai 0.5)
      const moveX = (clientX / innerWidth) - 0.5;
      const moveY = (clientY / innerHeight) - 0.5;

      // Menggerakkan elemen dengan GSAP berdasarkan posisi mouse
      // Tanda negatif (-) membuat elemen bergerak berlawanan arah dengan mouse
      gsap.to(imageRef.current, { x: -moveX * 50, y: -moveY * 30, duration: 1, ease: 'power2.out' });
      gsap.to(blob1Ref.current, { x: -moveX * 80, y: -moveY * 60, duration: 2, ease: 'power2.out' });
      gsap.to(blob2Ref.current, { x: moveX * 60, y: moveY * 40, duration: 2, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fungsi cleanup: Hapus event listener saat komponen dihancurkan untuk mencegah memory leak.
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, []); // Array dependensi kosong, efek hanya berjalan sekali.

  // --- Struktur JSX (Tampilan Visual) ---
  return (
    // `relative` dan `overflow-hidden` pada parent diperlukan untuk menahan elemen absolut.
    <main ref={containerRef} className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 dark:from-blue-500/10 dark:to-teal-500/10" />
        <div 
          ref={blob1Ref} 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-500/30 rounded-full filter blur-3xl"
        />
        <div 
          ref={blob2Ref} 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-teal-400/20 to-emerald-500/20 dark:from-teal-400/30 dark:to-emerald-500/30 rounded-full filter blur-3xl"
        />
      </div>

      {/* Noise Overlay */}
      <NoiseBackground />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative">
              <h1 ref={nameRef} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
                Halo, saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400">Tyodev</span>
              </h1>
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
            </div>
            
            <h2 ref={titleRef} className="mt-4 text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
              Full Stack Developer
            </h2>

            <p ref={descRef} className="mt-6 max-w-lg text-lg text-gray-600 dark:text-gray-400 leading-relaxed" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
              Saya menciptakan solusi digital yang fungsional dan indah. Bersemangat tentang kode yang bersih, desain yang intuitif, dan kopi yang enak.
            </p>

            {/* Tombol Call-to-Action (CTA) */}
            <div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row gap-4" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
              <Link href="/portfolio" className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <button className="relative px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
                  Lihat Portofolio
                </button>
              </Link>
              <Link href="/contact" className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500 dark:from-gray-400 dark:to-gray-600"></div>
                <button className="relative px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg backdrop-blur-sm hover:shadow-gray-500/30 transform hover:scale-105 transition-all duration-300">
                  Hubungi Saya
                </button>
              </Link>
            </div>

            {/* Social Proof atau Tech Stack bisa ditambahkan di sini */}
            <div className="mt-12 flex items-center gap-6 opacity-60">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium">TS</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium">React</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium">Next</span>
              </div>
            </div>
          </div>
          
          {/* Image Column */}
          <div ref={imageRef} className="flex justify-center order-first md:order-last">
            <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px]">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-300 rounded-full filter blur-2xl opacity-30 animate-pulse"></div>
              
              {/* Glass Card Effect */}
              <div className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl"></div>
              
              <Image
                src="/window.svg"
                alt="Ilustrasi Hero"
                width={450}
                height={450}
                className="relative rounded-lg object-cover transform hover:scale-105 transition-transform duration-500"
                priority
              />
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-teal-500/30 rounded-full blur-sm"></div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}