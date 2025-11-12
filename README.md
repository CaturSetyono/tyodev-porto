# 🚀 Portfolio Website with Admin Dashboard

Modern, secure, and performant portfolio website with powerful admin dashboard for content management. Built with Next.js, TypeScript, Tailwind CSS, and Supabase following industry best practices.

## ✨ Features

### 🎨 **Frontend Portfolio**

- **Hero Section** - Dynamic greeting dengan animasi GSAP yang smooth
- **About Section** - Professional bio dengan contact info terintegrasi
- **Skills Section** - Technical skills dengan level indicators dan kategorisasi
- **Projects Section** - Interactive project showcase dengan filtering
- **Contact Section** - Smart chatbot dengan AI integration (Gemini & OpenAI)
- **Responsive Design** - Mobile-first approach dengan PWA-ready
- **Modern Animations** - GSAP untuk performa terbaik
- **Dark Theme** - Consistent design system dengan accessible colors
- **SEO Optimized** - Meta tags dan structured data

### 🔐 **Admin Dashboard**

- **Authentication System** - Secure admin login dengan bcrypt hashing
- **Projects Management** - Full CRUD operations dengan image upload
- **Skills Management** - Technical skills editor dengan drag & drop
- **Content Management** - Hero & About sections dengan rich editor
- **Contact Messages** - View, manage, dan respond inquiries
- **Real-time Updates** - Instant content changes tanpa reload
- **Mobile Responsive** - Admin dashboard optimized untuk mobile
- **Security** - Rate limiting, CSRF protection, dan input validation

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 15.5.6** - React framework dengan App Router dan RSC
- **TypeScript 5** - Type-safe development dengan strict mode
- **Tailwind CSS v4** - Modern utility-first styling
- **GSAP** - Professional animations dengan performance optimization
- **Motion** - React animations untuk micro-interactions

### **Backend & Database**

- **Supabase** - Backend-as-a-Service dengan PostgreSQL
- **Row Level Security** - Advanced security dengan fine-grained permissions
- **Real-time** - WebSocket connections untuk live updates
- **Edge Functions** - Serverless functions dengan global distribution

### **Admin Dashboard & Security**

- **bcryptjs** - Industry-standard password hashing
- **Heroicons** - Beautiful, accessible icons
- **React Hook Form** - Performant form management
- **Zod** - Runtime schema validation
- **JWT** - Secure token-based authentication

### **AI & Integrations**

- **Google Gemini AI** - Advanced conversational AI
- **OpenAI API** - Alternative AI provider
- **Smart Chatbot** - Context-aware responses

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+
- Supabase account
- Git

### **1. Clone Repository**

```bash
git clone https://github.com/CaturSetyono/tyodev-porto.git
cd tyodev-porto
npm install
```

### **2. Environment Setup**

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAIL=admin@yourdomain.com
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

### **3. Database Setup**

**Step 1: Get Setup Instructions**

```bash
npm run admin:setup
```

**Step 2: Run SQL Schema**

1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to SQL Editor
3. Copy content from `database/schema.sql`
4. Execute the SQL script

**Step 3: Create Admin User**

```bash
npm run admin:create
```

### **4. Development**

```bash
# Start development server
npm run dev

# Open your browser
http://localhost:3000        # Portfolio website
http://localhost:3000/admin  # Admin dashboard
```

## 📁 Project Structure

```
tyodev-porto/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable components
│   │   ├── admin/         # Admin-specific components
│   │   ├── ui/           # UI components
│   │   └── [sections]    # Page sections
│   ├── lib/               # Utilities
│   │   ├── supabase.ts   # Database client
│   │   ├── admin-auth.ts # Auth utilities
│   │   └── utils.ts      # Helper functions
│   └── types/            # TypeScript types
├── database/
│   └── schema.sql        # Database schema
├── scripts/              # Setup scripts
├── public/              # Static assets
└── docs/               # Documentation
```

## 🔐 Admin Dashboard

### **Login Credentials**

```
URL: http://localhost:3000/admin
Email: [from .env.local]
Password: [from .env.local]
```

### **Available Features**

- **📊 Dashboard** - Overview & statistics
- **📁 Projects** - Manage portfolio projects
- **🛠️ Skills** - Technical skills management
- **👤 About** - Edit about information
- **📧 Messages** - Contact form submissions
- **⚙️ Settings** - Site configuration

### **Projects Management**

- Add/edit/delete projects
- Upload images & links
- Technology tags
- Featured project toggle
- Status management (active/draft/inactive)

## 🎯 Best Practices Implemented

### **Code Quality**

- ✅ TypeScript strict mode
- ✅ ESLint configuration
- ✅ Component composition
- ✅ Custom hooks
- ✅ Error boundaries

### **Performance**

- ✅ Code splitting
- ✅ Image optimization
- ✅ Bundle analysis
- ✅ Tree shaking
- ✅ Lazy loading

## 🔒 Security Features

### **Authentication & Authorization**

- **Secure Password Hashing** - bcrypt dengan salt rounds
- **JWT Token Management** - Secure session handling
- **Row Level Security (RLS)** - Database-level permissions
- **Input Validation** - Zod schema validation
- **CSRF Protection** - Built-in Next.js protection

### **Data Security**

- **Environment Variables** - Secure credential storage
- **API Rate Limiting** - Prevent abuse
- **SQL Injection Protection** - Parameterized queries
- **XSS Protection** - Input sanitization
- **Content Security Policy** - CSP headers

### **Infrastructure Security**

- **HTTPS Enforced** - Secure data transmission
- **Security Headers** - X-Frame-Options, X-Content-Type-Options
- **Database Encryption** - Supabase encryption at rest
- **Backup Strategy** - Automated database backups

## 🎯 Best Practices Implemented

### **Code Quality & Architecture**

- ✅ TypeScript strict mode dengan exactOptionalPropertyTypes
- ✅ ESLint + Prettier dengan custom rules
- ✅ Component composition pattern
- ✅ Custom hooks untuk reusable logic
- ✅ Error boundaries dan error handling
- ✅ Clean code principles (SOLID)
- ✅ Separation of concerns

### **Performance Optimization**

- ✅ Code splitting dengan dynamic imports
- ✅ Image optimization dengan Next.js Image
- ✅ Bundle analysis dan tree shaking
- ✅ Lazy loading untuk heavy components
- ✅ Memoization untuk expensive operations
- ✅ Optimized package imports
- ✅ Static generation untuk SEO

### **Security Implementation**

- ✅ Row Level Security (RLS) di Supabase
- ✅ Secure password hashing dengan bcrypt
- ✅ Input validation dengan Zod schemas
- ✅ CORS protection dan security headers
- ✅ Environment variable protection
- ✅ API authentication dan authorization

### **Accessibility & UX**

- ✅ WCAG 2.1 AA compliance
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Color contrast compliance

## 🚀 Deployment

### **Environment Variables**

Pastikan mengatur environment variables di platform deployment:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key

# Admin Credentials
ADMIN_EMAIL=your_admin_email
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password

# AI Services (Optional)
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### **Build & Deploy**

```bash
# Install dependencies
npm install

# Type checking
npm run type-check

# Linting
npm run lint

# Build production
npm run build

# Start production server
npm start
```

### **Recommended Platforms**

- **Vercel** - Optimal untuk Next.js
- **Netlify** - Alternative dengan great DX
- **Railway** - Full-stack deployment
- **DigitalOcean** - Custom server setup

## 📝 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build production bundle
npm run start          # Start production server

# Quality Assurance
npm run lint           # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run type-check    # TypeScript checking

# Admin Management
npm run admin:setup   # Setup instructions
npm run admin:create  # Create admin user
npm run admin:check   # Verify admin setup
```

- ✅ Environment variables

### **Database**

- ✅ Normalized schema
- ✅ Indexes for performance
- ✅ Triggers for timestamps
- ✅ Foreign key constraints
- ✅ Data validation

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Admin Setup
npm run admin:setup     # Get setup instructions
npm run admin:create    # Create admin user
npm run admin:check     # Verify admin configuration
```

## 🌐 Deployment

### **Vercel (Recommended)**

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# 3. Add environment variables
# 4. Deploy!
```

### **Environment Variables for Production**

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
ADMIN_EMAIL=admin@yourdomain.com
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_production_password
```

## 🔧 Customization

### **Content Updates**

1. Login to admin dashboard
2. Update projects, skills, about info
3. Changes reflect immediately on main site

### **Design Customization**

- Edit components in `src/components/`
- Modify styles in `src/app/globals.css`
- Update theme in `src/lib/theme.ts`

### **Adding New Features**

- Create new components in `src/components/`
- Add API routes in `src/app/api/`
- Update database schema in `database/schema.sql`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Catur Setyono (Tyo Dev)**

- Email: Catursetyono542@gmail.com
- GitHub: [@CaturSetyono](https://github.com/CaturSetyono)
- Portfolio: [Live Demo](https://your-domain.com)

## 🔧 Troubleshooting

### **Common Issues**

#### **Build Errors**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript
npm run type-check
```

#### **Database Connection Issues**

```bash
# Verify Supabase credentials
npm run admin:check

# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY
```

#### **Authentication Problems**

```bash
# Reset admin user
npm run admin:create

# Check password hashing
# Verify .env.local credentials
```

### **Development Tips**

- **Hot Reload** - Save files untuk auto-refresh
- **Error Overlay** - Next.js menampilkan errors di browser
- **Network Tab** - Check API calls di DevTools
- **Console Logs** - Monitor untuk runtime errors

## 🤝 Contributing

### **Getting Started**

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### **Code Standards**

- **TypeScript** - Strong typing untuk semua code
- **ESLint Rules** - Follow existing configuration
- **Component Patterns** - Functional components dengan hooks
- **File Naming** - kebab-case untuk files, PascalCase untuk components
- **Commit Messages** - Descriptive dan clear

### **Testing Guidelines**

- Unit tests untuk utilities dan hooks
- Integration tests untuk API routes
- E2E tests untuk critical user journeys
- Performance testing untuk heavy animations

## 📊 Performance Metrics

### **Lighthouse Scores (Target)**

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### **Web Vitals**

- **FCP (First Contentful Paint)**: < 1.8s
- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FID (First Input Delay)**: < 100ms

## 📚 Additional Resources

### **Documentation**

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://typescriptlang.org/docs)

### **Tutorials & Guides**

- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Supabase Auth Guide](https://supabase.io/docs/guides/auth)
- [GSAP Animation Tutorials](https://greensock.com/learning)

### **Tools & Extensions**

- **VS Code Extensions**:

  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Hero
  - Prettier - Code formatter
  - ESLint

- **Browser DevTools**:
  - React Developer Tools
  - Redux DevTools (if using)
  - Lighthouse

## 🔄 Version History

### **v1.0.0** (Current)

- ✅ Complete portfolio website
- ✅ Full admin dashboard
- ✅ AI chatbot integration
- ✅ Responsive design
- ✅ Security implementation
- ✅ Performance optimization

### **Planned Updates**

- 📅 Dark/Light mode toggle
- 📅 Blog section
- 📅 Advanced analytics
- 📅 Multi-language support
- 📅 PWA capabilities

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Catur Setyono (Tyo Dev)**

- Email: Catursetyono542@gmail.com
- GitHub: [@CaturSetyono](https://github.com/CaturSetyono)
- Portfolio: [Live Demo](https://your-domain.com)

## 🆘 Support

Jika mengalami masalah:

1. **Check Documentation** - Baca README dan docs/
2. **Run Diagnostics** - `npm run admin:check`
3. **Check Logs** - Terminal output untuk error details
4. **Search Issues** - Check existing GitHub issues
5. **Create New Issue** - [GitHub Issues](https://github.com/CaturSetyono/tyodev-porto/issues)

---

⭐ **Star this repo jika helpful!** ⭐

_Built with ❤️ by Catur Setyono_

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
