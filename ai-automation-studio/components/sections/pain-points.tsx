"use client"

import { PhoneOff, Clock, FileSpreadsheet, EyeOff, UserX, TrendingDown } from "lucide-react"
import { StaggerContainer, StaggerItem, MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const ICONS = [PhoneOff, Clock, FileSpreadsheet, EyeOff, UserX, TrendingDown]

export function PainPointsSection() {
  const { t } = useLocale()

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-red-400/80 text-xs font-medium uppercase tracking-widest mb-3">
            {t.pains.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t.pains.title}
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            {t.pains.subtitle}
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.pains.items.map((pain, i) => {
            const Icon = ICONS[i] ?? PhoneOff
            return (
              <StaggerItem key={i}>
                <div className="glass-panel p-6 h-full group hover-glow">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-red-500/15 group-hover:border-red-500/20 group-hover:shadow-[0_0_16px_rgba(239,68,68,0.1)]">
                    <Icon size={18} className="text-red-400/80" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">{pain.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{pain.desc}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
