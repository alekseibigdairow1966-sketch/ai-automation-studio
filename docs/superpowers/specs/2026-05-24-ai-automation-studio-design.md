# AIAutomation Studio — Design Specification

**Version:** 1.0
**Date:** 2026-05-24
**Project:** AI Automation Showcase Platform
**Brand:** AIAutomation Studio
**Language:** Russian (RU)

---

## 1. Project Goal

Build a production-ready AI Automation Showcase Platform that serves as:
- AI automation portfolio and case study engine
- Lead generation system for AI consulting services
- Digital operations platform demonstrating systems thinking
- AI consulting funnel with integrated AI assistant

The platform must look premium, be SEO-optimized, generate leads, and demonstrate architecture of AI automation solutions. It should feel like an AI infrastructure company, not a freelancer portfolio.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| File Storage | Supabase Storage |
| AI Consultant | OpenAI API (gpt-4o-mini), streaming |
| Notifications | Webhook → n8n + Telegram Bot API (fallback) |
| Auth (admin) | Supabase Auth |
| Deployment | Vercel |
| SEO | Next.js Metadata API, sitemap.xml, robots.txt, schema.org |

---

## 3. Design System

### Color Palette (Dark Premium)

| Purpose | Value | Name |
|---|---|---|
| Background | `#09090B` | zinc-950 |
| Card/Surface | `#18181B` | zinc-900 |
| Elevated Surface | `#27272A` | zinc-800 |
| Accent Start | `#6366F1` | indigo-500 |
| Accent End | `#8B5CF6` | violet-500 |
| Primary Text | `#FAFAFA` | zinc-50 |
| Secondary Text | `#A1A1AA` | zinc-400 |
| Muted Text | `#71717A` | zinc-500 |
| Success/Green | `#22C55E` | green-500 |
| Border | `rgba(255,255,255,0.06)` | white/6 |

### Typography
- Font: Inter (Google Fonts, latin + cyrillic subsets)
- H1: 48px/bold, H2: 32px/bold, H3: 24px/semibold
- Body: 16px/normal, Small: 14px, XS: 12px

### UI Patterns
- Glass panels with `backdrop-blur` and subtle borders
- Gradient accent buttons (indigo → violet)
- Soft shadows on cards
- Animated hover effects (scale, glow)
- Clean, minimal layout with generous whitespace
- Dark mode only (no light mode toggle)

---

## 4. Architecture

### Approach: Monolithic Next.js

Single Next.js 15 application handling:
- Public-facing pages (SSR/SSG)
- API routes for form submission and AI consultant
- Admin dashboard behind Supabase Auth
- All deployed as one Vercel project

### File Structure

```
ai-automation-studio/
├── app/
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Tailwind base + custom
│   ├── cases/
│   │   ├── page.tsx                  # Cases listing with filters
│   │   └── [slug]/page.tsx           # Single case study
│   ├── services/page.tsx             # Services page
│   ├── blog/
│   │   ├── page.tsx                  # Blog listing
│   │   └── [slug]/page.tsx           # Blog post
│   ├── contact/page.tsx              # Contact / lead capture
│   ├── admin/
│   │   ├── layout.tsx                # Supabase Auth guard
│   │   ├── page.tsx                  # Admin dashboard
│   │   ├── cases/page.tsx            # CRUD cases
│   │   ├── blog/page.tsx             # CRUD blog posts
│   │   └── leads/page.tsx            # View/manage leads
│   └── api/
│       ├── contact/route.ts          # Lead → Supabase + webhook + Telegram
│       └── ai-consultant/route.ts    # OpenAI streaming endpoint
├── components/
│   ├── layout/
│   │   ├── header.tsx                # Sticky navbar
│   │   ├── footer.tsx                # Footer with links + contacts
│   │   └── mobile-nav.tsx            # Mobile hamburger menu
│   ├── sections/                     # Homepage sections
│   │   ├── hero.tsx
│   │   ├── services-preview.tsx
│   │   ├── cases-preview.tsx
│   │   ├── tech-stack.tsx
│   │   ├── ai-systems-showcase.tsx
│   │   ├── architecture-showcase.tsx
│   │   ├── cta-section.tsx
│   │   └── contact-form.tsx
│   ├── ai-consultant.tsx             # Floating AI chat widget
│   ├── architecture-diagram.tsx      # SVG workflow renderer
│   └── ui/                           # shadcn/ui components
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser Supabase client
│   │   └── server.ts                 # Server Supabase client + service role
│   ├── openai.ts                     # OpenAI wrapper + system prompt
│   ├── rate-limit.ts                 # In-memory IP rate limiter
│   ├── webhook.ts                    # n8n webhook caller
│   └── telegram.ts                   # Telegram Bot notification
├── hooks/
│   ├── use-ai-consultant.ts
│   └── use-contact-form.ts
├── types/
│   └── database.ts                   # Supabase table types
├── public/
│   ├── og-image.png
│   └── icons/                        # Tech stack SVG icons
├── .env.local.example
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 5. Pages

### 5.1 Home Page (`/`)

10 sections in order:

1. **Hero Section**
   - Full-width, dark with gradient mesh background (CSS radial gradients)
   - H1: "AI Automation Infrastructure for Service Businesses"
   - Subtitle: "WhatsApp AI, CRM-автоматизация, AI-ресепшн, n8n workflows — строим цифровую инфраструктуру для бизнеса"
   - Two CTA buttons: "Смотреть кейсы" (gradient) + "Связаться" (outline)
   - Animated stat counters: 50+ интеграций | 30+ проектов | 99.9% uptime
   - Framer Motion fade-in + stagger animation

2. **Services Preview**
   - 3x2 grid of glass-panel cards
   - Each card: Lucide icon, title, 1-line description, hover glow, arrow link
   - Services: AI Receptionist, WhatsApp AI, CRM Automation, AI Operators, n8n Workflows, AI Support

3. **Featured Cases**
   - 3 horizontal cards from Supabase (latest published)
   - Each: screenshot thumbnail, industry badge, title, tech badges, "Подробнее →"
   - Link to `/cases`

4. **Architecture Showcase**
   - Interactive SVG diagram: User → WhatsApp → AI Router → [CRM, n8n, Notifications]
   - Animated connection lines (CSS keyframes)
   - Demonstrates systems-thinking capability

5. **Technology Stack**
   - Logo grid: Next.js, n8n, Supabase, OpenAI, WhatsApp API, Telegram, Make, Vercel
   - Subtle hover with label tooltip

6. **AI Systems Showcase**
   - Before/After comparison
   - "Before": manual processes (icons + labels)
   - "After": automated flow (icons + labels + connection lines)

7. **AI Consultant Widget** (inline section)
   - Embedded chat interface
   - "Опишите вашу задачу — AI подберёт решение"
   - Same component as floating widget

8. **Social Proof / Metrics**
   - Impact numbers: "80% сокращение времени ответа", "3x рост конверсии", etc.
   - Gradient cards with large numbers

9. **CTA Block**
   - Full-width gradient background
   - "Готовы автоматизировать бизнес?" + contact button

10. **Contact Form**
    - Inline lead capture: name, phone, business, message

### 5.2 Cases Page (`/cases`)

- Filter bar: by industry (Рестораны, Клиники, E-commerce, Услуги) + by technology (WhatsApp, n8n, CRM, AI)
- 2-column card grid
- Each card: cover image, industry badge, title, problem summary (2 lines), tech stack badges, "Подробнее →"
- Server-rendered from Supabase

### 5.3 Single Case Page (`/cases/[slug]`)

Structured layout:
1. **Header** — Title, industry badge, tech badges
2. **Проблема** — Business pain point description
3. **Неэффективности** — What was broken (bullet list)
4. **Решение** — What was built (narrative)
5. **Архитектура** — SVG diagram rendered from `architecture` jsonb field
6. **Технологии** — Stack cards
7. **Результаты** — Before/after metrics (cards with icons)
8. **CTA** — "Хотите такое же решение?" + contact button

Dynamic SEO metadata from Supabase fields.

### 5.4 Services Page (`/services`)

7 service blocks, each:
- Icon (Lucide) + gradient title
- Description (2-3 sentences)
- Key features (3-4 checkmark bullet points)
- Use case examples
- CTA → `/contact`

Services:
1. AI Receptionist — автоматический приём и маршрутизация обращений
2. WhatsApp AI Automation — AI-бот для WhatsApp Business
3. CRM Automation — автоматизация CRM-процессов через n8n
4. AI Operators — AI-операторы для обработки заявок
5. n8n Workflows — построение автоматизаций на n8n
6. AI Support Systems — AI-поддержка с базой знаний
7. AI Business Infrastructure — комплексная цифровая инфраструктура

### 5.5 Blog (`/blog`)

**Listing page:**
- Card grid with cover image, category badge, title, excerpt (2 lines), date
- Filter by category

**Post page (`/blog/[slug]`):**
- Reading progress bar (scroll-based)
- Table of contents (auto-generated from headings)
- Markdown content rendered with `react-markdown`
- Related posts at bottom (same category)
- Dynamic SEO from `seo_title` / `seo_description` fields

Categories: AI Automation, WhatsApp AI, n8n, CRM, Business Systems, AI Operators

### 5.6 Contact Page (`/contact`)

Two-column layout:
- **Left:** Lead form (name, phone, business, message) with Zod validation, honeypot anti-spam
- **Right:** Contact info, response time promise ("Ответим в течение 2 часов"), social links (Telegram, WhatsApp)

On submit:
1. Zod validation (client + server)
2. Rate limit check (5/hr per IP)
3. Insert into Supabase `leads`
4. POST to n8n webhook URL
5. Telegram notification (fallback if webhook fails)
6. Success modal

### 5.7 Admin Dashboard (`/admin`)

Protected by Supabase Auth (email + password).

**Dashboard (`/admin`):**
- Stats: total leads (this week), total cases, total blog posts
- Recent leads list

**Cases Manager (`/admin/cases`):**
- Table with title, industry, published status, date
- Create/Edit form: all case fields + image upload to Supabase Storage
- Publish/unpublish toggle

**Blog Manager (`/admin/blog`):**
- Table with title, category, publish date
- Create/Edit with markdown editor (textarea)
- Publish/unpublish toggle

**Leads Viewer (`/admin/leads`):**
- Table with name, phone, business, message, source, status, date
- Status dropdown: new → contacted → closed
- No delete (leads are never deleted)

---

## 6. Database Schema

### Table: `cases`

```sql
create table cases (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text unique not null,
  description   text,
  industry      text,
  problem       text,
  inefficiencies text,
  solution      text,
  architecture  jsonb,          -- {nodes: [{id, label, icon, x, y}], edges: [{from, to, label?}]}
  technologies  text[],
  screenshots   text[],
  results       jsonb,          -- [{metric: string, before: string, after: string}]
  published     boolean default true,
  created_at    timestamptz default now()
);
```

### Table: `blog_posts`

```sql
create table blog_posts (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text unique not null,
  content         text not null,
  excerpt         text,
  cover_image     text,
  category        text,
  seo_title       text,
  seo_description text,
  published_at    timestamptz,
  created_at      timestamptz default now()
);
```

### Table: `leads`

```sql
create table leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  business    text,
  message     text,
  source      text default 'contact_form',
  status      text default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at  timestamptz default now()
);
```

### Row Level Security

- `cases`: public read (where `published = true`), service role full access
- `blog_posts`: public read (where `published_at is not null and published_at <= now()`), service role full access
- `leads`: no public access, service role full access (insert via API route only)

---

## 7. API Design

### `POST /api/contact`

**Request:**
```json
{
  "name": "string (2-100 chars)",
  "phone": "string (phone regex)",
  "business": "string (optional, max 200)",
  "message": "string (optional, max 1000)",
  "source": "contact_form | ai_widget | case_cta",
  "honeypot": ""
}
```

**Logic:**
1. Rate limit: 5 requests/hr per IP
2. Validate with Zod
3. Reject if honeypot is filled
4. Sanitize HTML tags
5. Insert into Supabase `leads`
6. POST to `N8N_WEBHOOK_URL` with lead data
7. If webhook fails → send Telegram notification
8. Return `{ success: true }`

### `POST /api/ai-consultant`

**Request:**
```json
{
  "message": "string (max 1000 chars)",
  "history": [{ "role": "user|assistant", "content": "string" }]
}
```

**Logic:**
1. Rate limit: 20 requests/hr per IP
2. Sanitize input
3. Call OpenAI GPT-4o-mini with system prompt (AI automation consulting context)
4. Stream response back as `text/plain` chunked

**System Prompt Context:**
- Knows all 7 services offered
- Knows case studies and their outcomes
- Recommends relevant solutions based on business description
- Always suggests booking a consultation
- Max 200 words per response
- Professional but approachable tone in Russian

---

## 8. SEO Architecture

### Per-page Metadata
- Every page exports `generateMetadata()` with dynamic title, description
- Cases and blog posts: metadata from Supabase fields

### Static Files
- `robots.txt` — allow all, sitemap reference
- `sitemap.xml` — auto-generated by Next.js, includes all cases + blog posts

### Schema.org
- `Organization` — on home page
- `Service` — on services page
- `Article` — on blog posts
- `FAQPage` — if FAQ section exists

### OpenGraph
- Default OG image in `/public/og-image.png`
- Dynamic OG for cases/blog from cover images

### Canonical URLs
- Set on every page via metadata API

---

## 9. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | >= 90 |
| Lighthouse SEO | >= 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |

### Techniques
- Server-side rendering for content pages
- Image optimization via `next/image` (WebP/AVIF)
- Lazy loading for below-fold sections
- Font optimization (`next/font`)
- Minimal client-side JavaScript (server components by default)

---

## 10. Seed Data

### 5 Demo Cases

1. **"AI-ресепшн для стоматологической клиники"**
   - Industry: Клиники
   - Tech: WhatsApp API, OpenAI, n8n, CRM
   - Problem: 40% пропущенных звонков, ручная запись
   - Result: 95% обращений обработаны автоматически

2. **"Автоматизация заказов ресторана через WhatsApp"**
   - Industry: Рестораны
   - Tech: WhatsApp Business API, n8n, POS-интеграция
   - Problem: потеря заказов, медленная обработка
   - Result: 3x ускорение обработки заказов

3. **"AI-оператор для интернет-магазина"**
   - Industry: E-commerce
   - Tech: OpenAI, каталог товаров, CRM
   - Problem: перегруз операторов, долгое ожидание
   - Result: 80% обращений без участия человека

4. **"CRM-автоматизация для сервисного центра"**
   - Industry: Услуги
   - Tech: n8n, Supabase, Telegram, WhatsApp
   - Problem: ручной ввод данных, потеря заявок
   - Result: 0% потерянных заявок, автоматический статус-трекинг

5. **"AI-поддержка для SaaS-продукта"**
   - Industry: SaaS
   - Tech: OpenAI, RAG, база знаний, тикет-система
   - Problem: медленная поддержка, повторяющиеся вопросы
   - Result: 70% тикетов решены AI без эскалации

### 4 Blog Posts

1. "Как WhatsApp AI автоматизирует 80% обращений клиентов"
2. "n8n vs Zapier: почему мы выбрали n8n для бизнес-автоматизации"
3. "AI-ресепшн: как заменить call-центр искусственным интеллектом"
4. "5 процессов, которые каждый бизнес должен автоматизировать в 2025"

All seed data provided as SQL insert statements in a migration file.

---

## 11. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# n8n Webhook
N8N_WEBHOOK_URL=

# Telegram (fallback notifications)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Site
NEXT_PUBLIC_SITE_URL=https://aiautomation.studio
```

---

## 12. Build Phases

### Phase 1 — Foundation + Public Pages
- Project scaffold (Next.js 15, Tailwind, shadcn/ui)
- Color system and global styles
- Layout components (Header, Footer, Mobile Nav)
- Home page (all 10 sections)
- Cases page + single case page
- Services page
- Blog page + single post page
- Contact page

### Phase 2 — Backend + Lead Gen
- Supabase schema + RLS policies
- Supabase client/server libs
- Contact form API route with validation
- n8n webhook integration
- Telegram notification fallback
- OpenAI AI consultant (API route + widget)
- Rate limiting
- Seed data migration

### Phase 3 — Admin + SEO + Polish
- Admin auth (Supabase Auth)
- Admin dashboard
- Cases CRUD
- Blog CRUD
- Leads viewer
- SEO setup (metadata, sitemap, robots, schema.org)
- Performance optimization
- Responsive polish
