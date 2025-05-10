'use client'; // Diperlukan jika Anda menggunakan event handler atau hook React

import Link from 'next/link';
import Image from 'next/image';
// import { Button } from '@/components/ui/button'; // Hapus atau komentari baris ini
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
// Jika Anda menggunakan animasi seperti react-reveal atau framer-motion, Anda bisa mengimpornya di sini
// import { Fade } from 'react-reveal'; // Contoh

// Definisikan tipe props jika diperlukan, untuk saat ini kita buat sederhana
// interface HeroSectionProps {}

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white"
    >
      {/* Konten Utama Hero Section */}
      <div className="z-10 max-w-3xl">
        {/* <Fade bottom> // Contoh penggunaan animasi */}
        <div className="mb-8">
          <Image
            src="/images/profile-placeholder.jpg" // Ganti dengan path gambar profil Anda di folder /public
            alt="Foto Profil Nama Anda"
            width={150}
            height={150}
            className="rounded-full mx-auto border-4 border-blue-500 dark:border-blue-400 shadow-xl object-cover"
            priority // Penting untuk LCP (Largest Contentful Paint)
          />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Halo, saya <span className="text-blue-600 dark:text-blue-400">Nama Anda</span>!
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Seorang <span className="font-semibold">Full Stack Developer</span> yang bersemangat membangun aplikasi web modern dan intuitif.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <Link href="/portfolio" passHref>
            <button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 px-8 py-3 text-lg rounded-md font-semibold transition-colors duration-300"
            >
              Lihat Proyek Saya
            </button>
          </Link>
          <Link href="/contact" passHref>
            <button
              className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 px-8 py-3 text-lg rounded-md font-semibold transition-colors duration-300"
            >
              Hubungi Saya
            </button>
          </Link>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/usernameanda" // Ganti dengan URL GitHub Anda
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://linkedin.com/in/usernameanda" // Ganti dengan URL LinkedIn Anda
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="mailto:emailanda@example.com" // Ganti dengan alamat email Anda
            aria-label="Email"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <FaEnvelope size={28} />
          </a>
        </div>
        {/* </Fade> // Contoh penggunaan animasi */}
      </div>

      {/* Indikator Scroll ke Bawah (Opsional) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <Link href="#about" aria-label="Scroll ke bagian Tentang Saya">
          {/* Ganti #about dengan ID section berikutnya jika ada */}
          <FaArrowDown className="w-6 h-6 text-gray-500 dark:text-gray-400 animate-bounce" />
        </Link>
      </div>

      {/* Efek Latar Belakang (Opsional, contoh: partikel atau bentuk geometris) */}
      {/* <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5"> */}
      {/*   Contoh: bisa menggunakan SVG atau library partikel */}
      {/* </div> */}
    </section>
  );
};

export default HeroSection;