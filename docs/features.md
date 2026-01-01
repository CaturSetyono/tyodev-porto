# Project Features & Documentation

## 🛠️ Technology Stack

This portfolio is built with the latest web technologies to ensure performance, scalability, and a modern user experience.

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Animations**:
    -   [Framer Motion](https://www.framer.com/motion/) for React component animations.
    -   [GSAP](https://gsap.com/) for complex high-performance animations.
    -   [Tw-animate-css](https://www.npmjs.com/package/tw-animate-css) for utility-based animations.
-   **3D Graphics**:
    -   [Three.js](https://threejs.org/)
    -   [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
    -   [React Three Drei](https://github.com/pmndrs/drei)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **AI Integration**:
    -   [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (Gemini)
    -   [OpenAI SDK](https://www.npmjs.com/package/openai)

---

## 🚀 Core Features

### 1. Interactive 3D Hero Section
The landing page features an immersive 3D experience significantly enhanced by accessibility and performance optimizations.
-   **Component**: `src/components/ThreeScene.tsx`, `src/components/hero-section.tsx`
-   **Tech**: React Three Fiber

### 2. AI-Powered Chatbot Assistant
A smart assistant that acts as a personal representative for Tyo Dev.
-   **Capabilities**:
    -   Answers questions about Tyo Dev's skills, experience, and portfolio.
    -   Context-aware responses based on a predefined portfolio persona.
    -   Supports dual providers: **Gemini** (Google) and **OpenAI**.
-   **Implementation**:
    -   Frontend: `src/components/chat/` (assumed based on structure) or integrated into sections.
    -   Backend: `src/app/api/chat/route.ts` handles the API requests.
    -   Logic: `src/lib/ai-services.ts` manages API clients and prompts.

### 3. Modern Responsive UI
-   **Responsive Navigation**: `src/components/navbar.tsx` adapts to mobile and desktop views.
-   **Sections**:
    -   **About**: `src/components/about-section.tsx`
    -   **Skills**: `src/components/skills-section.tsx`
    -   **Projects**: `src/components/projects-section.tsx` - Showcase of past work.
    -   **Contact**: `src/components/contact-section.tsx` - Includes form validation and submission.
    -   **Footer**: `src/components/footer-section.tsx`

### 4. Admin & Settings (In Development)
-   Placeholder structure for admin dashboard found in `src/app/api/admin`.
-   Planned features include dynamic content management (CV, Settings).

---

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/              # Backend endpoints (chat, admin)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── ui/               # Generic UI elements (likely Shadcn/Radix wrappers)
│   └── [sections].tsx    # Feature-specific sections (Hero, About, etc.)
├── lib/                  # Utilities and services
│   ├── ai-services.ts    # AI provider configuration and logic
│   └── utils.ts          # Helper functions (likely cn/clsx)
└── types/                # TypeScript type definitions
    └── chat.ts           # Types for chat interfaces
```

## 🔧 Environment Variables

To run the project locally, the following environment variables are required in `.env` or `.env.local`:

```env
# AI Providers (At least one is recommended)
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```
