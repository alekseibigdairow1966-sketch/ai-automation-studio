"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

const content = {
  ru: {
    badge: "FAQ",
    title: "Частые вопросы",
    items: [
      {
        q: "Нужно ли менять нашу CRM?",
        a: "Нет. ServiceLayer — это слой поверх ваших инструментов. Если CRM нет — поможем с лёгким вариантом.",
      },
      {
        q: "Сколько это стоит?",
        a: "Внедрение от 300 000 ₸ и подписка от 49 000 ₸/мес в зависимости от объёма заявок и каналов. Точную цифру называем после бесплатного аудита.",
      },
      {
        q: "Как быстро запустимся?",
        a: "Базовый приём заявок — за 14 дней. Полная маршрутизация и аналитика — по мере подключения каналов.",
      },
      {
        q: "А если не сработает?",
        a: "Первый месяц — с гарантией. Если за 30 дней нет измеримого результата, возвращаем оплату за внедрение.",
      },
      {
        q: "Это безопасно для данных клиентов?",
        a: "Да. Инфраструктуру можно развернуть на серверах в Казахстане, данные остаются под вашим контролем.",
      },
    ],
  },
  kk: {
    badge: "FAQ",
    title: "Жиі қойылатын сұрақтар",
    items: [
      {
        q: "CRM-ді ауыстыру керек пе?",
        a: "Жоқ. ServiceLayer — бұл құралдарыңыздың үстіндегі қабат. CRM жоқ болса — жеңіл нұсқамен көмектесеміз.",
      },
      {
        q: "Бұл қанша тұрады?",
        a: "Енгізу 300 000 ₸-ден және жазылым айына 49 000 ₸-ден — өтінім көлемі мен арналарға байланысты. Нақты соманы тегін аудиттен кейін айтамыз.",
      },
      {
        q: "Қаншалықты тез іске қосамыз?",
        a: "Базалық өтінім қабылдау — 14 күнде. Толық маршруттау мен аналитика — арналарды қосуға қарай.",
      },
      {
        q: "Егер жұмыс істемесе ше?",
        a: "Бірінші ай — кепілдікпен. 30 күнде өлшенетін нәтиже болмаса, енгізу ақысын қайтарамыз.",
      },
      {
        q: "Бұл клиент деректері үшін қауіпсіз бе?",
        a: "Иә. Инфрақұрылымды Қазақстандағы серверлерде орналастыруға болады, деректер сіздің бақылауыңызда қалады.",
      },
    ],
  },
} as const

export function FAQSection() {
  const { locale } = useLocale()
  const c = content[locale] ?? content.ru
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            {c.badge}
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary">
            {c.title}
          </h2>
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <div className="space-y-3">
            {c.items.map((item, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  className="glass-panel overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                  >
                    <span className="text-text-primary text-sm font-medium">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-text-muted shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-4 text-text-muted text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
