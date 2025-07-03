'use client'; // WAJIB: Menandakan ini adalah Client Component agar bisa interaktif (menggunakan hooks).

// --- Bagian Impor ---
// Di sini kita mengimpor semua "bahan" yang dibutuhkan oleh komponen.
import Link from 'next/link'; // Komponen Next.js untuk navigasi antar halaman (lebih cepat dari tag <a> biasa).
import Image from 'next/image'; // Komponen Next.js untuk optimasi gambar otomatis.
import { useEffect, useRef } from 'react'; // Hooks dari React. `useEffect` untuk menjalankan kode setelah render, `useRef` untuk mengakses elemen DOM.
import { gsap } from 'gsap'; // Pustaka animasi GreenSock (GSAP) untuk membuat animasi.

// --- Definisi Komponen Utama ---
// Ini adalah "cetakan" untuk halaman utama kita.
export default function Home() {
  // --- Refs (Referensi ke Elemen DOM) ---
  // `useRef` membuat sebuah "wadah" yang bisa kita tempelkan ke elemen JSX.
  // Ini memungkinkan kita mengontrol elemen tersebut secara langsung, misalnya untuk dianimasikan dengan GSAP.
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // --- Efek Animasi (useEffect) ---
  // `useEffect` dengan array kosong `[]` di akhir akan menjalankan kode di dalamnya
  // HANYA SEKALI setelah komponen ini pertama kali ditampilkan di layar.
  useEffect(() => {
    // `gsap.timeline` membuat sebuah "urutan" animasi, jadi animasi berjalan satu per satu, bukan serentak.
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // `.fromTo(elemen, {keadaan_awal}, {keadaan_akhir}, {opsi})`
    // Ini menganimasikan elemen dari keadaan awal ke akhir.
    // Opsi "-=0.6" artinya animasi dimulai 0.6 detik sebelum animasi sebelumnya selesai (overlap).
    tl.fromTo(nameRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(descRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(buttonsRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(imageRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.8");
  }, []);

  // --- Struktur JSX (Tampilan Visual) ---
  // Ini adalah bagian yang mendefinisikan tampilan halaman menggunakan sintaks mirip HTML.
  // Kelas-kelas seperti `flex`, `items-center`, `p-4` adalah kelas dari Tailwind CSS.
  return (
    // `main` adalah tag utama untuk konten halaman.
    // `flex-grow`: memastikan main content mengisi ruang kosong vertikal.
    // `flex items-center justify-center`: membuat konten di dalamnya berada di tengah secara vertikal dan horizontal.
    <main ref={containerRef} className="flex-grow flex items-center justify-center p-4">
      <div className="container mx-auto">
        {/* `grid`: membuat layout berbasis kolom. `md:grid-cols-2` artinya di layar medium/desktop akan ada 2 kolom. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* === Kolom Teks (Kiri) === */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 ref={nameRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
              Halo, saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Tyodev</span>
            </h1>
            <h2 ref={titleRef} className="mt-2 text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              Full Stack Developer
            </h2>
            <p ref={descRef} className="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Saya menciptakan solusi digital yang fungsional dan indah. Bersemangat tentang kode yang bersih, desain yang intuitif, dan kopi yang enak.
            </p>

            {/* Tombol Call-to-Action (CTA) */}
            <div ref={buttonsRef} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio" passHref>
                <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Lihat Portofolio
                </button>
              </Link>
              <Link href="/contact" passHref>
                <button className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                  Hubungi Saya
                </button>
              </Link>
            </div>
          </div>
          
          {/* === Kolom Gambar (Kanan) === */}
          {/* Pastikan Anda memiliki gambar di public/images/hero-image.png atau ganti path-nya */}
          <div ref={imageRef} className="flex justify-center order-first md:order-last">
            <Image
              src="/window.svg" // Ganti dengan path gambar profil/ilustrasi Anda
              alt="Ilustrasi Hero"
              width={450}
              height={450}
              className="rounded-lg object-cover"
              priority // Memberi tahu Next.js untuk memuat gambar ini lebih dulu
            />
          </div>

        </div>
      </div>
    </main>
  );
}