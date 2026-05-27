"use client"

import { MotionWrapper } from "@/components/motion-wrapper"
import { X, Check } from "lucide-react"

const beforeItems = [
  "Заявки теряются между каналами",
  "Среднее время ответа — 15 минут",
  "Мастера забывают обновлять статусы",
  "Директор тратит 2 часа/день на контроль",
  "Нет аналитики и прогнозов",
]

const afterItems = [
  "Все каналы в единой AI-системе",
  "Время ответа — 30 секунд",
  "Автоматические статусы и уведомления",
  "Real-time dashboard — контроль за 5 минут",
  "AI-аналитика: загрузка, скорость, NPS",
]

export function AISystemsShowcase() {
  return (
    <section className="py-14 md:py-16 px-6 lg:px-8 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">Трансформация</p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary">
            Ваш сервисный центр до и после
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          <MotionWrapper delay={0.1}>
            <div className="glass-panel p-6 sm:p-8 h-full border-red-500/10 hover-glow">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <X size={16} className="text-red-400" />
                </div>
                <h3 className="font-semibold text-text-primary">Без автоматизации</h3>
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
            <div className="glass-panel p-6 sm:p-8 h-full border-accent/20 hover-glow">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Check size={16} className="text-accent" />
                </div>
                <h3 className="font-semibold text-text-primary">С AI-системой</h3>
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
