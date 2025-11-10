# Tyo Dev Portfolio

Portfolio website modern untuk Catur Setyono (Tyo Dev) - Full-Stack Developer dengan fokus pada teknologi web terkini.

## 🚀 Optimasi Terbaru (November 2025)

Website ini telah dioptimalkan untuk performa, konsistensi, dan kualitas kode:

### ✅ Perbaikan Bug

- ✓ Menambahkan decorativeRefs yang hilang di hero-section
- ✓ Memperbaiki TypeScript errors dan import issues

### ✅ Konsistensi Design

- ✓ Standardisasi padding dan spacing (`px-6`, `py-20`, `max-w-6xl`)
- ✓ Unifikasi skema warna dan gradient
- ✓ Konsisten container layout di semua section

### ✅ Optimasi Dependency

- ✓ Menghapus package tidak terpakai:
  - `@lottiefiles/dotlottie-react`
  - `tw-animate-css`
  - `react-icons`
  - `@radix-ui/react-icons`
  - `tailwind-variants`
- ✓ Update import `motion` dari package terbaru
- ✓ Clean import statements

### ✅ Optimasi Performa

- ✓ Lazy loading untuk gambar
- ✓ Blur placeholder untuk smooth loading
- ✓ Responsive image sizing
- ✓ Component memoization dengan React.memo
- ✓ Optimasi hook dependencies dengan useMemo

### ✅ Theme System

- ✓ Centralized theme configuration (`/src/lib/theme.ts`)
- ✓ Consistent color palette
- ✓ Reusable component styles

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.2
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.7
- **Animation:** GSAP 3.13.0, Motion 12.23.13
- **Icons:** Lucide React
- **AI Integration:** Google Gemini AI, OpenAI (optional)

## 🎨 Features

- **Responsive Design** - Mobile-first approach
- **Modern Animations** - GSAP dan Motion untuk animasi smooth
- **AI Chatbot** - Interactive portfolio assistant
- **Dark Theme** - Elegant dark color scheme
- **Performance Optimized** - Fast loading dan SEO friendly
- **Type Safe** - Full TypeScript implementation

## 📱 Sections

1. **Hero Section** - Landing dengan animasi interaktif
2. **About Section** - Profil dan statistik
3. **Skills Section** - Technology stack dengan progress bars
4. **Projects Section** - Portfolio showcase dengan filter
5. **Contact Section** - Form kontak dengan AI chatbot
6. **Footer** - Informasi copyright

## 🚀 Installation & Development

### Prerequisites

- Node.js 18+
- npm atau pnpm

### Quick Start

```bash
# Clone repository
git clone https://github.com/CaturSetyono/tyodev-porto.git
cd tyodev-porto

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables (Optional)

Create `.env.local` untuk AI features:

```env
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

## 📊 Performance Metrics

- **First Load JS:** ~192 kB
- **Build Time:** ~5 seconds
- **Lighthouse Score:** 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals:** Excellent

## 🔧 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/chat/       # API routes untuk AI
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── hero-section.tsx
│   ├── about-section.tsx
│   ├── skills-section.tsx
│   ├── projects-section.tsx
│   ├── contact-section.tsx
│   └── footer-section.tsx
├── lib/                # Utilities
│   ├── theme.ts        # Theme system
│   ├── ai-services.ts  # AI integration
│   ├── config.ts       # Configuration
│   └── utils.ts        # Helper functions
└── types/              # TypeScript types
    └── chat.ts
```

## 🎯 Optimization Goals Achieved

1. **Code Quality** - Clean, maintainable, type-safe code
2. **Performance** - Fast loading, optimized bundles
3. **Accessibility** - Semantic HTML, proper ARIA labels
4. **SEO** - Optimized meta tags, structured data
5. **User Experience** - Smooth animations, responsive design
6. **Maintainability** - Modular components, consistent styling

## 📞 Contact

- **Email:** [your-email@example.com]
- **LinkedIn:** [Your LinkedIn Profile]
- **GitHub:** [https://github.com/CaturSetyono]
- **Website:** [Your Portfolio URL]

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ by Catur Setyono | © 2025 All Rights Reserved**
