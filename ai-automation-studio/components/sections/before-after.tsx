"use client"

import { X, Check } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const content = {
  ru: {
    badge: "Сравнение",
    title: "До и после автоматизации",
    before: {
      label: "Без системы",
      items: [
        "Заявки теряются между WhatsApp, звонками и Excel",
        "Мастера забывают обновлять статусы ремонта",
        "Клиенты звонят повторно — нет уведомлений",
        "Руководитель контролирует процессы вручную",
      ],
    },
    after: {
      label: "С AI-автоматизацией",
      items: [
        "Каждое обращение фиксируется автоматически",
        "Статусы обновляются в CRM без участия мастера",
        "Клиент получает уведомления на каждом этапе",
        "Контроль через real-time dashboard",
      ],
    },
  },
  kk: {
    badge: "Салыстыру",
    title: "Автоматтандыруға дейін және кейін",
    before: {
      label: "Жүйесіз",
      items: [
        "Өтінімдер WhatsApp, қоңыраулар мен Excel арасында жоғалады",
        "Шеберлер жөндеу мәртебелерін жаңартуды ұмытады",
        "Клиенттер қайта қоңырау шалады — хабарландыру жоқ",
        "Басшы процестерді қолмен бақылайды",
      ],
    },
    after: {
      label: "AI-автоматтандырумен",
      items: [
        "Әрбір өтінім автоматты түрде тіркеледі",
        "Мәртебелер CRM-де шебердің қатысуынсыз жаңартылады",
        "Клиент әрбір кезеңде хабарландыру алады",
        "Real-time dashboard арқылы бақылау",
      ],
    },
  },
} as const

type Lang = keyof typeof content

export function BeforeAfter() {
  const { locale } = useLocale()
  const c = content[locale as Lang] ?? content.ru

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            {c.badge}
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary">
            {c.title}
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Before */}
          <MotionWrapper delay={0.1}>
            <div className="glass-panel p-6 border-red-500/10 h-full">
              <h3 className="text-red-400 text-sm font-semibold mb-5 uppercase tracking-wider">
                {c.before.label}
              </h3>
              <ul className="space-y-4">
                {c.before.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                      <X size={12} className="text-red-400" />
                    </span>
                    <span className="text-text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>

          {/* After */}
          <MotionWrapper delay={0.2}>
            <div className="glass-panel p-6 border-accent/20 h-full">
              <h3 className="text-accent text-sm font-semibold mb-5 uppercase tracking-wider">
                {c.after.label}
              </h3>
              <ul className="space-y-4">
                {c.after.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check size={12} className="text-accent" />
                    </span>
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
