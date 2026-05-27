"use client"

import { Play } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const content = {
  ru: {
    badge: "Демонстрация",
    title: "Как система работает в реальном времени",
    subtitle: "Полный цикл: от сообщения клиента до закрытия заявки в CRM",
    cta: "Смотреть демо",
    steps: [
      "WhatsApp сообщение от клиента",
      "AI-классификация и создание заявки",
      "Автоматическая маршрутизация мастеру",
      "CRM обновляется в реальном времени",
      "Клиент получает уведомления",
      "Руководитель видит dashboard",
    ],
  },
  kk: {
    badge: "Демонстрация",
    title: "Жүйе нақты уақытта қалай жұмыс істейді",
    subtitle: "Толық цикл: клиент хабарламасынан CRM-де өтінімді жабуға дейін",
    cta: "Демоны көру",
    steps: [
      "Клиенттен WhatsApp хабарламасы",
      "AI-жіктеу және өтінім жасау",
      "Шеберге автоматты маршруттау",
      "CRM нақты уақытта жаңартылады",
      "Клиент хабарландырулар алады",
      "Басшы dashboard-ты көреді",
    ],
  },
} as const

type Lang = keyof typeof content

export function DemoVideo() {
  const { locale } = useLocale()
  const c = content[locale as Lang] ?? content.ru

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            {c.badge}
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-3">
            {c.title}
          </h2>
          <p className="text-text-muted text-sm">{c.subtitle}</p>
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Video placeholder */}
            <div className="lg:col-span-3">
              <div className="glass-panel aspect-video flex items-center justify-center relative overflow-hidden group cursor-pointer">
                {/* Grid pattern background */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Play button */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Play size={24} className="text-accent ml-1" />
                  </div>
                  <span className="text-text-muted text-sm">{c.cta}</span>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/40" />
                </div>
                <div className="absolute top-4 right-4 text-text-muted/40 text-[10px] font-mono">
                  REC ●
                </div>
              </div>
            </div>

            {/* Steps list */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="space-y-3">
                {c.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-accent text-[10px] font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-text-secondary text-sm leading-relaxed pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
