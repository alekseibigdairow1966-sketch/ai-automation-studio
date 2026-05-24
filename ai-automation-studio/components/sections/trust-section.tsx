"use client"

import { Shield, Wrench, Cpu, Users } from "lucide-react"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const trustPoints = [
  {
    icon: Wrench,
    title: "Реальный опыт сервисных центров",
    desc: "Мы строим системы на основе реальных операционных проблем: потеря заявок, хаос в коммуникации, отсутствие контроля. Мы понимаем, как устроен ваш бизнес изнутри.",
  },
  {
    icon: Cpu,
    title: "Инженерный подход к автоматизации",
    desc: "Каждое решение — это спроектированная система: архитектура, интеграции, потоки данных. Не шаблоны, а инфраструктура под ваши процессы.",
  },
  {
    icon: Users,
    title: "Работаем с командой, а не вместо неё",
    desc: "Автоматизация дополняет ваших сотрудников: мастера получают заявки в Telegram, директор видит dashboard, клиент — уведомления. Каждый работает быстрее.",
  },
  {
    icon: Shield,
    title: "Внедрение за 2 недели с поддержкой",
    desc: "От аудита процессов до работающей системы — 2 недели. После запуска: мониторинг, доработки и масштабирование. Мы остаёмся с вами.",
  },
]

export function TrustSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Почему мы</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Построено на реальном опыте сервисного бизнеса
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto">
            Мы не предлагаем универсальные AI-решения. Мы строим операционные системы для сервисных центров, потому что знаем, как они работают
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {trustPoints.map((point) => {
            const Icon = point.icon
            return (
              <StaggerItem key={point.title}>
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
      </div>
    </section>
  )
}
