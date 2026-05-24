"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  ArrowRight,
  Sparkles,
  Loader2,
  Check,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CONSULTANT_STEPS,
  generateRecommendations,
  generateAuditSummary,
  type Recommendation,
} from "@/data/consultant-flow"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Message {
  id: string
  role: "ai" | "user"
  content: string
}

type Phase = "chat" | "processing" | "results" | "capture" | "done"

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ConsultantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [multiSelected, setMultiSelected] = useState<string[]>([])
  const [phase, setPhase] = useState<Phase>("chat")
  const [isTyping, setIsTyping] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [auditSummary, setAuditSummary] = useState("")
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "" })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasBeenOpened, setHasBeenOpened] = useState(false)

  /* scroll to bottom whenever messages change */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping, phase])

  /* ---- helpers ---- */

  const addMessage = useCallback(
    (role: "ai" | "user", content: string) => {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, role, content },
      ])
    },
    [],
  )

  const showAiMessage = useCallback(
    (content: string, delay = 800) => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage("ai", content)
      }, delay)
    },
    [addMessage],
  )

  /* ---- open the widget → start the conversation ---- */

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    if (!hasBeenOpened) {
      setHasBeenOpened(true)
      const greeting = CONSULTANT_STEPS[0]
      showAiMessage(greeting.message, 600)
      setTimeout(() => {
        const first = CONSULTANT_STEPS[1]
        showAiMessage(first.message, 800)
        setCurrentStep(1)
      }, 1600)
    }
  }, [hasBeenOpened, showAiMessage])

  /* ---- handle user selecting an option ---- */

  const handleSelect = useCallback(
    (value: string, label: string) => {
      const step = CONSULTANT_STEPS[currentStep]
      if (!step?.field) return

      addMessage("user", label)
      setAnswers((prev) => ({ ...prev, [step.field!]: value }))

      const nextIdx = currentStep + 1
      if (nextIdx < CONSULTANT_STEPS.length) {
        const next = CONSULTANT_STEPS[nextIdx]
        showAiMessage(next.message, 700)
        setCurrentStep(nextIdx)
        setMultiSelected([])
      } else {
        /* all questions answered → processing */
        setPhase("processing")
        setTimeout(() => {
          const finalAnswers = { ...answers, [step.field!]: value }
          setRecommendations(generateRecommendations(finalAnswers))
          setAuditSummary(generateAuditSummary(finalAnswers))
          setPhase("results")
        }, 2500)
      }
    },
    [currentStep, answers, addMessage, showAiMessage],
  )

  /* ---- multi-select toggle + confirm ---- */

  const toggleMulti = (value: string) => {
    setMultiSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const confirmMulti = useCallback(() => {
    const step = CONSULTANT_STEPS[currentStep]
    if (!step?.field || multiSelected.length === 0) return

    const labels = step
      .options!.filter((o) => multiSelected.includes(o.value))
      .map((o) => o.label)
    addMessage("user", labels.join(", "))
    setAnswers((prev) => ({ ...prev, [step.field!]: multiSelected }))

    const nextIdx = currentStep + 1
    if (nextIdx < CONSULTANT_STEPS.length) {
      const next = CONSULTANT_STEPS[nextIdx]
      showAiMessage(next.message, 700)
      setCurrentStep(nextIdx)
      setMultiSelected([])
    } else {
      setPhase("processing")
      setTimeout(() => {
        const finalAnswers = { ...answers, [step.field!]: multiSelected }
        setRecommendations(generateRecommendations(finalAnswers))
        setAuditSummary(generateAuditSummary(finalAnswers))
        setPhase("results")
      }, 2500)
    }
  }, [currentStep, multiSelected, answers, addMessage, showAiMessage])

  /* ---- lead form submit ---- */

  const handleSubmitLead = async () => {
    const errs: Record<string, string> = {}
    if (!leadForm.name || leadForm.name.length < 2) errs.name = "Введите имя"
    if (!leadForm.phone || !/^\+?[\d\s\-()]{7,20}$/.test(leadForm.phone))
      errs.phone = "Введите номер"
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs)
      return
    }
    setFormErrors({})
    setSubmitting(true)

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email || undefined,
          source: "consultant",
          consultantData: answers,
          problems: (answers["Проблемы"] as string[]) ?? [],
          business: (answers["Тип бизнеса"] as string) ?? "",
        }),
      })
    } catch {
      /* silent – still show success */
    }

    setSubmitting(false)
    setPhase("done")
  }

  /* ---- current step data ---- */
  const step = CONSULTANT_STEPS[currentStep] ?? null
  const progress =
    phase === "done"
      ? 100
      : phase === "results" || phase === "capture"
        ? 95
        : phase === "processing"
          ? 85
          : Math.round(((currentStep - 1) / (CONSULTANT_STEPS.length - 1)) * 80)

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <>
      {/* ---- Floating button ---- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full accent-gradient text-white shadow-lg shadow-accent/25 flex items-center justify-center hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
            aria-label="AI-консультант"
          >
            <MessageCircle size={24} />
            {/* pulse ring */}
            <span className="absolute inset-0 rounded-full accent-gradient animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---- Panel ---- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-4 right-4 z-50 w-[min(400px,calc(100vw-2rem))] h-[min(600px,calc(100vh-6rem))] flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40"
            style={{ background: "rgba(15,15,18,0.97)", backdropFilter: "blur(16px)" }}
          >
            {/* ---- Header ---- */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-text-primary text-sm font-semibold leading-none">
                    AI-консультант
                  </p>
                  <p className="text-text-muted text-[10px] mt-0.5">
                    Экспресс-аудит автоматизации
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* ---- Progress bar ---- */}
            <div className="h-0.5 bg-white/[0.04] shrink-0">
              <motion.div
                className="h-full accent-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* ---- Body ---- */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
            >
              {/* Messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "accent-gradient text-white rounded-br-md"
                        : "bg-white/[0.06] text-text-secondary rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}

              {/* ---- Options (select / multi) ---- */}
              {phase === "chat" &&
                !isTyping &&
                step &&
                step.type !== "greeting" &&
                messages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-1.5 pt-1"
                  >
                    {step.type === "select" &&
                      step.options?.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(opt.value, opt.label)}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-text-secondary text-sm hover:border-accent/40 hover:bg-accent/5 hover:text-text-primary transition-all duration-200"
                        >
                          {opt.label}
                        </button>
                      ))}

                    {step.type === "multi" && (
                      <>
                        {step.options?.map((opt) => {
                          const selected = multiSelected.includes(opt.value)
                          return (
                            <button
                              key={opt.value}
                              onClick={() => toggleMulti(opt.value)}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between ${
                                selected
                                  ? "border-accent/50 bg-accent/10 text-accent"
                                  : "border-white/[0.08] bg-white/[0.03] text-text-secondary hover:border-accent/30"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {selected && <Check size={14} />}
                            </button>
                          )
                        })}
                        {multiSelected.length > 0 && (
                          <Button
                            onClick={confirmMulti}
                            className="w-full accent-gradient text-white text-sm mt-2"
                          >
                            Продолжить
                            <ArrowRight size={14} className="ml-1" />
                          </Button>
                        )}
                      </>
                    )}
                  </motion.div>
                )}

              {/* ---- Processing phase ---- */}
              {phase === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-8 gap-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center">
                      <Sparkles size={28} className="text-white" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl accent-gradient"
                      animate={{ opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ filter: "blur(12px)" }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-text-primary text-sm font-medium">
                      Анализирую ваш бизнес...
                    </p>
                    <p className="text-text-muted text-xs mt-1">
                      Генерирую рекомендации по автоматизации
                    </p>
                  </div>
                  <Loader2
                    size={20}
                    className="text-accent animate-spin"
                  />
                </motion.div>
              )}

              {/* ---- Results phase ---- */}
              {phase === "results" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Summary */}
                  <div className="bg-white/[0.04] rounded-xl p-4 border border-accent/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-accent" />
                      <p className="text-accent text-xs font-medium uppercase tracking-wider">
                        Результат аудита
                      </p>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {auditSummary}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <p className="text-text-primary text-xs font-semibold uppercase tracking-wider">
                      Рекомендации
                    </p>
                    {recommendations.map((rec, i) => (
                      <motion.div
                        key={rec.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]"
                      >
                        <div className="flex items-start gap-2 mb-1.5">
                          <span
                            className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                              rec.priority === "high"
                                ? "bg-red-400"
                                : rec.priority === "medium"
                                  ? "bg-amber-400"
                                  : "bg-green-400"
                            }`}
                          />
                          <p className="text-text-primary text-sm font-medium leading-tight">
                            {rec.title}
                          </p>
                        </div>
                        <p className="text-text-muted text-xs leading-relaxed ml-3.5">
                          {rec.description}
                        </p>
                        <p className="text-accent text-xs font-medium mt-1.5 ml-3.5">
                          {rec.impact}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => setPhase("capture")}
                    className="w-full accent-gradient text-white text-sm"
                  >
                    Получить подробный план
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </motion.div>
              )}

              {/* ---- Lead capture phase ---- */}
              {phase === "capture" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <p className="text-text-primary text-sm font-semibold mb-1">
                      Получите детальный план автоматизации
                    </p>
                    <p className="text-text-muted text-xs">
                      Оставьте контакт — подготовим индивидуальное предложение
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Input
                        placeholder="Ваше имя *"
                        value={leadForm.name}
                        onChange={(e) => {
                          setLeadForm((p) => ({ ...p, name: e.target.value }))
                          setFormErrors((p) => ({ ...p, name: "" }))
                        }}
                        className="bg-white/[0.04] border-white/[0.08] text-text-primary placeholder:text-text-muted text-sm"
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        placeholder="Телефон *"
                        type="tel"
                        value={leadForm.phone}
                        onChange={(e) => {
                          setLeadForm((p) => ({ ...p, phone: e.target.value }))
                          setFormErrors((p) => ({ ...p, phone: "" }))
                        }}
                        className="bg-white/[0.04] border-white/[0.08] text-text-primary placeholder:text-text-muted text-sm"
                      />
                      {formErrors.phone && (
                        <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                    <Input
                      placeholder="Email (необязательно)"
                      type="email"
                      value={leadForm.email}
                      onChange={(e) =>
                        setLeadForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="bg-white/[0.04] border-white/[0.08] text-text-primary placeholder:text-text-muted text-sm"
                    />

                    <Button
                      onClick={handleSubmitLead}
                      disabled={submitting}
                      className="w-full accent-gradient text-white text-sm"
                    >
                      {submitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          Отправить <Send size={14} className="ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ---- Done phase ---- */}
              {phase === "done" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 gap-3 text-center"
                >
                  <CheckCircle2 size={40} className="text-accent" />
                  <p className="text-text-primary text-sm font-semibold">
                    Заявка отправлена!
                  </p>
                  <p className="text-text-muted text-xs max-w-[260px]">
                    Мы подготовим индивидуальный план автоматизации и свяжемся в
                    течение 2 часов
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="text-text-muted text-xs mt-2"
                  >
                    Закрыть
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
