import { readStore } from "@/lib/content-store"
import { Hero, type HeroContent } from "@/components/sections/hero"
import { PainPointsSection } from "@/components/sections/pain-points"
import { ServicesPreview } from "@/components/sections/services-preview"
import { ArchitectureShowcase } from "@/components/sections/architecture-showcase"
import { AISystemsShowcase } from "@/components/sections/ai-systems-showcase"
import { InteractiveDemos } from "@/components/sections/interactive-demos"
import { OperationalDashboard } from "@/components/sections/operational-dashboard"
import { ROICalculator } from "@/components/sections/roi-calculator"
import { CasesPreview } from "@/components/sections/cases-preview"
import { IntegrationEcosystem } from "@/components/sections/integration-ecosystem"
import { TrustSection } from "@/components/sections/trust-section"
import { MetricsSection } from "@/components/sections/metrics-section"
import { CTASection, type CTAContent } from "@/components/sections/cta-section"
import { ContactFormSection } from "@/components/sections/contact-form"

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
      <Hero content={heroContent} />
      <PainPointsSection />
      <ServicesPreview />
      <ArchitectureShowcase />
      <AISystemsShowcase />
      <InteractiveDemos />
      <OperationalDashboard />
      <ROICalculator />
      <CasesPreview />
      <IntegrationEcosystem />
      <TrustSection />
      <MetricsSection />
      <CTASection content={ctaContent} />
      <ContactFormSection />
    </>
  )
}
