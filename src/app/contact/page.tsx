'use client';

import { Container, Row, Col, Form, Button as BootstrapButton } from 'react-bootstrap';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ContactPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (pageRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' }});
      tl.fromTo(infoRef.current, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 })
        .fromTo(formRef.current, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1 }, "-=0.7");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulasi pengiriman form (ganti dengan logika backend Anda atau layanan seperti Formspree/Netlify Forms)
    try {
      // Contoh: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulasi delay
      setSubmitMessage('Pesan Anda telah berhasil terkirim! Saya akan segera menghubungi Anda.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div ref={pageRef} className="py-5 min-h-[calc(100vh-56px)] flex items-center dark:bg-gray-850">
      <Container>
        <h1 className="text-4xl font-bold text-center mb-5 text-gray-800 dark:text-white">Hubungi Saya</h1>
        <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-300">
          Jangan ragu untuk menghubungi saya jika Anda memiliki pertanyaan, tawaran proyek, atau hanya ingin menyapa!
        </p>
        <Row>
          <Col md={5} className="mb-4 md:mb-0">
            <div ref={infoRef}>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200">Informasi Kontak</h3>
              <div className="flex items-center mb-3 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt size={20} className="me-3 text-blue-500" />
                <span>Kota Anda, Negara Anda</span>
              </div>
              <div className="flex items-center mb-3 text-gray-600 dark:text-gray-300">
                <FaPhone size={20} className="me-3 text-blue-500" />
                <span>+62 123 4567 890</span>
              </div>
              <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
                <FaEnvelope size={20} className="me-3 text-blue-500" />
                <span>emailanda@example.com</span>
              </div>
              <h3 className="text-2xl font-semibold mt-4 mb-3 text-gray-700 dark:text-gray-200">Temukan Saya di</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/usernameanda" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <FaGithub size={28} />
                </a>
                <a href="https://linkedin.com/in/usernameanda" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <FaLinkedin size={28} />
                </a>
              </div>
            </div>
          </Col>
          <Col md={7}>
            <div ref={formRef}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className="dark:text-gray-200">Nama Anda</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Masukkan nama Anda" value={formData.name} onChange={handleChange} required className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="dark:text-gray-200">Alamat Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Masukkan email Anda" value={formData.email} onChange={handleChange} required className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicMessage">
                  <Form.Label className="dark:text-gray-200">Pesan</Form.Label>
                  <Form.Control as="textarea" name="message" rows={5} placeholder="Tulis pesan Anda di sini" value={formData.message} onChange={handleChange} required className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </Form.Group>

                <BootstrapButton variant="primary" type="submit" disabled={isSubmitting} className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-blue-500">
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </BootstrapButton>
                {submitMessage && <p className={`mt-3 ${submitMessage.includes('berhasil') ? 'text-success' : 'text-danger'} dark:text-green-400 dark:text-red-400`}>{submitMessage}</p>}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;