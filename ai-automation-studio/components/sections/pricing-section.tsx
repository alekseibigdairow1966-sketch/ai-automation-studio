"use client"

import Link from "next/link"
import { Check, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

type Cell = { label: string; value: string }

interface Tier {
  name: string
  audience: string
  setup: string
  subscription: string
  recommended?: boolean
  features: Cell[]
}

const content = {
  ru: {
    badge: "Тарифы",
    title: "Окупается быстрее, чем вы думаете",
    subtitle:
      "Внедрение под ключ + поддержка. Стоимость — доля от того, что вы сейчас теряете.",
    setupLabel: "Внедрение",
    subLabel: "Подписка / мес",
    recommended: "Рекомендуем",
    note:
      "В среднем сервисный центр теряет ~1,9 млн ₸ в месяц на ручной рутине и потерянных заявках. Подписка окупается за первые недели.",
    cta: "Рассчитать мою окупаемость",
    tiers: [
      {
        name: "Старт",
        audience: "1 точка, до ~30 заявок/день",
        setup: "от 300 000 ₸",
        subscription: "49 000 ₸",
        features: [
          { label: "Каналы", value: "WhatsApp" },
          { label: "AI-маршрутизация", value: "—" },
          { label: "Дашборд", value: "базовый" },
          { label: "Интеграция с вашей CRM", value: "—" },
        ],
      },
      {
        name: "Бизнес",
        audience: "растущий сервисный центр",
        setup: "от 800 000 ₸",
        subscription: "99 000–149 000 ₸",
        recommended: true,
        features: [
          { label: "Каналы", value: "WhatsApp + Telegram + сайт" },
          { label: "AI-маршрутизация", value: "✓" },
          { label: "Дашборд", value: "SLA + загрузка" },
          { label: "Интеграция с вашей CRM", value: "✓" },
        ],
      },
      {
        name: "Сеть",
        audience: "сеть филиалов",
        setup: "от 2 000 000 ₸",
        subscription: "от 249 000 ₸",
        features: [
          { label: "Каналы", value: "все + телефония" },
          { label: "AI-маршрутизация", value: "✓ + приоритеты" },
          { label: "Дашборд", value: "мультифилиал + NPS" },
          { label: "Интеграция с вашей CRM", value: "✓ кастом" },
        ],
      },
    ] as Tier[],
  },
  kk: {
    badge: "Тарифтер",
    title: "Ойлағаннан тезірек өтеледі",
    subtitle:
      "Кілт астында енгізу + қолдау. Құны — қазір жоғалтып жатқаныңыздың үлесі.",
    setupLabel: "Енгізу",
    subLabel: "Жазылым / ай",
    recommended: "Ұсынамыз",
    note:
      "Орташа сервис орталығы қолмен жұмыс пен жоғалған өтінімдерге айына ~1,9 млн ₸ жоғалтады. Жазылым алғашқы апталарда өтеледі.",
    cta: "Өтелімімді есептеу",
    tiers: [
      {
        name: "Старт",
        audience: "1 нүкте, күніне ~30 өтінімге дейін",
        setup: "300 000 ₸-ден",
        subscription: "49 000 ₸",
        features: [
          { label: "Арналар", value: "WhatsApp" },
          { label: "AI-маршруттау", value: "—" },
          { label: "Дашборд", value: "базалық" },
          { label: "CRM-мен интеграция", value: "—" },
        ],
      },
      {
        name: "Бизнес",
        audience: "өсіп келе жатқан сервис орталығы",
        setup: "800 000 ₸-ден",
        subscription: "99 000–149 000 ₸",
        recommended: true,
        features: [
          { label: "Арналар", value: "WhatsApp + Telegram + сайт" },
          { label: "AI-маршруттау", value: "✓" },
          { label: "Дашборд", value: "SLA + жүктеме" },
          { label: "CRM-мен интеграция", value: "✓" },
        ],
      },
      {
        name: "Желі",
        audience: "филиалдар желісі",
        setup: "2 000 000 ₸-ден",
        subscription: "249 000 ₸-ден",
        features: [
          { label: "Арналар", value: "барлығы + телефония" },
          { label: "AI-маршруттау", value: "✓ + басымдықтар" },
          { label: "Дашборд", value: "мультифилиал + NPS" },
          { label: "CRM-мен интеграция", value: "✓ кастом" },
        ],
      },
    ] as Tier[],
  },
} as const

function FeatureValue({ value }: { value: string }) {
  if (value === "—") {
    return <Minus size={14} className="text-text-muted/40 shrink-0" />
  }
  if (value === "✓") {
    return <Check size={14} className="text-emerald-400 shrink-0" />
  }
  if (value.startsWith("✓")) {
    return (
      <span className="flex items-center gap-1.5 text-text-secondary text-xs">
        <Check size={14} className="text-emerald-400 shrink-0" />
        {value.replace("✓", "").trim()}
      </span>
    )
  }
  return <span className="text-text-secondary text-xs text-right">{value}</span>
}

export function PricingSection() {
  const { locale } = useLocale()
  const c = content[locale] ?? content.ru

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            {c.badge}
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-3">
            {c.title}
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {c.tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={`relative h-full rounded-2xl p-6 sm:p-7 flex flex-col ${
                  tier.recommended
                    ? "border border-accent/40 bg-accent/[0.04] shadow-[0_0_32px_rgba(99,102,241,0.10)]"
                    : "glass-panel"
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full accent-gradient text-white text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
                    ⭐ {c.recommended}
                  </span>
                )}

                {/* Name + audience */}
                <h3 className="text-text-primary text-lg font-semibold mb-1">
                  {tier.name}
                </h3>
                <p className="text-text-muted text-xs leading-snug mb-5 min-h-[32px]">
                  {tier.audience}
                </p>

                {/* Pricing */}
                <div className="space-y-2 mb-5 pb-5 border-b border-white/5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-text-muted text-xs">{c.setupLabel}</span>
                    <span className="text-text-primary text-sm font-semibold tabular-nums">
                      {tier.setup}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-text-muted text-xs">{c.subLabel}</span>
                    <span
                      className={`text-sm font-semibold tabular-nums ${
                        tier.recommended ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {tier.subscription}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-text-muted text-xs shrink-0">
                        {f.label}
                      </span>
                      <FeatureValue value={f.value} />
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Note + CTA */}
        <MotionWrapper delay={0.2}>
          <p className="text-text-muted/85 text-xs text-center mt-8 max-w-2xl mx-auto leading-relaxed">
            {c.note}
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/calculator">
              <Button
                size="lg"
                className="accent-gradient text-white font-medium px-8 hover:opacity-90 transition-opacity"
              >
                {c.cta}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
