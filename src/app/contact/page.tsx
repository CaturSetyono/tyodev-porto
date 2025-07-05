"use client";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const inputStyle =
  "w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none";

const ContactPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (pageRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        infoRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1 }
      ).fromTo(
        formContainerRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1 },
        "-=0.7"
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));
      setSubmitMessage(
        "Pesan Anda telah berhasil terkirim! Saya akan segera menghubungi Anda."
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.";
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={pageRef}
      className="py-5 min-h-screen flex items-center dark:bg-gray-850"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-5 text-gray-800 dark:text-white">
          Hubungi Saya
        </h1>
        <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-300">
          Jangan ragu untuk menghubungi saya jika Anda memiliki pertanyaan,
          tawaran proyek, atau hanya ingin menyapa!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Info Kontak */}
          <div ref={infoRef} className="md:col-span-5">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
              Informasi Kontak
            </h3>
            <div className="flex items-center mb-3 text-gray-600 dark:text-gray-300">
              <FaMapMarkerAlt size={20} className="mr-3 text-blue-500" />
              <span>Kota Anda, Negara Anda</span>
            </div>
            <div className="flex items-center mb-3 text-gray-600 dark:text-gray-300">
              <FaPhone size={20} className="mr-3 text-blue-500" />
              <span>+62 123 4567 890</span>
            </div>
            <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
              <FaEnvelope size={20} className="mr-3 text-blue-500" />
              <span>emailanda@example.com</span>
            </div>
            <h3 className="text-2xl font-semibold mt-4 mb-3 text-gray-700 dark:text-gray-200">
              Temukan Saya di
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/usernameanda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://linkedin.com/in/usernameanda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <FaLinkedin size={28} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div ref={formContainerRef} className="md:col-span-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="formBasicName"
                  className="block dark:text-gray-200 mb-2"
                >
                  Nama Anda
                </label>
                <input
                  id="formBasicName"
                  type="text"
                  name="name"
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="formBasicEmail"
                  className="block dark:text-gray-200 mb-2"
                >
                  Alamat Email
                </label>
                <input
                  id="formBasicEmail"
                  type="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="formBasicMessage"
                  className="block dark:text-gray-200 mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="formBasicMessage"
                  name="message"
                  rows={5}
                  placeholder="Tulis pesan Anda di sini"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-blue-500"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
              {submitMessage && (
                <p
                  className={`mt-3 ${
                    submitMessage.includes("berhasil")
                      ? "text-green-600"
                      : "text-red-600"
                  } dark:text-green-400 dark:text-red-400`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
