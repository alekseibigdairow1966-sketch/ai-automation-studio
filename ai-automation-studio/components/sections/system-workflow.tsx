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
      { title: "Клиент пишет в WhatsApp", desc: "Обращение поступает через мессенджер, сайт или телефон" },
      { title: "AI Router анализирует обращение", desc: "Классификация типа ремонта, срочности и категории" },
      { title: "CRM создаёт заявку автоматически", desc: "Данные клиента, тип устройства, описание проблемы" },
      { title: "AI определяет тип ремонта", desc: "Маршрутизация к нужному мастеру по специализации" },
      { title: "Мастер получает уведомление", desc: "Push в Telegram с полной информацией о заявке" },
      { title: "Клиент получает автообновления", desc: "Статус ремонта, готовность, стоимость — автоматически" },
      { title: "Руководитель видит всё в dashboard", desc: "Загрузка мастеров, конверсии, скорость обработки" },
    ],
  },
  kk: {
    badge: "Процесс архитектурасы",
    title: "Жүйе қалай жұмыс істейді",
    subtitle: "Өтінімді өңдеудің толық циклі — клиент хабарламасынан өтінімді жабуға дейін",
    steps: [
      { title: "Клиент WhatsApp-қа жазады", desc: "Өтінім мессенджер, сайт немесе телефон арқылы түседі" },
      { title: "AI Router өтінімді талдайды", desc: "Жөндеу түрін, шұғылдығын және санатын жіктеу" },
      { title: "CRM өтінімді автоматты жасайды", desc: "Клиент деректері, құрылғы түрі, мәселе сипаттамасы" },
      { title: "AI жөндеу түрін анықтайды", desc: "Мамандық бойынша қажетті шеберге маршруттау" },
      { title: "Шебер хабарландыру алады", desc: "Өтінім туралы толық ақпаратпен Telegram-ға push" },
      { title: "Клиент автожаңартулар алады", desc: "Жөндеу мәртебесі, дайындық, құны — автоматты түрде" },
      { title: "Басшы бәрін dashboard-та көреді", desc: "Шеберлер жүктемесі, конверсиялар, өңдеу жылдамдығы" },
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
                    <div className="pt-1">
                      <h4 className="text-text-primary text-sm font-semibold mb-1">{step.title}</h4>
                      <p className="text-text-muted text-xs leading-relaxed">{step.desc}</p>
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
