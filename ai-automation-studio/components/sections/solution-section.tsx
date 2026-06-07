"use client"

import { Inbox, GitBranch, Bell, Gauge } from "lucide-react"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const content = {
  ru: {
    badge: "Решение",
    title: "AI-слой поверх вашего хаоса — без замены CRM",
    intro:
      "Мы не заставляем вас менять привычные инструменты. Мы достраиваем умный слой, который ловит каждую заявку и ведёт клиента сам.",
    cards: [
      {
        title: "Приём из всех каналов",
        desc: "WhatsApp, Telegram, сайт, телефон — каждое обращение фиксируется автоматически. Ни одна заявка не теряется, даже в час пик.",
      },
      {
        title: "AI-классификация и маршрутизация",
        desc: "Система определяет тип ремонта, срочность и сама назначает мастера по специализации и загрузке.",
      },
      {
        title: "Автоуведомления клиенту",
        desc: "Статус, готовность, стоимость — клиент получает обновления сам. Меньше звонков «ну что там по моему телефону?».",
      },
      {
        title: "Контроль в реальном времени",
        desc: "Руководитель видит загрузку мастеров, SLA и скорость ремонта на одном дашборде — без обзвонов.",
      },
    ],
  },
  kk: {
    badge: "Шешім",
    title: "Хаосыңыздың үстіне AI-қабат — CRM-ді ауыстырмай",
    intro:
      "Біз сізді әдеттегі құралдарды ауыстыруға мәжбүрлемейміз. Біз әр өтінімді ұстап, клиентті өзі алып жүретін ақылды қабатты қосамыз.",
    cards: [
      {
        title: "Барлық арналардан қабылдау",
        desc: "WhatsApp, Telegram, сайт, телефон — әр өтініш автоматты түрде тіркеледі. Пик сағатта да бірде-бір өтінім жоғалмайды.",
      },
      {
        title: "AI-жіктеу және маршруттау",
        desc: "Жүйе жөндеу түрін, шұғылдығын анықтайды және шеберді мамандығы мен жүктемесі бойынша өзі тағайындайды.",
      },
      {
        title: "Клиентке автохабарландыру",
        desc: "Мәртебе, дайындық, құны — клиент жаңартуларды өзі алады. «Менің телефоным қалай?» деген қоңыраулар азаяды.",
      },
      {
        title: "Нақты уақыттағы бақылау",
        desc: "Басшы шеберлердің жүктемесін, SLA және жөндеу жылдамдығын бір дашбордта көреді — қоңырау шалмай.",
      },
    ],
  },
} as const

const ICONS = [Inbox, GitBranch, Bell, Gauge]

export function SolutionSection() {
  const { locale } = useLocale()
  const c = content[locale] ?? content.ru

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            {c.badge}
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-3">
            {c.title}
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed">
            {c.intro}
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {c.cards.map((card, i) => {
            const Icon = ICONS[i] ?? Inbox
            return (
              <StaggerItem key={i}>
                <div className="glass-panel hover-glow h-full p-6">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-text-primary text-sm mb-2">
                    {card.title}
                  </h3>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
