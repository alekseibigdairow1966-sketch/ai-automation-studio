import { readStore } from "@/lib/content-store"
import { Hero, type HeroContent } from "@/components/sections/hero"
import { PainPointsSection } from "@/components/sections/pain-points"
import { SolutionSection } from "@/components/sections/solution-section"
import { BeforeAfter } from "@/components/sections/before-after"
import { SystemWorkflow } from "@/components/sections/system-workflow"
import { LiveOperationsDashboard } from "@/components/sections/live-operations-dashboard"
import { ROICalculator } from "@/components/sections/roi-calculator"
import { CasesPreview } from "@/components/sections/cases-preview"
import { PricingSection } from "@/components/sections/pricing-section"
import { HowWeStart } from "@/components/sections/how-we-start"
import { FAQSection } from "@/components/sections/faq-section"
import { TrustSection } from "@/components/sections/trust-section"
import { CTASection, type CTAContent } from "@/components/sections/cta-section"

const HERO_DEFAULTS: HeroContent = {
  badge: "AI-автоматизация для сервисных центров",
  title: "Перестаньте терять заявки между WhatsApp, звонками и Excel",
  titleAccent: "",
  subtitle:
    "AI принимает обращения из всех каналов, заводит заявку в CRM, маршрутизирует мастера и сам уведомляет клиента на каждом этапе ремонта. Вы перестаёте терять деньги на ручной рутине.",
  stats: [
    { value: "~12", label: "заявок/день теряет средний СЦ в часы пик" },
    { value: "15 мин", label: "средняя задержка ответа клиенту вручную" },
    { value: "14 дней", label: "срок запуска AI-приёма заявок" },
  ],
}

const CTA_DEFAULTS: CTAContent = {
  title: "Готовы перестать терять заявки?",
  subtitle:
    "Проведём бесплатный аудит вашего сервисного центра и покажем в цифрах, сколько вы теряете и что уберёт автоматизация.",
  buttonText: "Получить аудит потерь",
}

export default async function HomePage() {
  const heroContent = await readStore<HeroContent>("content_hero", HERO_DEFAULTS)
  const ctaContent = await readStore<CTAContent>("content_cta", CTA_DEFAULTS)

  return (
    <>
      {/* 1. Hero — value proposition */}
      <Hero content={heroContent} />

      {/* 2. Pain — operational chaos */}
      <PainPointsSection />

      {/* 3. Solution — AI layer over existing tools */}
      <SolutionSection />

      {/* 4. Before → After — visual proof */}
      <BeforeAfter />

      {/* 5. Automation Flow — how the system works */}
      <SystemWorkflow />

      {/* 6. Live Dashboard — centerpiece perception */}
      <LiveOperationsDashboard />

      {/* 7. ROI — business impact */}
      <ROICalculator />

      {/* 8. Scenarios — operational proof (3 strongest) */}
      <CasesPreview />

      {/* 9. Pricing — tiers */}
      <PricingSection />

      {/* 10. How we start — 14-day launch + guarantee */}
      <HowWeStart />

      {/* 11. FAQ — objections */}
      <FAQSection />

      {/* 12. Trust — credibility (compact) */}
      <TrustSection />

      {/* 13. CTA — conversion */}
      <CTASection content={ctaContent} />
    </>
  )
}
