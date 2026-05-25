"use client"

import Image from "next/image"
import { Shield, Wrench, Cpu, Users } from "lucide-react"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const ICONS = [Wrench, Cpu, Users, Shield]

export function TrustSection() {
  const { locale, t } = useLocale()

  const founderName = locale === "kk" ? "Алексей" : "Алексей"
  const founderRole = locale === "kk" ? "Негізін қалаушы, AIAutomation Studio" : "Основатель AIAutomation Studio"
  const founderQuote = locale === "kk"
    ? "Біз сервис орталықтарының нақты ауыртпалығын білеміз — сондықтан біздің шешімдер жұмыс істейді"
    : "Мы знаем реальную боль сервисных центров — поэтому наши решения работают"

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">{t.trust.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t.trust.title}
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto">
            {t.trust.subtitle}
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {t.trust.items.map((point, i) => {
            const Icon = ICONS[i] ?? Shield
            return (
              <StaggerItem key={i}>
                <div className="glass-panel p-6 sm:p-8 h-full hover-glow group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-accent/15 group-hover:border-accent/30 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                      <Icon size={22} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-2">{point.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Founder card */}
        <MotionWrapper delay={0.4}>
          <div className="glass-panel p-6 sm:p-8 border-accent/10 max-w-2xl mx-auto">
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-accent/30 shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                <Image
                  src="/avatar.png"
                  alt={founderName}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-text-secondary text-sm sm:text-base italic leading-relaxed mb-2">
                  &ldquo;{founderQuote}&rdquo;
                </p>
                <p className="text-text-primary text-sm font-semibold">{founderName}</p>
                <p className="text-text-muted text-xs">{founderRole}</p>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
