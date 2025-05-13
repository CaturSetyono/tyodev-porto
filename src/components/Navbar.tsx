'use client';

import Link from 'next/link';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <BootstrapNavbar 
      ref={navbarRef} 
      bg="light" 
      expand="lg" 
      sticky="top" 
      className="shadow-sm dark:bg-gray-800"
    >
      <Container>
        <Link href="/" passHref legacyBehavior>
          <BootstrapNavbar.Brand className="font-bold text-xl text-blue-600 dark:text-blue-400">
            Nama Anda
          </BootstrapNavbar.Brand>
        </Link>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref legacyBehavior><Nav.Link className="dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">Beranda</Nav.Link></Link>
            <Link href="/about" passHref legacyBehavior><Nav.Link className="dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">Tentang Saya</Nav.Link></Link>
            <Link href="/skills" passHref legacyBehavior><Nav.Link className="dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">Keahlian</Nav.Link></Link>
            <Link href="/portfolio" passHref legacyBehavior><Nav.Link className="dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">Portofolio</Nav.Link></Link>
            <Link href="/contact" passHref legacyBehavior><Nav.Link className="dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">Kontak</Nav.Link></Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;