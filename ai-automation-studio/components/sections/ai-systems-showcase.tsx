"use client"

import { MotionWrapper } from "@/components/motion-wrapper"
import { X, Check } from "lucide-react"

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
