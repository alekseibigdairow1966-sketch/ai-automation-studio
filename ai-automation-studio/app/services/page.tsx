import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight, Check, Headphones, MessageCircle, Database,
  GitBranch, BarChart3, Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/data/services"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { OperationalDashboard } from "@/components/sections/operational-dashboard"
import { TrustSection } from "@/components/sections/trust-section"

export const metadata: Metadata = {
  title: "AI-решения для сервисных центров — AIAutomation Studio",
  description: "AI-приёмка, WhatsApp-автоматизация, CRM, маршрутизация заявок, аналитика и автоматизация бизнес-процессов для сервисного бизнеса.",
}

const ICON_MAP: Record<string, React.ElementType> = {
  Headphones, MessageCircle, Database, GitBranch, BarChart3, Workflow,
}

export default function ServicesPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <MotionWrapper className="text-center mb-20">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Решения</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-5">
            AI-инфраструктура для сервисного бизнеса
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Полный стек автоматизации: от приёма заявок до аналитики и контроля операций. Каждое решение проектируется под ваши процессы.
          </p>
        </MotionWrapper>

        {/* Service cards — premium grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {services.map((svc) => {
            const Icon = ICON_MAP[svc.icon] ?? Workflow
            return (
              <StaggerItem key={svc.id}>
                <div className="glass-panel p-6 sm:p-8 h-full hover-glow group">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.3)]">
                    <Icon size={22} className="text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {svc.title}
                  </h2>

                  {/* Description */}
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">{svc.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-5">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <Check size={12} className="text-accent mt-0.5 shrink-0" />
                        <span className="text-text-secondary text-xs leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Use cases */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/[0.04]">
                    {svc.useCases.map((uc) => (
                      <span key={uc} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* CTA */}
        <MotionWrapper>
          <div className="rounded-2xl p-8 sm:p-12 text-center animate-gradient-shift" style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED, #8B5CF6, #6366F1)", backgroundSize: "200% 200%" }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Нужна комплексная автоматизация?</h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Проведём аудит процессов вашего сервисного центра и спроектируем архитектуру AI-системы
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-accent font-medium px-8 hover:bg-white/90">
                Обсудить проект <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </MotionWrapper>
      </div>

      {/* Dashboard section */}
      <OperationalDashboard />

      {/* Trust section */}
      <TrustSection />
    </>
  )
}
