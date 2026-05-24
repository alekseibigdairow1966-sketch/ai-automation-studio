# AIAutomation Studio — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete frontend for AIAutomation Studio — project scaffold, layout, home page (10 sections), and all 5 public pages — using hardcoded data that mirrors the Supabase schema for a clean Phase 2 swap.

**Architecture:** Monolithic Next.js 15 App Router application. All pages are server components by default; interactive sections (header mobile menu, animations, form) are client components. Data comes from TypeScript files in `data/` that export typed arrays matching the database schema. Phase 2 will replace these imports with Supabase queries.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide React icons, react-markdown, Inter font

---

## File Map

```
ai-automation-studio/
├── app/
│   ├── layout.tsx              # Root layout: Inter font, metadata, Header + Footer
│   ├── page.tsx                # Home: composes all 10 section components
│   ├── globals.css             # Tailwind directives + custom utilities
│   ├── cases/
│   │   ├── page.tsx            # Cases listing with client-side filters
│   │   └── [slug]/page.tsx     # Single case with generateStaticParams
│   ├── services/page.tsx       # 7 service blocks
│   ├── blog/
│   │   ├── page.tsx            # Blog listing with category filter
│   │   └── [slug]/page.tsx     # Blog post with TOC + progress bar
│   └── contact/page.tsx        # Two-column lead capture (UI shell — no API yet)
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Sticky nav, desktop links, mobile toggle
│   │   ├── footer.tsx          # 3-column footer
│   │   └── mobile-nav.tsx      # Slide-out mobile menu (Framer Motion)
│   ├── sections/
│   │   ├── hero.tsx            # Gradient mesh bg, H1, stats, CTAs
│   │   ├── services-preview.tsx # 3x2 glass card grid
│   │   ├── cases-preview.tsx   # 3 featured case cards
│   │   ├── architecture-showcase.tsx # SVG automation flow diagram
│   │   ├── tech-stack.tsx      # Logo grid
│   │   ├── ai-systems-showcase.tsx   # Before/After comparison
│   │   ├── ai-consultant-section.tsx # Chat widget UI shell
│   │   ├── metrics-section.tsx # Impact numbers
│   │   ├── cta-section.tsx     # Full-width gradient CTA
│   │   └── contact-form.tsx    # Lead form (client-side validation only)
│   ├── motion-wrapper.tsx      # Reusable Framer Motion fade-in wrapper
│   └── ui/                     # shadcn/ui (auto-generated)
├── data/
│   ├── cases.ts                # 5 hardcoded demo cases
│   ├── blog-posts.ts           # 4 hardcoded blog posts
│   └── services.ts             # 7 services with features
├── lib/
│   └── utils.ts                # cn() helper from shadcn
├── types/
│   └── database.ts             # TypeScript interfaces matching Supabase schema
├── public/
│   └── (placeholder)
├── .env.local.example
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Task 1: Initialize Next.js project and install dependencies

**Files:**
- Create: `ai-automation-studio/` (via create-next-app)
- Modify: `package.json` (add deps)
- Create: `.env.local.example`

- [ ] **Step 1: Create Next.js app**

```bash
cd "C:\Users\user\Desktop\Цифровая витрина AIAutomation студии"
npx create-next-app@latest ai-automation-studio --typescript --tailwind --app --src-dir=false --import-alias="@/*" --eslint
```

Accept all defaults. This creates the project with Next.js 15, TypeScript, Tailwind CSS, App Router.

- [ ] **Step 2: Install additional dependencies**

```bash
cd ai-automation-studio
npm install framer-motion lucide-react react-markdown zod
npm install -D @types/node
```

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Zinc
- CSS variables: Yes

Then install needed components:

```bash
npx shadcn@latest add button input textarea badge
```

- [ ] **Step 4: Create `.env.local.example`**

```bash
# Supabase (Phase 2)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI (Phase 2)
OPENAI_API_KEY=

# n8n Webhook (Phase 2)
N8N_WEBHOOK_URL=

# Telegram (Phase 2)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Site
NEXT_PUBLIC_SITE_URL=https://aiautomation.studio
```

- [ ] **Step 5: Commit**

```bash
git init
git add -A
git commit -m "feat: initialize Next.js 15 project with Tailwind, shadcn/ui, Framer Motion"
```

---

## Task 2: Tailwind theme + global styles + types

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Create: `types/database.ts`

- [ ] **Step 1: Configure Tailwind with brand tokens**

Replace `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#18181B",
        "surface-elevated": "#27272A",
        accent: {
          DEFAULT: "#6366F1",
          end: "#8B5CF6",
        },
        "text-primary": "#FAFAFA",
        "text-secondary": "#A1A1AA",
        "text-muted": "#71717A",
        success: "#22C55E",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #6366F1, #8B5CF6)",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Set global styles in `app/globals.css`**

Replace the file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text-primary antialiased;
  }
}

@layer utilities {
  .accent-gradient {
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
  }
  .accent-gradient-text {
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .glass-panel {
    @apply bg-surface/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl;
  }
  .hover-glow {
    @apply transition-all duration-300;
  }
  .hover-glow:hover {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.3);
  }
}
```

- [ ] **Step 3: Create `types/database.ts`**

```ts
export interface CaseStudy {
  id: string
  title: string
  slug: string
  description: string
  industry: string
  problem: string
  inefficiencies: string
  solution: string
  architecture: {
    nodes: { id: string; label: string; icon: string; x: number; y: number }[]
    edges: { from: string; to: string; label?: string }[]
  } | null
  technologies: string[]
  screenshots: string[]
  results: { metric: string; before: string; after: string }[]
  published: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string | null
  category: string
  seo_title: string
  seo_description: string
  published_at: string | null
  created_at: string
}

export interface Lead {
  id: string
  name: string
  phone: string
  business: string | null
  message: string | null
  source: "contact_form" | "ai_widget" | "case_cta"
  status: "new" | "contacted" | "closed"
  created_at: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  useCases: string[]
}
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: brand color system, global styles, database types"
```

---

## Task 3: Reusable motion wrapper component

**Files:**
- Create: `components/motion-wrapper.tsx`

- [ ] **Step 1: Create `components/motion-wrapper.tsx`**

This wraps children with a fade-in-up animation triggered on scroll. Used across all homepage sections.

```tsx
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MotionWrapper({ children, className, delay = 0 }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: reusable Framer Motion wrapper components"
```

---

## Task 4: Header component

**Files:**
- Create: `components/layout/header.tsx`
- Create: `components/layout/mobile-nav.tsx`

- [ ] **Step 1: Create `components/layout/header.tsx`**

```tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/cases", label: "Кейсы" },
  { href: "/services", label: "Услуги" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакты" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/[0.06]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-white text-xs font-bold tracking-tight">
              AI
            </div>
            <span className="font-semibold text-text-primary text-sm hidden sm:block">
              AIAutomation Studio
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/contact">
              <Button size="sm" className="accent-gradient text-white text-xs font-medium hidden sm:flex hover:opacity-90 transition-opacity">
                Обсудить проект
              </Button>
            </Link>
            <button
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  )
}
```

- [ ] **Step 2: Create `components/layout/mobile-nav.tsx`**

```tsx
"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: { href: string; label: string }[]
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-0 right-0 z-40 md:hidden bg-surface border-b border-white/[0.06] shadow-xl"
        >
          <div className="px-4 py-6 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block py-2.5 text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link href="/contact" onClick={onClose}>
                <Button className="w-full accent-gradient text-white text-sm font-medium">
                  Обсудить проект
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: sticky header with desktop nav and mobile slide menu"
```

---

## Task 5: Footer component

**Files:**
- Create: `components/layout/footer.tsx`

- [ ] **Step 1: Create `components/layout/footer.tsx`**

```tsx
import Link from "next/link"

const SERVICE_LINKS = [
  { href: "/services", label: "AI Receptionist" },
  { href: "/services", label: "WhatsApp AI" },
  { href: "/services", label: "CRM Automation" },
  { href: "/services", label: "n8n Workflows" },
]

const COMPANY_LINKS = [
  { href: "/cases", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакты" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg accent-gradient flex items-center justify-center text-white text-[10px] font-bold">
              AI
            </div>
            <span className="font-semibold text-text-primary text-sm">AIAutomation Studio</span>
          </div>
          <p className="text-text-muted text-xs leading-relaxed max-w-xs">
            Строим AI-инфраструктуру для бизнеса. WhatsApp AI, CRM-автоматизация, AI-ресепшн, n8n workflows.
          </p>
        </div>

        <div>
          <p className="text-text-primary font-medium mb-4 text-xs uppercase tracking-wider">Услуги</p>
          <div className="space-y-2">
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-text-muted text-xs hover:text-text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-text-primary font-medium mb-4 text-xs uppercase tracking-wider">Компания</p>
          <div className="space-y-2">
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-text-muted text-xs hover:text-text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} AIAutomation Studio</span>
          <div className="flex gap-4">
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary transition-colors">Telegram</a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: footer with service links and social"
```

---

## Task 6: Root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "AIAutomation Studio — AI-инфраструктура для бизнеса",
    template: "%s | AIAutomation Studio",
  },
  description: "Строим AI-автоматизацию для сервисного бизнеса. WhatsApp AI, CRM-автоматизация, AI-ресепшн, n8n workflows. 30+ проектов, 50+ интеграций.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiautomation.studio"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <body className={inter.className}>
        <Header />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify layout renders**

```bash
npm run dev
```

Open `http://localhost:3000` in browser. Should see: dark background, sticky header with "AIAutomation Studio" logo and nav links, footer at bottom. The default Next.js page content will be in the middle (will be replaced in Task 9).

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: root layout with Inter font, header, footer, dark theme"
```

---

## Task 7: Hardcoded data files

**Files:**
- Create: `data/services.ts`
- Create: `data/cases.ts`
- Create: `data/blog-posts.ts`

- [ ] **Step 1: Create `data/services.ts`**

```ts
import type { ServiceItem } from "@/types/database"

export const services: ServiceItem[] = [
  {
    id: "1",
    title: "AI Receptionist",
    description: "Автоматический приём и интеллектуальная маршрутизация входящих обращений. AI-ресепшн отвечает на звонки, сообщения в мессенджерах и формы на сайте 24/7.",
    icon: "Headphones",
    features: [
      "Автоматическая классификация обращений",
      "Маршрутизация к нужному специалисту",
      "Сбор контактных данных и деталей запроса",
      "Интеграция с CRM и календарём",
    ],
    useCases: [
      "Стоматологические клиники",
      "Сервисные центры",
      "Юридические компании",
    ],
  },
  {
    id: "2",
    title: "WhatsApp AI Automation",
    description: "AI-бот для WhatsApp Business, который общается с клиентами, принимает заказы, отвечает на вопросы и передаёт сложные запросы оператору.",
    icon: "MessageCircle",
    features: [
      "Естественные диалоги на русском языке",
      "Приём заказов и бронирований",
      "Автоответы на частые вопросы",
      "Эскалация сложных запросов к человеку",
    ],
    useCases: [
      "Рестораны и доставка",
      "Интернет-магазины",
      "Салоны красоты",
    ],
  },
  {
    id: "3",
    title: "CRM Automation",
    description: "Автоматизация CRM-процессов через n8n: лиды создаются автоматически, статусы обновляются, уведомления отправляются без ручного вмешательства.",
    icon: "Database",
    features: [
      "Автоматическое создание лидов из всех каналов",
      "Обновление статусов и pipeline",
      "Автоуведомления команде",
      "Отчёты и аналитика",
    ],
    useCases: [
      "Отделы продаж",
      "Агентства недвижимости",
      "B2B-компании",
    ],
  },
  {
    id: "4",
    title: "AI Operators",
    description: "AI-операторы для обработки входящих заявок. Понимают контекст, задают уточняющие вопросы, заполняют CRM и передают квалифицированные лиды.",
    icon: "Bot",
    features: [
      "Квалификация лидов по заданным критериям",
      "Контекстные уточняющие вопросы",
      "Заполнение полей CRM автоматически",
      "Работа 24/7 без перерывов",
    ],
    useCases: [
      "Call-центры",
      "Страховые компании",
      "Медицинские центры",
    ],
  },
  {
    id: "5",
    title: "n8n Workflows",
    description: "Построение и настройка автоматизаций на платформе n8n: от простых уведомлений до сложных бизнес-процессов с десятками интеграций.",
    icon: "Workflow",
    features: [
      "Визуальное проектирование workflows",
      "500+ интеграций из коробки",
      "Кастомная логика через код",
      "Self-hosted для полного контроля",
    ],
    useCases: [
      "Автоматизация маркетинга",
      "Синхронизация данных между системами",
      "Автоматические отчёты",
    ],
  },
  {
    id: "6",
    title: "AI Support Systems",
    description: "AI-поддержка с базой знаний: бот изучает документацию, FAQ, историю тикетов и отвечает на вопросы клиентов точно и быстро.",
    icon: "LifeBuoy",
    features: [
      "RAG на базе документации компании",
      "Автоматическое решение типовых вопросов",
      "Эскалация сложных кейсов с контекстом",
      "Обучение на истории тикетов",
    ],
    useCases: [
      "SaaS-продукты",
      "IT-компании",
      "Образовательные платформы",
    ],
  },
  {
    id: "7",
    title: "AI Business Infrastructure",
    description: "Комплексная цифровая инфраструктура: от аудита текущих процессов до внедрения полного стека AI-автоматизации под ключ.",
    icon: "Building2",
    features: [
      "Аудит бизнес-процессов",
      "Проектирование архитектуры автоматизации",
      "Внедрение и интеграция",
      "Поддержка и масштабирование",
    ],
    useCases: [
      "Компании на этапе масштабирования",
      "Бизнес с высоким объёмом обращений",
      "Франчайзи и сети",
    ],
  },
]
```

- [ ] **Step 2: Create `data/cases.ts`**

```ts
import type { CaseStudy } from "@/types/database"

export const cases: CaseStudy[] = [
  {
    id: "1",
    title: "AI-ресепшн для стоматологической клиники",
    slug: "ai-reception-dental-clinic",
    description: "Автоматизация приёма обращений и записи пациентов через WhatsApp и AI-маршрутизацию.",
    industry: "Клиники",
    problem: "Клиника теряла 40% входящих звонков из-за загруженности администраторов. Запись велась вручную в Excel, часто возникали накладки по времени. Пациенты ждали ответа по 15-20 минут.",
    inefficiencies: "Ручная запись в Excel с ошибками и дублями. Один администратор на 3 канала связи. Нет автоответов в нерабочее время. Потеря 40% обращений — пациенты уходили к конкурентам.",
    solution: "Внедрили AI-ресепшн на базе WhatsApp Business API + OpenAI. Бот принимает обращения 24/7, определяет тип услуги, предлагает свободные слоты, записывает пациента и отправляет подтверждение. Сложные вопросы эскалируются администратору с полным контекстом.",
    architecture: {
      nodes: [
        { id: "user", label: "Пациент", icon: "User", x: 50, y: 150 },
        { id: "whatsapp", label: "WhatsApp", icon: "MessageCircle", x: 200, y: 150 },
        { id: "ai", label: "AI Router", icon: "Bot", x: 350, y: 150 },
        { id: "crm", label: "CRM", icon: "Database", x: 500, y: 80 },
        { id: "calendar", label: "Календарь", icon: "Calendar", x: 500, y: 220 },
        { id: "notify", label: "Уведомления", icon: "Bell", x: 650, y: 150 },
      ],
      edges: [
        { from: "user", to: "whatsapp" },
        { from: "whatsapp", to: "ai" },
        { from: "ai", to: "crm", label: "Данные пациента" },
        { from: "ai", to: "calendar", label: "Запись" },
        { from: "crm", to: "notify" },
        { from: "calendar", to: "notify" },
      ],
    },
    technologies: ["WhatsApp API", "OpenAI", "n8n", "CRM"],
    screenshots: [],
    results: [
      { metric: "Пропущенные обращения", before: "40%", after: "2%" },
      { metric: "Время ответа", before: "15 мин", after: "30 сек" },
      { metric: "Запись онлайн", before: "0%", after: "85%" },
      { metric: "Нагрузка на администратора", before: "100%", after: "30%" },
    ],
    published: true,
    created_at: "2025-11-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Автоматизация заказов ресторана через WhatsApp",
    slug: "restaurant-whatsapp-orders",
    description: "WhatsApp-бот для приёма заказов, интеграция с POS-системой и автоматические уведомления.",
    industry: "Рестораны",
    problem: "Ресторан принимал заказы по телефону и в WhatsApp вручную. Операторы путали позиции, теряли заказы в переписках, среднее время обработки — 8 минут на заказ.",
    inefficiencies: "Ручной ввод заказов в POS. Ошибки в 15% заказов. Нет подтверждения клиенту. Пиковые часы — очередь из необработанных сообщений.",
    solution: "Разработали WhatsApp-бота с интерактивным меню. Клиент выбирает блюда, бот формирует заказ, отправляет в POS-систему, присваивает номер и отправляет клиенту подтверждение с временем готовности.",
    architecture: {
      nodes: [
        { id: "client", label: "Клиент", icon: "User", x: 50, y: 150 },
        { id: "wa", label: "WhatsApp Bot", icon: "MessageCircle", x: 200, y: 150 },
        { id: "n8n", label: "n8n", icon: "Workflow", x: 350, y: 150 },
        { id: "pos", label: "POS", icon: "Monitor", x: 500, y: 80 },
        { id: "notify", label: "Уведомление", icon: "Bell", x: 500, y: 220 },
      ],
      edges: [
        { from: "client", to: "wa" },
        { from: "wa", to: "n8n", label: "Заказ" },
        { from: "n8n", to: "pos", label: "Создание заказа" },
        { from: "n8n", to: "notify", label: "Подтверждение" },
      ],
    },
    technologies: ["WhatsApp Business API", "n8n", "POS-интеграция"],
    screenshots: [],
    results: [
      { metric: "Время обработки заказа", before: "8 мин", after: "40 сек" },
      { metric: "Ошибки в заказах", before: "15%", after: "1%" },
      { metric: "Пропущенные заказы", before: "20/день", after: "0" },
      { metric: "Скорость обработки", before: "1x", after: "3x" },
    ],
    published: true,
    created_at: "2025-12-01T10:00:00Z",
  },
  {
    id: "3",
    title: "AI-оператор для интернет-магазина",
    slug: "ai-operator-ecommerce",
    description: "AI-оператор обрабатывает 80% обращений без участия человека: статусы заказов, наличие, возвраты.",
    industry: "E-commerce",
    problem: "Интернет-магазин получал 200+ обращений в день. 3 оператора не справлялись, среднее время ожидания — 25 минут. 60% вопросов — типовые (статус заказа, наличие товара).",
    inefficiencies: "3 оператора на типовые вопросы. Время ожидания 25 минут. Нет автоматической проверки статуса. Клиенты дублировали запросы в разные каналы.",
    solution: "Внедрили AI-оператора на базе GPT-4o-mini с доступом к каталогу товаров и системе заказов. Бот мгновенно отвечает на вопросы о статусе, наличии, условиях возврата. Сложные кейсы передаются оператору с полным контекстом.",
    architecture: {
      nodes: [
        { id: "customer", label: "Покупатель", icon: "User", x: 50, y: 150 },
        { id: "chat", label: "Чат на сайте", icon: "MessageSquare", x: 200, y: 150 },
        { id: "ai", label: "AI-оператор", icon: "Bot", x: 350, y: 150 },
        { id: "catalog", label: "Каталог", icon: "Package", x: 500, y: 80 },
        { id: "orders", label: "Заказы", icon: "ShoppingCart", x: 500, y: 220 },
      ],
      edges: [
        { from: "customer", to: "chat" },
        { from: "chat", to: "ai" },
        { from: "ai", to: "catalog", label: "Наличие" },
        { from: "ai", to: "orders", label: "Статус" },
      ],
    },
    technologies: ["OpenAI", "Каталог товаров", "CRM"],
    screenshots: [],
    results: [
      { metric: "Обращения без человека", before: "0%", after: "80%" },
      { metric: "Время ответа", before: "25 мин", after: "15 сек" },
      { metric: "Нагрузка на операторов", before: "3 человека", after: "1 человек" },
      { metric: "CSAT", before: "3.2/5", after: "4.7/5" },
    ],
    published: true,
    created_at: "2026-01-10T10:00:00Z",
  },
  {
    id: "4",
    title: "CRM-автоматизация для сервисного центра",
    slug: "crm-automation-service-center",
    description: "Автоматизация всей воронки заявок: от приёма до завершения ремонта с автоуведомлениями на каждом этапе.",
    industry: "Услуги",
    problem: "Сервисный центр вёл учёт заявок в таблице Google Sheets. Мастера забывали обновлять статусы, клиенты не получали уведомлений, 10% заявок терялись.",
    inefficiencies: "Google Sheets вместо CRM. Ручное обновление статусов. Нет автоуведомлений клиентам. Потеря 10% заявок. Директор тратил 2 часа в день на контроль.",
    solution: "Построили CRM на Supabase + n8n. Заявки поступают автоматически из WhatsApp, Telegram и сайта. Статусы обновляются мастерами в один клик. Клиент получает уведомления на каждом этапе. Директор видит dashboard в реальном времени.",
    architecture: {
      nodes: [
        { id: "channels", label: "Каналы", icon: "Inbox", x: 50, y: 150 },
        { id: "n8n", label: "n8n Router", icon: "Workflow", x: 200, y: 150 },
        { id: "supabase", label: "Supabase CRM", icon: "Database", x: 350, y: 150 },
        { id: "telegram", label: "Telegram", icon: "Send", x: 500, y: 80 },
        { id: "whatsapp", label: "WhatsApp", icon: "MessageCircle", x: 500, y: 220 },
      ],
      edges: [
        { from: "channels", to: "n8n" },
        { from: "n8n", to: "supabase", label: "Создание заявки" },
        { from: "supabase", to: "telegram", label: "Уведомление мастеру" },
        { from: "supabase", to: "whatsapp", label: "Статус клиенту" },
      ],
    },
    technologies: ["n8n", "Supabase", "Telegram", "WhatsApp"],
    screenshots: [],
    results: [
      { metric: "Потерянные заявки", before: "10%", after: "0%" },
      { metric: "Время директора на контроль", before: "2 часа/день", after: "15 мин/день" },
      { metric: "Уведомления клиентам", before: "Вручную", after: "Автоматически" },
      { metric: "Прозрачность процессов", before: "Нет", after: "Real-time dashboard" },
    ],
    published: true,
    created_at: "2026-02-20T10:00:00Z",
  },
  {
    id: "5",
    title: "AI-поддержка для SaaS-продукта",
    slug: "ai-support-saas",
    description: "AI-бот на базе RAG решает 70% тикетов поддержки, обучаясь на документации и истории обращений.",
    industry: "SaaS",
    problem: "SaaS-платформа получала 150 тикетов поддержки в день. 70% — повторяющиеся вопросы по настройке и использованию. Команда поддержки из 4 человек не успевала, SLA нарушался в 30% случаев.",
    inefficiencies: "4 агента на повторяющиеся вопросы. SLA нарушается в 30% случаев. Нет единой базы знаний. Новые агенты обучаются 2 месяца.",
    solution: "Внедрили AI-поддержку с RAG-архитектурой. Бот индексирует документацию, FAQ, историю тикетов. При обращении ищет релевантные ответы, формирует персонализированный ответ. Нерешённые кейсы эскалируются с полным контекстом и предложенным решением.",
    architecture: {
      nodes: [
        { id: "user", label: "Пользователь", icon: "User", x: 50, y: 150 },
        { id: "widget", label: "Support Widget", icon: "MessageSquare", x: 200, y: 150 },
        { id: "ai", label: "AI + RAG", icon: "Bot", x: 350, y: 150 },
        { id: "kb", label: "База знаний", icon: "BookOpen", x: 500, y: 80 },
        { id: "tickets", label: "Тикет-система", icon: "Ticket", x: 500, y: 220 },
      ],
      edges: [
        { from: "user", to: "widget" },
        { from: "widget", to: "ai" },
        { from: "ai", to: "kb", label: "Поиск ответа" },
        { from: "ai", to: "tickets", label: "Эскалация" },
      ],
    },
    technologies: ["OpenAI", "RAG", "База знаний", "Тикет-система"],
    screenshots: [],
    results: [
      { metric: "Тикеты решены AI", before: "0%", after: "70%" },
      { metric: "Среднее время ответа", before: "4 часа", after: "2 мин" },
      { metric: "Нарушения SLA", before: "30%", after: "3%" },
      { metric: "Команда поддержки", before: "4 агента", after: "2 агента" },
    ],
    published: true,
    created_at: "2026-03-15T10:00:00Z",
  },
]
```

- [ ] **Step 3: Create `data/blog-posts.ts`**

```ts
import type { BlogPost } from "@/types/database"

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Как WhatsApp AI автоматизирует 80% обращений клиентов",
    slug: "whatsapp-ai-automation-80-percent",
    content: `## Почему WhatsApp — главный канал для бизнеса

WhatsApp — самый популярный мессенджер в СНГ с 73 млн пользователей. Клиенты предпочитают писать, а не звонить. Но ручная обработка сообщений не масштабируется.

## Проблема: ручная обработка не масштабируется

Типичный сервисный бизнес получает 50-200 сообщений в день. Большинство из них — повторяющиеся вопросы: цены, график работы, статус заказа, наличие. Оператор тратит по 3-5 минут на каждое обращение.

## Решение: AI-бот на WhatsApp Business API

AI-бот подключается к WhatsApp Business API и обрабатывает входящие сообщения автоматически:

- **Распознаёт намерение** — понимает, что хочет клиент
- **Отвечает на типовые вопросы** — цены, график, наличие
- **Принимает заказы** — через интерактивное меню
- **Записывает на приём** — проверяет свободные слоты
- **Эскалирует сложные запросы** — передаёт оператору с контекстом

## Результаты наших клиентов

В среднем AI-бот закрывает 80% обращений без участия человека. Время ответа сокращается с 15 минут до 30 секунд. Операторы фокусируются на сложных кейсах.

## Как это работает технически

Стек: WhatsApp Business API + n8n (оркестрация) + OpenAI (генерация ответов) + CRM (хранение данных). Вся система разворачивается за 2-3 недели.`,
    excerpt: "WhatsApp — главный канал связи с клиентами. Но ручная обработка не масштабируется. Рассказываем, как AI-бот закрывает 80% обращений автоматически.",
    cover_image: null,
    category: "WhatsApp AI",
    seo_title: "WhatsApp AI: как автоматизировать 80% обращений клиентов",
    seo_description: "Узнайте, как AI-бот на WhatsApp Business API автоматизирует обработку клиентских обращений и сокращает время ответа до 30 секунд.",
    published_at: "2026-01-15T10:00:00Z",
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "n8n vs Zapier: почему мы выбрали n8n для бизнес-автоматизации",
    slug: "n8n-vs-zapier-business-automation",
    content: `## Задача: выбрать платформу автоматизации

При построении AI-инфраструктуры для клиентов нам нужна платформа оркестрации — инструмент, который связывает все системы между собой. Два главных кандидата: n8n и Zapier.

## Zapier: плюсы и минусы

Zapier — лидер рынка no-code автоматизации. 6000+ интеграций, простой интерфейс.

Но для серьёзных проектов есть проблемы: pricing модель на количество задач (дорого при масштабировании), нет self-hosted варианта, ограничения на сложную логику, нет доступа к коду.

## n8n: почему мы выбрали его

n8n — open-source платформа автоматизации с визуальным редактором:

- **Self-hosted** — полный контроль над данными
- **Нет лимитов на количество задач** — фиксированная стоимость
- **Кастомный код** — можно писать JavaScript/Python прямо в workflow
- **500+ интеграций** — все основные сервисы
- **AI-nodes** — встроенная поддержка OpenAI, Anthropic и других

## Когда Zapier лучше

Zapier лучше подходит для простых автоматизаций без кастомной логики, когда нужна интеграция с редким сервисом, и когда нет технической команды.

## Наш вердикт

Для AI-автоматизации бизнес-процессов n8n побеждает: self-hosted, нет лимитов, кастомный код, AI-nodes. Для простых связок — Zapier остаётся хорошим выбором.`,
    excerpt: "Сравниваем n8n и Zapier для бизнес-автоматизации. Почему мы выбрали n8n для построения AI-инфраструктуры и когда Zapier всё ещё лучше.",
    cover_image: null,
    category: "n8n",
    seo_title: "n8n vs Zapier: сравнение платформ автоматизации для бизнеса",
    seo_description: "Детальное сравнение n8n и Zapier для бизнес-автоматизации. Self-hosted, AI-nodes, кастомный код — почему n8n лучше для серьёзных проектов.",
    published_at: "2026-02-10T10:00:00Z",
    created_at: "2026-02-10T10:00:00Z",
  },
  {
    id: "3",
    title: "AI-ресепшн: как заменить call-центр искусственным интеллектом",
    slug: "ai-reception-replace-call-center",
    content: `## Что такое AI-ресепшн

AI-ресепшн — это система автоматического приёма и обработки входящих обращений. Она работает 24/7, не болеет, не уходит в отпуск и обрабатывает неограниченное количество обращений одновременно.

## Как работает AI-ресепшн

Система принимает обращения из всех каналов: WhatsApp, Telegram, телефон, форма на сайте. AI анализирует запрос, определяет его тип и выполняет нужное действие: записывает на приём, отвечает на вопрос, передаёт специалисту.

## Для кого подходит

AI-ресепшн особенно эффективен для бизнесов с высоким потоком обращений: медицинские клиники, сервисные центры, салоны красоты, юридические компании.

## Реальный кейс: стоматологическая клиника

Клиника теряла 40% звонков. После внедрения AI-ресепшн: 95% обращений обрабатываются автоматически, время ответа — 30 секунд, запись онлайн — 85%.

## Стоимость внедрения

Внедрение AI-ресепшн стоит значительно меньше, чем содержание дополнительного сотрудника. Окупаемость — 1-2 месяца.`,
    excerpt: "AI-ресепшн принимает обращения 24/7, записывает клиентов и маршрутизирует запросы. Рассказываем, как заменить call-центр искусственным интеллектом.",
    cover_image: null,
    category: "AI Automation",
    seo_title: "AI-ресепшн: замена call-центра искусственным интеллектом",
    seo_description: "Как AI-ресепшн автоматизирует приём обращений 24/7. Реальный кейс стоматологической клиники: 95% обращений без участия человека.",
    published_at: "2026-03-05T10:00:00Z",
    created_at: "2026-03-05T10:00:00Z",
  },
  {
    id: "4",
    title: "5 процессов, которые каждый бизнес должен автоматизировать в 2025",
    slug: "5-processes-to-automate-2025",
    content: `## 1. Приём и обработка входящих обращений

Каждое пропущенное обращение — потерянный клиент. AI-ресепшн обрабатывает 100% обращений из всех каналов автоматически.

## 2. Квалификация лидов

Не все обращения одинаково ценны. AI-оператор квалифицирует лиды по заданным критериям: бюджет, срочность, тип запроса. Горячие лиды получает менеджер мгновенно.

## 3. Уведомления и статусы

Клиенты хотят знать статус своего заказа/заявки в реальном времени. Автоматические уведомления через WhatsApp и Telegram экономят время команды и повышают лояльность.

## 4. Отчётность и аналитика

Ручные отчёты — трата 5-10 часов в неделю. Автоматическая аналитика через n8n собирает данные из всех систем и формирует dashboard в реальном времени.

## 5. Поддержка клиентов

70% вопросов поддержки — повторяющиеся. AI-бот с базой знаний решает их мгновенно. Операторы фокусируются на сложных кейсах.

## С чего начать

Начните с одного процесса. Измерьте результат. Масштабируйте. Мы помогаем на каждом этапе — от аудита до внедрения.`,
    excerpt: "5 бизнес-процессов, которые можно и нужно автоматизировать с помощью AI: от приёма обращений до аналитики. Пошаговый подход к автоматизации.",
    cover_image: null,
    category: "Business Systems",
    seo_title: "5 процессов для AI-автоматизации в 2025 году",
    seo_description: "Какие бизнес-процессы автоматизировать в первую очередь: приём обращений, квалификация лидов, уведомления, отчёты, поддержка.",
    published_at: "2026-04-01T10:00:00Z",
    created_at: "2026-04-01T10:00:00Z",
  },
]
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: hardcoded seed data for services, cases, blog posts"
```

---

## Task 8: Hero section

**Files:**
- Create: `components/sections/hero.tsx`

- [ ] **Step 1: Create `components/sections/hero.tsx`**

```tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "50+", label: "интеграций" },
  { value: "30+", label: "проектов" },
  { value: "99.9%", label: "uptime" },
]

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-end/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-accent font-medium">AI Automation Platform</span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
            AI Automation Infrastructure{" "}
            <span className="accent-gradient-text">for Service Businesses</span>
          </h1>

          {/* Subtitle */}
          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            WhatsApp AI, CRM-автоматизация, AI-ресепшн, n8n workflows —{" "}
            строим цифровую инфраструктуру для бизнеса
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/cases">
              <Button size="lg" className="accent-gradient text-white font-medium px-8 hover:opacity-90 transition-opacity">
                Смотреть кейсы
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/10 text-text-primary hover:bg-white/5 px-8">
                Связаться
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center gap-12 sm:gap-20"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold accent-gradient-text">{stat.value}</p>
              <p className="text-text-muted text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: hero section with gradient mesh, animated stats, CTAs"
```

---

## Task 9: Services preview + Cases preview sections

**Files:**
- Create: `components/sections/services-preview.tsx`
- Create: `components/sections/cases-preview.tsx`

- [ ] **Step 1: Create `components/sections/services-preview.tsx`**

```tsx
"use client"

import Link from "next/link"
import { ArrowUpRight, Headphones, MessageCircle, Database, Bot, Workflow, LifeBuoy } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const ICON_MAP: Record<string, React.ElementType> = {
  Headphones, MessageCircle, Database, Bot, Workflow, LifeBuoy,
}

const previewServices = [
  { icon: "Headphones", title: "AI Receptionist", desc: "Автоматический приём обращений 24/7" },
  { icon: "MessageCircle", title: "WhatsApp AI", desc: "AI-бот для WhatsApp Business" },
  { icon: "Database", title: "CRM Automation", desc: "Автоматизация CRM через n8n" },
  { icon: "Bot", title: "AI Operators", desc: "AI-обработка заявок и лидов" },
  { icon: "Workflow", title: "n8n Workflows", desc: "Построение автоматизаций" },
  { icon: "LifeBuoy", title: "AI Support", desc: "AI-поддержка с базой знаний" },
]

export function ServicesPreview() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Услуги</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Что мы автоматизируем
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewServices.map((svc) => {
            const Icon = ICON_MAP[svc.icon]
            return (
              <StaggerItem key={svc.title}>
                <Link href="/services" className="group block glass-panel hover-glow p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center">
                      <Icon size={18} className="text-white" />
                    </div>
                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1.5">{svc.title}</h3>
                  <p className="text-text-muted text-sm">{svc.desc}</p>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/sections/cases-preview.tsx`**

```tsx
"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cases } from "@/data/cases"
import { StaggerContainer, StaggerItem, MotionWrapper } from "@/components/motion-wrapper"

export function CasesPreview() {
  const featured = cases.filter((c) => c.published).slice(0, 3)

  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="flex items-end justify-between mb-16">
          <div>
            <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Кейсы</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Реализованные проекты
            </h2>
          </div>
          <Link href="/cases" className="hidden sm:flex items-center gap-1.5 text-accent text-sm font-medium hover:underline">
            Все кейсы <ArrowRight size={14} />
          </Link>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((cs) => (
            <StaggerItem key={cs.id}>
              <Link href={`/cases/${cs.slug}`} className="group block glass-panel hover-glow overflow-hidden h-full">
                <div className="h-40 bg-gradient-to-br from-accent/10 to-accent-end/10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl accent-gradient/20 border border-accent/20 flex items-center justify-center">
                    <span className="text-accent text-2xl font-bold">{cs.title[0]}</span>
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-3 text-xs bg-accent/10 text-accent border-0">
                    {cs.industry}
                  </Badge>
                  <h3 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-text-muted text-sm line-clamp-2 mb-4">{cs.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="sm:hidden mt-8 text-center">
          <Link href="/cases" className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1.5">
            Все кейсы <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: services preview grid and featured cases cards"
```

---

## Task 10: Architecture showcase + Tech stack + AI systems sections

**Files:**
- Create: `components/sections/architecture-showcase.tsx`
- Create: `components/sections/tech-stack.tsx`
- Create: `components/sections/ai-systems-showcase.tsx`

- [ ] **Step 1: Create `components/sections/architecture-showcase.tsx`**

```tsx
"use client"

import { MotionWrapper } from "@/components/motion-wrapper"
import { motion } from "framer-motion"

const nodes = [
  { id: "user", label: "Клиент", x: 5, y: 45, icon: "👤" },
  { id: "whatsapp", label: "WhatsApp", x: 22, y: 45, icon: "💬" },
  { id: "ai", label: "AI Router", x: 42, y: 45, icon: "🤖" },
  { id: "crm", label: "CRM", x: 65, y: 20, icon: "📊" },
  { id: "n8n", label: "n8n", x: 65, y: 45, icon: "⚡" },
  { id: "notify", label: "Уведомления", x: 65, y: 70, icon: "🔔" },
  { id: "dashboard", label: "Dashboard", x: 85, y: 45, icon: "📈" },
]

const edges = [
  { from: "user", to: "whatsapp" },
  { from: "whatsapp", to: "ai" },
  { from: "ai", to: "crm" },
  { from: "ai", to: "n8n" },
  { from: "ai", to: "notify" },
  { from: "crm", to: "dashboard" },
  { from: "n8n", to: "dashboard" },
]

export function ArchitectureShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Архитектура</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Как выглядит типичная AI-автоматизация
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            От обращения клиента до автоматической обработки — без участия оператора
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="glass-panel p-8 sm:p-12 overflow-x-auto">
            <svg viewBox="0 0 100 90" className="w-full max-w-3xl mx-auto" style={{ minWidth: 500 }}>
              {/* Edges */}
              {edges.map((edge, i) => {
                const fromNode = nodes.find((n) => n.id === edge.from)!
                const toNode = nodes.find((n) => n.id === edge.to)!
                return (
                  <motion.line
                    key={i}
                    x1={fromNode.x + 6}
                    y1={fromNode.y + 5}
                    x2={toNode.x}
                    y2={toNode.y + 5}
                    stroke="rgba(99,102,241,0.3)"
                    strokeWidth="0.3"
                    strokeDasharray="1 0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                  />
                )
              })}

              {/* Nodes */}
              {nodes.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width="12"
                    height="10"
                    rx="1.5"
                    fill="#18181B"
                    stroke="rgba(99,102,241,0.2)"
                    strokeWidth="0.2"
                  />
                  <text x={node.x + 6} y={node.y + 4.5} textAnchor="middle" fontSize="3.5">
                    {node.icon}
                  </text>
                  <text
                    x={node.x + 6}
                    y={node.y + 8}
                    textAnchor="middle"
                    fontSize="1.6"
                    fill="#A1A1AA"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/sections/tech-stack.tsx`**

```tsx
"use client"

import { StaggerContainer, StaggerItem, MotionWrapper } from "@/components/motion-wrapper"

const technologies = [
  { name: "Next.js", color: "#000000" },
  { name: "n8n", color: "#EA4B71" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "OpenAI", color: "#412991" },
  { name: "WhatsApp API", color: "#25D366" },
  { name: "Telegram", color: "#26A5E4" },
  { name: "Make", color: "#6D00CC" },
  { name: "Vercel", color: "#000000" },
]

export function TechStack() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Стек</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Технологии, которые мы используем
          </h2>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="glass-panel hover-glow p-5 text-center group cursor-default">
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: tech.color + "20", border: `1px solid ${tech.color}30` }}
                >
                  {tech.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-text-secondary text-sm font-medium">{tech.name}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/sections/ai-systems-showcase.tsx`**

```tsx
"use client"

import { MotionWrapper } from "@/components/motion-wrapper"
import { X, Check, ArrowRight } from "lucide-react"

const beforeItems = [
  "Ручная обработка каждого обращения",
  "Оператор тратит 5-10 мин на заявку",
  "Потеря 20-40% обращений",
  "Работа только в рабочее время",
  "Нет аналитики и контроля",
]

const afterItems = [
  "AI обрабатывает 80% обращений автоматически",
  "Время ответа — 30 секунд",
  "0% потерянных обращений",
  "24/7 без выходных",
  "Real-time dashboard и аналитика",
]

export function AISystemsShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Трансформация</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            До и после AI-автоматизации
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          <MotionWrapper delay={0.1}>
            <div className="glass-panel p-6 sm:p-8 h-full border-red-500/10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <X size={16} className="text-red-400" />
                </div>
                <h3 className="font-semibold text-text-primary">До автоматизации</h3>
              </div>
              <div className="space-y-4">
                {beforeItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <X size={14} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-text-muted text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <div className="glass-panel p-6 sm:p-8 h-full border-accent/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Check size={16} className="text-accent" />
                </div>
                <h3 className="font-semibold text-text-primary">После автоматизации</h3>
              </div>
              <div className="space-y-4">
                {afterItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={14} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-text-secondary text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: architecture diagram, tech stack grid, before/after showcase"
```

---

## Task 11: AI consultant section (UI shell) + Metrics + CTA + Contact form sections

**Files:**
- Create: `components/sections/ai-consultant-section.tsx`
- Create: `components/sections/metrics-section.tsx`
- Create: `components/sections/cta-section.tsx`
- Create: `components/sections/contact-form.tsx`

- [ ] **Step 1: Create `components/sections/ai-consultant-section.tsx`**

UI-only shell — the OpenAI integration happens in Phase 2.

```tsx
"use client"

import { useState } from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MotionWrapper } from "@/components/motion-wrapper"

export function AIConsultantSection() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { role: "user" as const, content: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Спасибо за описание задачи! Я AI-консультант AIAutomation Studio. В текущей версии я работаю в демо-режиме. Для полноценной консультации свяжитесь с нами через форму на странице контактов или напишите в Telegram.",
        },
      ])
    }, 1000)
  }

  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-2xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">AI-консультант</p>
          <h2 className="text-3xl font-bold text-text-primary mb-3">
            Опишите вашу задачу
          </h2>
          <p className="text-text-muted text-sm">AI подберёт подходящее решение автоматизации</p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="glass-panel overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/[0.06]">
              <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div>
                <p className="text-text-primary text-xs font-medium">AI Consultant</p>
                <p className="text-text-muted text-[10px]">AIAutomation Studio</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                  <p className="text-text-muted text-sm text-center max-w-xs">
                    Опишите бизнес-процесс, который хотите автоматизировать
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                    msg.role === "assistant" ? "accent-gradient" : "bg-white/10"
                  }`}>
                    {msg.role === "assistant" ? <Bot size={11} className="text-white" /> : <User size={11} className="text-text-secondary" />}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-tr-none"
                      : "bg-background text-text-primary rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.06] p-3 flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
                }}
                placeholder="Например: хочу автоматизировать приём заявок..."
                rows={2}
                className="resize-none bg-background border-white/[0.06] text-text-primary text-sm placeholder:text-text-muted"
              />
              <Button onClick={handleSend} disabled={!input.trim()} className="accent-gradient text-white self-end shrink-0">
                <Send size={14} />
              </Button>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/sections/metrics-section.tsx`**

```tsx
"use client"

import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const metrics = [
  { value: "80%", label: "сокращение времени ответа", desc: "AI отвечает за секунды, не минуты" },
  { value: "3x", label: "рост конверсии", desc: "Ни одно обращение не потеряно" },
  { value: "24/7", label: "работа без перерывов", desc: "AI не спит и не уходит в отпуск" },
  { value: "2 нед", label: "срок внедрения", desc: "От аудита до запуска" },
]

export function MetricsSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <StaggerItem key={m.label}>
              <div className="glass-panel p-6 text-center hover-glow">
                <p className="text-3xl sm:text-4xl font-bold accent-gradient-text mb-2">{m.value}</p>
                <p className="text-text-primary text-sm font-medium mb-1">{m.label}</p>
                <p className="text-text-muted text-xs">{m.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/sections/cta-section.tsx`**

```tsx
"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/motion-wrapper"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <MotionWrapper>
        <div className="max-w-4xl mx-auto accent-gradient rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Готовы автоматизировать бизнес?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Расскажите о вашем бизнесе — подберём решение и посчитаем ROI
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-accent font-medium px-8 hover:bg-white/90 transition-colors">
                Обсудить проект
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </MotionWrapper>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/sections/contact-form.tsx`**

Client-side validation only in Phase 1 — API route comes in Phase 2.

```tsx
"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MotionWrapper } from "@/components/motion-wrapper"

export function ContactFormSection() {
  const [status, setStatus] = useState<"idle" | "success">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get("name") as string
    const phone = form.get("phone") as string
    const newErrors: Record<string, string> = {}
    if (!name || name.length < 2) newErrors.name = "Введите имя"
    if (!phone || !/^\+?[\d\s\-()]{7,20}$/.test(phone)) newErrors.phone = "Введите корректный номер"
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setErrors({})
    setStatus("success")
  }

  if (status === "success") {
    return (
      <section className="py-24 px-4 sm:px-6" id="contact-form">
        <MotionWrapper className="max-w-lg mx-auto text-center py-16">
          <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">Заявка отправлена!</h3>
          <p className="text-text-muted text-sm">Ответим в течение 2 часов в рабочее время</p>
        </MotionWrapper>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 sm:px-6" id="contact-form">
      <div className="max-w-lg mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Контакты</p>
          <h2 className="text-3xl font-bold text-text-primary mb-3">Оставить заявку</h2>
          <p className="text-text-muted text-sm">Расскажите о задаче — подберём решение</p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 space-y-4">
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-text-secondary text-xs mb-1.5 block">Имя *</label>
                <Input name="name" className="bg-background border-white/[0.06] text-text-primary" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-text-secondary text-xs mb-1.5 block">Телефон *</label>
                <Input name="phone" type="tel" placeholder="+7 (___) ___-__-__" className="bg-background border-white/[0.06] text-text-primary placeholder:text-text-muted" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="text-text-secondary text-xs mb-1.5 block">Бизнес</label>
              <Input name="business" placeholder="Сфера и масштаб" className="bg-background border-white/[0.06] text-text-primary placeholder:text-text-muted" />
            </div>

            <div>
              <label className="text-text-secondary text-xs mb-1.5 block">Сообщение</label>
              <Textarea name="message" rows={3} placeholder="Опишите задачу или вопрос..." className="resize-none bg-background border-white/[0.06] text-text-primary placeholder:text-text-muted" />
            </div>

            <Button type="submit" className="w-full accent-gradient text-white font-medium">
              Отправить заявку
            </Button>
            <p className="text-center text-text-muted text-xs">Ответим в течение 2 часов</p>
          </form>
        </MotionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: AI consultant shell, metrics, CTA, contact form sections"
```

---

## Task 12: Home page — compose all sections

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/hero"
import { ServicesPreview } from "@/components/sections/services-preview"
import { CasesPreview } from "@/components/sections/cases-preview"
import { ArchitectureShowcase } from "@/components/sections/architecture-showcase"
import { TechStack } from "@/components/sections/tech-stack"
import { AISystemsShowcase } from "@/components/sections/ai-systems-showcase"
import { AIConsultantSection } from "@/components/sections/ai-consultant-section"
import { MetricsSection } from "@/components/sections/metrics-section"
import { CTASection } from "@/components/sections/cta-section"
import { ContactFormSection } from "@/components/sections/contact-form"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <CasesPreview />
      <ArchitectureShowcase />
      <TechStack />
      <AISystemsShowcase />
      <AIConsultantSection />
      <MetricsSection />
      <CTASection />
      <ContactFormSection />
    </>
  )
}
```

- [ ] **Step 2: Verify home page in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify all 10 sections render correctly:
1. Hero with gradient background, H1, stats, buttons
2. Services grid (6 cards)
3. Featured cases (3 cards)
4. Architecture SVG diagram
5. Tech stack logo grid
6. Before/After comparison
7. AI consultant chat widget
8. Metrics cards
9. Full-width gradient CTA
10. Contact form

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: home page composing all 10 sections"
```

---

## Task 13: Cases listing + single case pages

**Files:**
- Create: `app/cases/page.tsx`
- Create: `app/cases/[slug]/page.tsx`

- [ ] **Step 1: Create `app/cases/page.tsx`**

```tsx
import type { Metadata } from "next"
import { CasesListClient } from "./cases-list-client"

export const metadata: Metadata = {
  title: "Кейсы AI-автоматизации",
  description: "Реализованные проекты AI-автоматизации: WhatsApp AI, CRM, n8n workflows, AI-ресепшн. Результаты и архитектура решений.",
}

export default function CasesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Портфолио</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Кейсы</h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Реализованные проекты AI-автоматизации с измеримыми результатами
        </p>
      </div>
      <CasesListClient />
    </div>
  )
}
```

Create the client component for filters at `app/cases/cases-list-client.tsx`:

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cases } from "@/data/cases"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const industries = ["Все", "Клиники", "Рестораны", "E-commerce", "Услуги", "SaaS"]
const technologies = ["Все", "WhatsApp API", "OpenAI", "n8n", "CRM", "Supabase"]

export function CasesListClient() {
  const [activeIndustry, setActiveIndustry] = useState("Все")
  const [activeTech, setActiveTech] = useState("Все")

  const filtered = cases.filter((c) => {
    if (!c.published) return false
    if (activeIndustry !== "Все" && c.industry !== activeIndustry) return false
    if (activeTech !== "Все" && !c.technologies.some((t) => t.includes(activeTech))) return false
    return true
  })

  return (
    <>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <p className="text-text-muted text-xs mb-2">Индустрия</p>
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeIndustry === ind
                    ? "accent-gradient text-white"
                    : "bg-surface text-text-muted border border-white/[0.06] hover:border-accent/30"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-text-muted text-xs mb-2">Технология</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTech === tech
                    ? "accent-gradient text-white"
                    : "bg-surface text-text-muted border border-white/[0.06] hover:border-accent/30"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((cs) => (
          <StaggerItem key={cs.id}>
            <Link href={`/cases/${cs.slug}`} className="group block glass-panel hover-glow overflow-hidden h-full">
              <div className="h-36 bg-gradient-to-br from-accent/10 to-accent-end/10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-xl border border-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xl font-bold">{cs.title[0]}</span>
                </div>
              </div>
              <div className="p-5">
                <Badge variant="secondary" className="mb-2 text-xs bg-accent/10 text-accent border-0">
                  {cs.industry}
                </Badge>
                <h2 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {cs.title}
                </h2>
                <p className="text-text-muted text-sm line-clamp-2 mb-4">{cs.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cs.technologies.map((tech) => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-16">Нет кейсов по выбранным фильтрам</p>
      )}
    </>
  )
}
```

- [ ] **Step 2: Create `app/cases/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cases } from "@/data/cases"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return cases.filter((c) => c.published).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = cases.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.description,
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const cs = cases.find((c) => c.slug === slug && c.published)
  if (!cs) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Back */}
      <Link href="/cases" className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors mb-8">
        <ArrowLeft size={14} /> Все кейсы
      </Link>

      {/* Header */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4 text-xs bg-accent/10 text-accent border-0">
          {cs.industry}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{cs.title}</h1>
        <p className="text-text-secondary text-lg">{cs.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {cs.technologies.map((tech) => (
            <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-muted border border-white/[0.06]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Problem */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full accent-gradient block" />
          Проблема
        </h2>
        <div className="glass-panel p-6">
          <p className="text-text-secondary leading-relaxed">{cs.problem}</p>
        </div>
      </section>

      {/* Inefficiencies */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-red-500 block" />
          Неэффективности
        </h2>
        <div className="glass-panel p-6">
          <ul className="space-y-2">
            {cs.inefficiencies.split(". ").filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                <span className="text-red-400 mt-0.5">•</span>
                {item.replace(/\.$/, "")}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full accent-gradient block" />
          Решение
        </h2>
        <div className="glass-panel p-6">
          <p className="text-text-secondary leading-relaxed">{cs.solution}</p>
        </div>
      </section>

      {/* Results */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-success block" />
          Результаты
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {cs.results.map((r) => (
            <div key={r.metric} className="glass-panel p-5">
              <p className="text-text-muted text-xs mb-2">{r.metric}</p>
              <div className="flex items-center gap-3">
                <span className="text-red-400 text-sm line-through">{r.before}</span>
                <ArrowRight size={12} className="text-text-muted" />
                <span className="text-accent font-semibold text-lg">{r.after}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="accent-gradient rounded-2xl p-8 sm:p-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Хотите такое же решение?</h2>
        <p className="text-white/70 mb-6">Обсудим вашу задачу и подберём подходящую архитектуру</p>
        <Link href="/contact">
          <Button size="lg" className="bg-white text-accent font-medium px-8 hover:bg-white/90">
            Обсудить проект <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Verify cases pages**

Open `http://localhost:3000/cases` — should show filter bar + 5 case cards.
Click any card — should navigate to single case page with all sections.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: cases listing with filters and single case detail page"
```

---

## Task 14: Services page

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create `app/services/page.tsx`**

```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Headphones, MessageCircle, Database, Bot, Workflow, LifeBuoy, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/data/services"

export const metadata: Metadata = {
  title: "Услуги AI-автоматизации",
  description: "AI Receptionist, WhatsApp AI, CRM Automation, n8n Workflows и другие услуги AI-автоматизации для бизнеса.",
}

const ICON_MAP: Record<string, React.ElementType> = {
  Headphones, MessageCircle, Database, Bot, Workflow, LifeBuoy, Building2,
}

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-20">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Услуги</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Что мы автоматизируем</h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Полный стек AI-автоматизации для сервисного бизнеса
        </p>
      </div>

      <div className="space-y-16">
        {services.map((svc, i) => {
          const Icon = ICON_MAP[svc.icon] ?? Bot
          const isEven = i % 2 === 1
          return (
            <section key={svc.id} className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}>
              {/* Visual */}
              <div className="w-full md:w-2/5 shrink-0">
                <div className="glass-panel p-10 flex items-center justify-center aspect-square max-w-xs mx-auto">
                  <div className="w-20 h-20 rounded-2xl accent-gradient flex items-center justify-center">
                    <Icon size={36} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-3">{svc.title}</h2>
                <p className="text-text-secondary mb-6 leading-relaxed">{svc.description}</p>

                <div className="mb-6">
                  <p className="text-text-primary text-sm font-medium mb-3">Ключевые возможности</p>
                  <div className="space-y-2">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <Check size={14} className="text-accent mt-0.5 shrink-0" />
                        <span className="text-text-muted text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-text-primary text-sm font-medium mb-2">Для кого</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.useCases.map((uc) => (
                      <span key={uc} className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-muted border border-white/[0.06]">
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/contact">
                  <Button className="accent-gradient text-white font-medium hover:opacity-90">
                    Обсудить внедрение <ArrowRight size={14} className="ml-1.5" />
                  </Button>
                </Link>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify services page**

Open `http://localhost:3000/services`. Should show 7 alternating service blocks with icons, features, use cases, and CTA buttons.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: services page with 7 service blocks and alternating layout"
```

---

## Task 15: Blog listing + single post pages

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create `app/blog/page.tsx`**

```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/data/blog-posts"

export const metadata: Metadata = {
  title: "Блог об AI-автоматизации",
  description: "Статьи о WhatsApp AI, n8n, CRM-автоматизации, AI-ресепшн и бизнес-системах.",
}

export default function BlogPage() {
  const published = blogPosts.filter((p) => p.published_at).sort(
    (a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime()
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Блог</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Статьи об AI-автоматизации
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Разбираем кейсы, сравниваем инструменты, делимся опытом
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {published.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block glass-panel hover-glow overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-br from-accent/10 to-accent-end/5 flex items-center justify-center">
              <span className="text-accent/30 text-5xl font-bold">{post.category.slice(0, 2)}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent border-0">
                  {post.category}
                </Badge>
                <span className="text-text-muted text-[10px]">
                  {new Date(post.published_at!).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <h2 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-text-muted text-sm line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/blog/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/data/blog-posts"
import { BlogPostContent } from "./blog-post-content"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.filter((p) => p.published_at).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug && p.published_at)
  if (!post) notFound()

  const related = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category && p.published_at)
    .slice(0, 2)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors mb-8">
        <ArrowLeft size={14} /> Все статьи
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-0">
              {post.category}
            </Badge>
            <span className="text-text-muted text-xs">
              {new Date(post.published_at!).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">{post.title}</h1>
        </div>

        <BlogPostContent content={post.content} />
      </article>

      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-white/[0.06]">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Похожие статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="glass-panel hover-glow p-5">
                <Badge variant="secondary" className="mb-2 text-[10px] bg-accent/10 text-accent border-0">
                  {r.category}
                </Badge>
                <h3 className="text-text-primary text-sm font-medium hover:text-accent transition-colors">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
```

Create the client component for reading progress + markdown rendering at `app/blog/[slug]/blog-post-content.tsx`:

```tsx
"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

export function BlogPostContent({ content }: { content: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 h-0.5 bg-transparent z-40">
        <div className="h-full accent-gradient transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-zinc max-w-none
        prose-headings:text-text-primary prose-headings:font-semibold
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-text-secondary prose-p:leading-relaxed prose-p:text-sm
        prose-li:text-text-secondary prose-li:text-sm
        prose-strong:text-text-primary
        prose-ul:space-y-1
      ">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Install prose plugin**

```bash
npm install @tailwindcss/typography
```

Add to `tailwind.config.ts` plugins:

```ts
plugins: [require("@tailwindcss/typography")],
```

- [ ] **Step 4: Verify blog pages**

Open `http://localhost:3000/blog` — 4 blog post cards.
Click any post — should show reading progress bar, markdown content, related posts.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: blog listing and post pages with markdown, progress bar, related posts"
```

---

## Task 16: Contact page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { ContactFormSection } from "@/components/sections/contact-form"

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с AIAutomation Studio — обсудим задачу AI-автоматизации вашего бизнеса. Ответим в течение 2 часов.",
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@aiautomation.studio", href: "mailto:hello@aiautomation.studio" },
  { icon: Phone, label: "Телефон", value: "+7 (XXX) XXX-XX-XX", href: "tel:+7XXXXXXXXXX" },
  { icon: Clock, label: "Время ответа", value: "В течение 2 часов", href: null },
  { icon: MapPin, label: "Формат", value: "Удалённо, по всему СНГ", href: null },
]

const socialLinks = [
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/" },
  { icon: Send, label: "Telegram", href: "https://t.me/" },
]

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Контакты</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Обсудить проект</h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Расскажите о задаче — подберём решение и посчитаем ROI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
        {/* Left: Form */}
        <div className="lg:col-span-3">
          <ContactFormSection />
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-text-primary font-semibold mb-5">Контактная информация</h2>
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs">{item.label}</p>
                      <p className="text-text-primary text-sm">{item.value}</p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity">{content}</a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-text-primary font-semibold mb-4">Мессенджеры</h2>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 glass-panel hover-glow p-4 text-center"
                  >
                    <Icon size={20} className="text-accent mx-auto mb-2" />
                    <p className="text-text-secondary text-xs">{link.label}</p>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="glass-panel p-6 accent-gradient/5 border-accent/20">
            <p className="text-text-primary text-sm font-medium mb-2">Как мы работаем</p>
            <ol className="space-y-2 text-text-muted text-xs">
              <li className="flex gap-2"><span className="text-accent font-medium">1.</span> Вы описываете задачу</li>
              <li className="flex gap-2"><span className="text-accent font-medium">2.</span> Мы проводим аудит и предлагаем решение</li>
              <li className="flex gap-2"><span className="text-accent font-medium">3.</span> Согласовываем архитектуру и сроки</li>
              <li className="flex gap-2"><span className="text-accent font-medium">4.</span> Внедряем и запускаем за 2-3 недели</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify contact page**

Open `http://localhost:3000/contact`. Should show two-column layout: form on left, contact info + messengers + how-we-work on right.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: contact page with form, info cards, and workflow steps"
```

---

## Task 17: Final verification and responsive polish

- [ ] **Step 1: Run dev server and test all pages**

```bash
npm run dev
```

Check each page at `http://localhost:3000`:
- `/` — Home with all 10 sections
- `/cases` — Filter bar + case cards
- `/cases/ai-reception-dental-clinic` — Full case study
- `/services` — 7 service blocks
- `/blog` — 4 blog post cards
- `/blog/whatsapp-ai-automation-80-percent` — Full blog post with progress bar
- `/contact` — Two-column contact page

- [ ] **Step 2: Test mobile responsiveness**

Use browser DevTools to test at:
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (desktop)

Verify: hamburger menu works, cards stack vertically, text remains readable, no horizontal overflow.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Should complete without errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: verify build and responsive layout"
```

---

## Summary

**Phase 1 produces:** A complete, production-buildable Next.js 15 frontend with:
- Dark premium UI with accent gradient system
- Sticky header + footer + mobile nav
- Home page: 10 animated sections
- Cases: filterable listing + detail pages with architecture + results
- Services: 7 alternating blocks
- Blog: listing + post pages with markdown + progress bar + related posts
- Contact: form + info cards

**Phase 2 will add:** Supabase backend, real API routes, OpenAI AI consultant, n8n webhook integration, Telegram notifications, seed data migration.

**Phase 3 will add:** Admin dashboard (CRUD), SEO (sitemap, robots, schema.org), performance optimization.
