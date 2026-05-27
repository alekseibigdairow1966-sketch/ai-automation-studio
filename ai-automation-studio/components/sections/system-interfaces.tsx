"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Monitor, Smartphone, MessageSquare, Send, List, FileText } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

/* ------------------------------------------------------------------ */
/*  Translations                                                       */
/* ------------------------------------------------------------------ */

const content = {
  ru: {
    badge: "Интерфейсы системы",
    title: "Как выглядит платформа изнутри",
    subtitle: "Production-ready интерфейсы для каждого участника процесса",
    tabs: ["CRM Dashboard", "Карточка ремонта", "WhatsApp Bot", "Telegram", "Pipeline", "Журнал"],
  },
  kk: {
    badge: "Жүйе интерфейстері",
    title: "Платформа ішінен қалай көрінеді",
    subtitle: "Процестің әрбір қатысушысы үшін production-ready интерфейстер",
    tabs: ["CRM Dashboard", "Жөндеу картасы", "WhatsApp Bot", "Telegram", "Pipeline", "Журнал"],
  },
} as const

type Lang = keyof typeof content

const TAB_ICONS = [Monitor, FileText, MessageSquare, Send, List, FileText]

/* ------------------------------------------------------------------ */
/*  Mock Screens                                                       */
/* ------------------------------------------------------------------ */

function CRMDashboard() {
  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Заявки сегодня", value: "47", delta: "+12" },
          { label: "В работе", value: "12", delta: "" },
          { label: "Завершено", value: "31", delta: "+8" },
        ].map((s, i) => (
          <div key={i} className="bg-white/[0.03] rounded-lg p-3 text-center">
            <p className="text-text-muted text-[10px] mb-1">{s.label}</p>
            <p className="text-text-primary text-xl font-bold tabular-nums">{s.value}</p>
            {s.delta && <p className="text-emerald-400 text-[10px]">{s.delta}</p>}
          </div>
        ))}
      </div>
      {/* Recent orders */}
      <div className="bg-white/[0.02] rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-white/5 flex items-center">
          <span className="text-text-muted text-[10px] uppercase tracking-wider">Последние заявки</span>
        </div>
        {[
          { id: "#4821", type: "Замена дисплея", status: "В работе", master: "Алексей К.", statusColor: "text-amber-400" },
          { id: "#4820", type: "Диагностика", status: "Завершена", master: "Ерлан М.", statusColor: "text-emerald-400" },
          { id: "#4819", type: "Замена батареи", status: "Ожидает", master: "—", statusColor: "text-text-muted" },
          { id: "#4818", type: "Ремонт разъёма", status: "В работе", master: "Дамир С.", statusColor: "text-amber-400" },
        ].map((r, i) => (
          <div key={i} className="px-3 py-2 border-b border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-accent tabular-nums">{r.id}</span>
              <span className="text-text-secondary">{r.type}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`${r.statusColor} text-[11px]`}>{r.status}</span>
              <span className="text-text-muted text-[11px] w-20 text-right">{r.master}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="bg-white/[0.02] rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-muted text-[10px]">Закрыто за сегодня</span>
          <span className="text-text-primary text-xs font-semibold">74%</span>
        </div>
        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full" style={{ width: "74%" }} />
        </div>
      </div>
    </div>
  )
}

function RepairCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-text-primary text-sm font-semibold">Заявка #4821</h4>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">В работе</span>
      </div>
      <div className="space-y-2.5">
        {[
          ["Устройство", "iPhone 14 Pro"],
          ["Тип ремонта", "Замена дисплея"],
          ["Мастер", "Алексей К."],
          ["Создана", "14:32, сегодня"],
          ["Клиент уведомлён", "✓ Да"],
          ["Ориентир. стоимость", "32 000 ₸"],
        ].map(([k, v], i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-text-muted">{k}</span>
            <span className="text-text-secondary">{v}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 pt-3">
        <p className="text-text-muted text-[10px] uppercase tracking-wider mb-2">История</p>
        {[
          ["14:32", "Заявка создана (AI-классификация)"],
          ["14:33", "Назначен мастер: Алексей К."],
          ["14:35", "Мастер начал ремонт"],
          ["14:36", "Клиент уведомлён: «Ремонт начат»"],
        ].map(([time, event], i) => (
          <div key={i} className="flex items-start gap-2 py-1">
            <span className="text-accent/50 text-[10px] tabular-nums shrink-0 mt-px">{time}</span>
            <span className="text-text-muted text-[11px]">{event}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WhatsAppBot() {
  const messages = [
    { from: "client", text: "Здравствуйте, сколько стоит замена экрана iPhone 14?" },
    { from: "bot", text: "Здравствуйте! Стоимость замены экрана iPhone 14 — от 25 000 ₸. Срок ремонта: 1–2 часа. Хотите записаться?" },
    { from: "client", text: "Да, хочу записаться" },
    { from: "bot", text: "Заявка #4821 создана. Мастер свяжется с вами в ближайшее время. Вы получите уведомление о статусе ремонта." },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-white/5">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <MessageSquare size={12} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-text-primary text-xs font-medium">AI Assistant</p>
          <p className="text-emerald-400 text-[10px]">online</p>
        </div>
      </div>
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.from === "client" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
              m.from === "client"
                ? "bg-accent/20 text-text-secondary rounded-br-sm"
                : "bg-white/[0.04] text-text-muted rounded-bl-sm"
            }`}
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  )
}

function TelegramNotifications() {
  const messages = [
    { time: "14:32", text: "🔔 Новая заявка #4821\nТип: Замена дисплея iPhone 14\nКлиент: Марат А.\nТелефон: +7 707 ***-**-12" },
    { time: "14:35", text: "✅ Вы назначены на заявку #4821\nНачните ремонт и обновите статус" },
    { time: "15:40", text: "⏰ Напоминание: обновите статус заявки #4821\nКлиент ожидает информацию" },
    { time: "16:10", text: "📋 Сводка за день:\n• Выполнено: 5 заявок\n• В работе: 1\n• Среднее время: 48 мин" },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-white/5">
        <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Send size={12} className="text-blue-400" />
        </div>
        <div>
          <p className="text-text-primary text-xs font-medium">Service Bot — Мастер</p>
          <p className="text-blue-400 text-[10px]">bot</p>
        </div>
      </div>
      {messages.map((m, i) => (
        <div key={i} className="bg-white/[0.03] rounded-lg px-3 py-2">
          <p className="text-accent/40 text-[10px] tabular-nums mb-1">{m.time}</p>
          <p className="text-text-muted text-[11px] leading-relaxed whitespace-pre-line">{m.text}</p>
        </div>
      ))}
    </div>
  )
}

function PipelineView() {
  const columns = [
    {
      title: "Новые", color: "border-blue-500/30", count: 4,
      items: [
        { id: "#4823", type: "Диагностика", time: "2 мин" },
        { id: "#4822", type: "Замена стекла", time: "5 мин" },
      ],
    },
    {
      title: "В работе", color: "border-amber-500/30", count: 3,
      items: [
        { id: "#4821", type: "Замена дисплея", time: "38 мин" },
        { id: "#4817", type: "Ремонт платы", time: "1.5 ч" },
      ],
    },
    {
      title: "Готово", color: "border-emerald-500/30", count: 31,
      items: [
        { id: "#4820", type: "Диагностика", time: "Завершена" },
        { id: "#4816", type: "Замена батареи", time: "Завершена" },
      ],
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {columns.map((col, i) => (
        <div key={i} className={`rounded-lg border ${col.color} bg-white/[0.02] p-2`}>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-text-primary text-[10px] font-semibold uppercase tracking-wider">{col.title}</span>
            <span className="text-text-muted text-[10px] tabular-nums">{col.count}</span>
          </div>
          <div className="space-y-1.5">
            {col.items.map((item, j) => (
              <div key={j} className="bg-white/[0.03] rounded-md p-2">
                <p className="text-accent text-[10px] tabular-nums">{item.id}</p>
                <p className="text-text-secondary text-[11px]">{item.type}</p>
                <p className="text-text-muted text-[10px]">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function AutomationLogs() {
  const logs = [
    { time: "16:12:04", level: "INFO", msg: "WhatsApp webhook received → message parsed" },
    { time: "16:12:05", level: "AI", msg: "Classification: device=iPhone14, type=screen_replace, priority=normal" },
    { time: "16:12:05", level: "CRM", msg: "Order #4823 created → assigned to queue" },
    { time: "16:12:06", level: "ROUTE", msg: "Best match: master_id=7 (Алексей К.) score=0.94" },
    { time: "16:12:06", level: "NOTIFY", msg: "Telegram push sent → master_id=7 delivered" },
    { time: "16:12:07", level: "NOTIFY", msg: "WhatsApp reply sent → client confirmed" },
    { time: "16:12:08", level: "SYNC", msg: "Dashboard updated → 48 orders today" },
    { time: "16:12:10", level: "INFO", msg: "Pipeline: new=5, active=3, done=31" },
  ]

  const levelColors: Record<string, string> = {
    INFO: "text-text-muted",
    AI: "text-violet-400",
    CRM: "text-blue-400",
    ROUTE: "text-amber-400",
    NOTIFY: "text-emerald-400",
    SYNC: "text-cyan-400",
  }

  return (
    <div className="font-mono text-[11px] leading-relaxed space-y-1">
      {logs.map((log, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-text-muted/40 tabular-nums shrink-0">{log.time}</span>
          <span className={`${levelColors[log.level] ?? "text-text-muted"} shrink-0 w-12`}>[{log.level}]</span>
          <span className="text-text-muted">{log.msg}</span>
        </div>
      ))}
    </div>
  )
}

const SCREENS = [CRMDashboard, RepairCard, WhatsAppBot, TelegramNotifications, PipelineView, AutomationLogs]

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function SystemInterfaces() {
  const { locale } = useLocale()
  const c = content[locale as Lang] ?? content.ru
  const [activeTab, setActiveTab] = useState(0)
  const ActiveScreen = SCREENS[activeTab]

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
          <div className="glass-panel overflow-hidden">
            {/* Tab bar */}
            <div className="flex overflow-x-auto border-b border-white/5 px-2 gap-0.5 scrollbar-hide">
              {c.tabs.map((tab, i) => {
                const Icon = TAB_ICONS[i]
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-1.5 px-3 py-3 text-xs whitespace-nowrap transition-colors shrink-0 border-b-2 ${
                      activeTab === i
                        ? "border-accent text-accent"
                        : "border-transparent text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    <Icon size={13} />
                    {tab}
                  </button>
                )
              })}
            </div>

            {/* Screen */}
            <div className="p-5 sm:p-6 min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <ActiveScreen />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
