"use client"

import { MessageSquare, Bot, Database, Wrench, Bell, BarChart3, Settings } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const content = {
  ru: {
    badge: "Архитектура процесса",
    title: "Как работает система",
    subtitle: "Полный цикл обработки обращения — от сообщения клиента до закрытия заявки",
    steps: [
      { title: "Клиент пишет в WhatsApp", desc: "Обращение поступает через мессенджер, сайт или телефон", event: "Ticket #4821 created" },
      { title: "Система анализирует обращение", desc: "Классификация типа ремонта, срочности и категории", event: "Routed → Diagnostics" },
      { title: "CRM создаёт заявку автоматически", desc: "Данные клиента, тип устройства, описание проблемы", event: "SLA timer started" },
      { title: "Маршрутизация к мастеру", desc: "Назначение по специализации и текущей загрузке", event: "Assigned: Ермек К." },
      { title: "Мастер получает уведомление", desc: "Push в Telegram с полной информацией о заявке", event: "Telegram alert sent" },
      { title: "Клиент получает автообновления", desc: "Статус ремонта, готовность, стоимость — автоматически", event: "Client confirmation sent" },
      { title: "Руководитель видит всё в dashboard", desc: "Загрузка мастеров, SLA compliance, скорость обработки", event: "Dashboard updated" },
    ],
  },
  kk: {
    badge: "Процесс архитектурасы",
    title: "Жүйе қалай жұмыс істейді",
    subtitle: "Өтінімді өңдеудің толық циклі — клиент хабарламасынан өтінімді жабуға дейін",
    steps: [
      { title: "Клиент WhatsApp-қа жазады", desc: "Өтінім мессенджер, сайт немесе телефон арқылы түседі", event: "Ticket #4821 created" },
      { title: "Жүйе өтінімді талдайды", desc: "Жөндеу түрін, шұғылдығын және санатын жіктеу", event: "Routed → Diagnostics" },
      { title: "CRM өтінімді автоматты жасайды", desc: "Клиент деректері, құрылғы түрі, мәселе сипаттамасы", event: "SLA timer started" },
      { title: "Шеберге маршруттау", desc: "Мамандық бойынша және жүктеме бойынша тағайындау", event: "Assigned: Ермек К." },
      { title: "Шебер хабарландыру алады", desc: "Өтінім туралы толық ақпаратпен Telegram-ға push", event: "Telegram alert sent" },
      { title: "Клиент автожаңартулар алады", desc: "Жөндеу мәртебесі, дайындық, құны — автоматты түрде", event: "Client confirmation sent" },
      { title: "Басшы бәрін dashboard-та көреді", desc: "Шеберлер жүктемесі, SLA compliance, өңдеу жылдамдығы", event: "Dashboard updated" },
    ],
  },
} as const

const ICONS = [MessageSquare, Bot, Database, Wrench, Bell, Settings, BarChart3]

type Lang = keyof typeof content

export function SystemWorkflow() {
  const { locale } = useLocale()
  const c = content[locale as Lang] ?? content.ru

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            {c.badge}
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-3">
            {c.title}
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">{c.subtitle}</p>
        </MotionWrapper>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-0">
            {c.steps.map((step, i) => {
              const Icon = ICONS[i]
              return (
                <MotionWrapper key={i} delay={0.05 * i}>
                  <div className="relative flex items-start gap-5 py-5 pl-1">
                    {/* Node */}
                    <div className="relative z-10 shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface border border-white/5 flex items-center justify-center">
                      <Icon size={18} className="text-accent" />
                    </div>

                    {/* Content */}
                    <div className="pt-1 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="text-text-primary text-sm font-semibold">{step.title}</h4>
                        {/* Live event badge */}
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/8 text-text-muted/80 font-mono">
                          {step.event}
                        </span>
                      </div>
                      <p className="text-text-muted text-xs leading-relaxed mt-1">{step.desc}</p>
                    </div>

                    {/* Arrow between steps */}
                    {i < c.steps.length - 1 && (
                      <div className="absolute left-6 sm:left-8 -bottom-1 -translate-x-1/2 text-white/10 text-[10px]">
                        ▼
                      </div>
                    )}
                  </div>
                </MotionWrapper>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
