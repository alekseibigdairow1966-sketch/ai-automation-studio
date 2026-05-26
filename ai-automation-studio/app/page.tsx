import { readStore } from "@/lib/content-store"
import { Hero, type HeroContent } from "@/components/sections/hero"
import { PainPointsSection } from "@/components/sections/pain-points"
import { BeforeAfter } from "@/components/sections/before-after"
import { SystemWorkflow } from "@/components/sections/system-workflow"
import { LiveOperationsDashboard } from "@/components/sections/live-operations-dashboard"
import { ROICalculator } from "@/components/sections/roi-calculator"
import { CasesPreview } from "@/components/sections/cases-preview"
import { TrustSection } from "@/components/sections/trust-section"
import { CTASection, type CTAContent } from "@/components/sections/cta-section"

const HERO_DEFAULTS: HeroContent = {
  badge: "Операционная AI-платформа",
  title: "CRM-автоматизация сервисного центра",
  titleAccent: "на базе AI",
  subtitle:
    "Автоматизируем заявки, статусы ремонта, уведомления клиентов и контроль работы мастеров — без хаоса и ручного контроля.",
  stats: [
    { value: "0%", label: "потерянных заявок" },
    { value: "-80%", label: "ручной работы" },
    { value: "24/7", label: "без выходных" },
  ],
}

const CTA_DEFAULTS: CTAContent = {
  title: "Готовы к операционной автоматизации?",
  subtitle:
    "Расскажите о вашем сервисном центре — проведём аудит процессов и покажем, где AI сократит хаос",
  buttonText: "Обсудить проект",
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

      {/* 3. Before → After — visual proof */}
      <BeforeAfter />

      {/* 4. Automation Flow — how the system works */}
      <SystemWorkflow />

      {/* 5. Live Dashboard — centerpiece perception */}
      <LiveOperationsDashboard />

      {/* 6. ROI — business impact */}
      <ROICalculator />

      {/* 7. Cases — operational proof (3 strongest) */}
      <CasesPreview />

      {/* 8. Trust — credibility (compact) */}
      <TrustSection />

      {/* 9. CTA — conversion */}
      <CTASection content={ctaContent} />
    </>
  )
}
