'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AboutPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' }});
      tl.fromTo(imageRef.current, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 })
        .fromTo(contentRef.current, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1 }, "-=0.7");
    }
  }, []);

  return (
    <div ref={pageRef} className="py-5 min-h-[calc(100vh-56px)] flex items-center dark:bg-gray-850"> {/* 56px adalah tinggi navbar default bootstrap */}
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={5} className="text-center mb-4 md:mb-0">
            <div ref={imageRef}>
              <Image
                src="/images/profile-about.jpg" // Ganti dengan gambar Anda
                alt="Tentang Nama Anda"
                width={350}
                height={350}
                className="rounded-lg shadow-lg mx-auto object-cover"
              />
            </div>
          </Col>
          <Col md={7}>
            <div ref={contentRef}>
              <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Tentang Saya</h1>
              <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
                Halo! Saya [Nama Anda], seorang Full Stack Developer dengan hasrat untuk menciptakan solusi digital yang inovatif dan efisien. 
                Saya memiliki pengalaman dalam mengembangkan aplikasi web dari awal hingga akhir, menggunakan teknologi modern.
              </p>
              <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
                Perjalanan saya di dunia pemrograman dimulai dari [ceritakan awal mula Anda]. Sejak saat itu, saya terus belajar dan beradaptasi dengan perkembangan teknologi, 
                selalu mencari tantangan baru untuk meningkatkan kemampuan saya.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Di luar coding, saya menikmati [hobi atau minat Anda]. Saya percaya bahwa keseimbangan antara pekerjaan dan kehidupan pribadi adalah kunci untuk kreativitas dan produktivitas.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;