"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Activity, Zap, MessageSquare, Database, Bell, Shield } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

/* ------------------------------------------------------------------ */
/*  Translations                                                       */
/* ------------------------------------------------------------------ */

const content = {
  ru: {
    badge: "Операционные показатели",
    title: "Что уже автоматизировано",
    subtitle: "Реальные метрики работающей системы",
    metrics: [
      { value: "3 200+", label: "сообщений обработано" },
      { value: "850+", label: "автоуведомлений отправлено" },
      { value: "< 1 мин", label: "время ответа клиенту" },
      { value: "0", label: "пропущенных обновлений статусов" },
      { value: "Real-time", label: "контроль заявок" },
      { value: "Auto", label: "AI-классификация обращений" },
    ],
    eventsTitle: "Системные события",
    events: [
      "Заявка #4821 автоматически создана",
      "Статус ремонта обновлён → клиент уведомлён",
      "AI классифицировал: «Замена дисплея iPhone 14»",
      "Telegram уведомление отправлено мастеру",
      "CRM обновлена автоматически",
      "Заявка #4822 создана из WhatsApp",
      "Ремонт #4819 завершён → счёт отправлен",
      "AI определил: «Замена батареи Samsung S24»",
      "Клиент получил SMS о готовности",
      "Dashboard обновлён: 47 заявок за сегодня",
    ],
  },
  kk: {
    badge: "Операциялық көрсеткіштер",
    title: "Не автоматтандырылған",
    subtitle: "Жұмыс істейтін жүйенің нақты метрикалары",
    metrics: [
      { value: "3 200+", label: "хабарлама өңделді" },
      { value: "850+", label: "автохабарландыру жіберілді" },
      { value: "< 1 мин", label: "клиентке жауап беру уақыты" },
      { value: "0", label: "жіберілмеген мәртебе жаңартулары" },
      { value: "Real-time", label: "өтінімдерді бақылау" },
      { value: "Auto", label: "AI өтінімдерді жіктеу" },
    ],
    eventsTitle: "Жүйе оқиғалары",
    events: [
      "Өтінім #4821 автоматты түрде жасалды",
      "Жөндеу мәртебесі жаңартылды → клиент хабарландырылды",
      "AI жіктеді: «iPhone 14 дисплейін ауыстыру»",
      "Telegram хабарландыру шеберге жіберілді",
      "CRM автоматты түрде жаңартылды",
      "Өтінім #4822 WhatsApp-тан жасалды",
      "Жөндеу #4819 аяқталды → шот жіберілді",
      "AI анықтады: «Samsung S24 батареясын ауыстыру»",
      "Клиент дайындық туралы SMS алды",
      "Dashboard жаңартылды: бүгін 47 өтінім",
    ],
  },
} as const

type Lang = keyof typeof content

const METRIC_ICONS = [MessageSquare, Bell, Zap, Shield, Activity, Database]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ProofOperations() {
  const { locale } = useLocale()
  const c = content[locale as Lang] ?? content.ru

  const [eventIdx, setEventIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setEventIdx((prev) => (prev + 1) % c.events.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [c.events.length])

  // Show 5 rolling events
  const visibleEvents = Array.from({ length: 5 }, (_, i) => {
    const idx = (eventIdx + i) % c.events.length
    return { text: c.events[idx], id: `${eventIdx}-${i}` }
  })

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper className="text-center mb-14">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
            {c.badge}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            {c.title}
          </h2>
          <p className="text-text-muted text-sm">{c.subtitle}</p>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Metrics — 3 cols */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {c.metrics.map((m, i) => {
              const Icon = METRIC_ICONS[i]
              return (
                <MotionWrapper key={i} delay={0.05 * i}>
                  <div className="glass-panel p-4 flex flex-col items-center text-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-1">
                      <Icon size={14} className="text-accent" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                      <span className="text-text-primary text-base font-bold tabular-nums">{m.value}</span>
                    </div>
                    <span className="text-text-muted text-[11px] leading-tight">{m.label}</span>
                  </div>
                </MotionWrapper>
              )
            })}
          </div>

          {/* Live Events — 2 cols */}
          <MotionWrapper delay={0.2} className="lg:col-span-2">
            <div className="glass-panel p-5 h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <h3 className="text-text-primary text-xs font-semibold uppercase tracking-wider">
                  {c.eventsTitle}
                </h3>
              </div>

              <div className="space-y-0 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleEvents.map((ev) => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="py-2 border-b border-white/[0.04] last:border-0"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-accent/40 text-[10px] mt-0.5 shrink-0 tabular-nums">
                          {new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="text-text-muted text-xs leading-relaxed">{ev.text}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
