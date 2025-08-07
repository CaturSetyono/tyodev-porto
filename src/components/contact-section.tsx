import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-indigo-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30 mb-6">
            <span className="text-cyan-300 text-sm font-medium">Hubungi Saya</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-6">
            Mari Berdiskusi dan Berkolaborasi
          </h2>

          <p className="text-white/70 text-lg mb-10">
            Punya proyek menarik atau ingin bekerja sama? Saya selalu terbuka untuk diskusi
            dan kolaborasi pada proyek-proyek yang menantang.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <Button className="flex items-center gap-2" size="lg">
              <Mail className="w-5 h-5" />
              Email Saya
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-white/20 hover:bg-white/10" size="lg">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-white/20 hover:bg-white/10" size="lg">
              <Github className="w-5 h-5" />
              GitHub
            </Button>
          </div>

          <div className="text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} - Dibuat dengan ❤️ menggunakan Next.js dan TailwindCSS
          </div>
        </div>
      </div>
    </section>
  );
}
