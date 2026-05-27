"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Loader2,
  Send,
  CheckCircle2,
  Building2,
  MessageSquare,
  AlertTriangle,
  Settings,
  Users,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CONSULTANT_STEPS,
  generateRecommendations,
  generateAuditSummary,
  type Recommendation,
} from "@/data/consultant-flow"
import { useLocale } from "@/lib/i18n"

/* skip greeting — audit starts at step 1 */
const AUDIT_STEPS = CONSULTANT_STEPS.filter((s) => s.type !== "greeting")
const STEP_ICONS = [Building2, MessageSquare, AlertTriangle, Settings, Users, Brain, AlertTriangle]

type Phase = "questions" | "processing" | "results" | "capture" | "done"

export function AuditFunnel() {
  const { t } = useLocale()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [multiSelected, setMultiSelected] = useState<string[]>([])
  const [phase, setPhase] = useState<Phase>("questions")
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [auditSummary, setAuditSummary] = useState("")
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "", business: "" })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const step = AUDIT_STEPS[currentStep]
  const StepIcon = STEP_ICONS[currentStep] ?? Brain
  const totalSteps = AUDIT_STEPS.length
  const progress = phase === "done" ? 100 : phase !== "questions" ? 90 : Math.round((currentStep / totalSteps) * 85)

  /* ---- navigation ---- */

  const goNext = useCallback(
    (value: string | string[]) => {
      if (!step?.field) return
      const updated = { ...answers, [step.field]: value }
      setAnswers(updated)
      setMultiSelected([])

      if (currentStep + 1 < totalSteps) {
        setCurrentStep((s) => s + 1)
      } else {
        setPhase("processing")
        setTimeout(() => {
          setRecommendations(generateRecommendations(updated))
          setAuditSummary(generateAuditSummary(updated))
          setPhase("results")
        }, 3000)
      }
    },
    [step, answers, currentStep, totalSteps],
  )

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      setMultiSelected([])
    }
  }

  /* ---- lead submit ---- */

  const handleSubmit = async () => {
    const errs: Record<string, string> = {}
    if (!leadForm.name || leadForm.name.length < 2) errs.name = t.audit.errorName as string
    if (!leadForm.phone || !/^\+?[\d\s\-()]{7,20}$/.test(leadForm.phone)) errs.phone = t.audit.errorPhone as string
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return }
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
          business: leadForm.business || (answers["Тип бизнеса"] as string) || "",
          source: "audit" as const,
          auditData: answers,
          problems: (answers["Проблемы"] as string[]) ?? [],
        }),
      })
    } catch { /* silent */ }

    setSubmitting(false)
    setPhase("done")
  }

  /* ---- slide variants ---- */
  const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-muted text-xs">
            {phase === "questions" ? `${t.audit.stepOf} ${currentStep + 1} ${t.audit.of} ${totalSteps}` : t.audit.auditDone}
          </span>
          <span className="text-accent text-xs font-medium">{progress}%</span>
        </div>
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full accent-gradient rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* ---- Questions ---- */}
      {phase === "questions" && step && (
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="glass-panel p-8 sm:p-10">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl accent-gradient flex items-center justify-center mb-6 mx-auto">
                <StepIcon size={26} className="text-white" />
              </div>

              {/* Question */}
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary text-center mb-8">
                {step.message}
              </h2>

              {/* Options */}
              <div className="space-y-3 max-w-md mx-auto">
                {step.type === "select" &&
                  step.options?.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => goNext(opt.value)}
                      className="w-full text-left px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-text-secondary hover:border-accent/40 hover:bg-accent/5 hover:text-text-primary transition-all duration-200 text-sm group flex items-center justify-between"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight size={14} className="text-text-muted group-hover:text-accent transition-colors" />
                    </button>
                  ))}

                {step.type === "multi" && (
                  <>
                    {step.options?.map((opt) => {
                      const sel = multiSelected.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          onClick={() =>
                            setMultiSelected((prev) =>
                              prev.includes(opt.value)
                                ? prev.filter((v) => v !== opt.value)
                                : [...prev, opt.value],
                            )
                          }
                          className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between ${
                            sel
                              ? "border-accent/50 bg-accent/10 text-accent"
                              : "border-white/10 bg-white/[0.03] text-text-secondary hover:border-accent/30"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sel && <Check size={16} />}
                        </button>
                      )
                    })}
                    {multiSelected.length > 0 && (
                      <Button
                        onClick={() => goNext(multiSelected)}
                        className="w-full accent-gradient text-white mt-4"
                        size="lg"
                      >
                        {t.audit.continue} <ArrowRight size={16} className="ml-1" />
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* Back button */}
              {currentStep > 0 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-text-muted text-xs hover:text-text-secondary transition-colors mt-6 mx-auto"
                >
                  <ArrowLeft size={12} /> {t.audit.back}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ---- Processing ---- */}
      {phase === "processing" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 sm:p-14 text-center"
        >
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl accent-gradient flex items-center justify-center">
              <Brain size={36} className="text-white" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl accent-gradient"
              animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ filter: "blur(16px)" }}
            />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">{t.audit.processing}</h3>
          <p className="text-text-muted text-sm mb-6">{t.audit.processingDesc}</p>
          <Loader2 size={24} className="text-accent animate-spin mx-auto" />
        </motion.div>
      )}

      {/* ---- Results ---- */}
      {phase === "results" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Summary card */}
          <div className="glass-panel p-6 sm:p-8 border-accent/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-accent" />
              <p className="text-accent text-xs font-semibold uppercase tracking-wider">
                {t.audit.resultBadge}
              </p>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">{auditSummary}</p>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-bold text-text-primary mb-4">{t.audit.recommendations}</h3>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <motion.div
                  key={rec.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-5 hover-glow"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                        rec.priority === "high"
                          ? "bg-red-400"
                          : rec.priority === "medium"
                            ? "bg-amber-400"
                            : "bg-green-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-text-primary text-sm font-semibold mb-1">{rec.title}</p>
                      <p className="text-text-muted text-xs leading-relaxed mb-2">{rec.description}</p>
                      <p className="text-accent text-xs font-medium">{rec.impact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={() => setPhase("capture")}
            className="w-full accent-gradient text-white"
            size="lg"
          >
            {t.audit.getPlan} <ArrowRight size={16} className="ml-1" />
          </Button>
        </motion.div>
      )}

      {/* ---- Lead capture ---- */}
      {phase === "capture" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 sm:p-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-text-primary mb-2">
              {t.audit.captureTitle}
            </h3>
            <p className="text-text-muted text-sm">
              {t.audit.captureDesc}
            </p>
          </div>

          <div className="space-y-4 max-w-sm mx-auto">
            <div>
              <label className="text-text-secondary text-xs mb-1.5 block">{t.audit.nameLabel}</label>
              <Input
                value={leadForm.name}
                onChange={(e) => { setLeadForm((p) => ({ ...p, name: e.target.value })); setFormErrors((p) => ({ ...p, name: "" })) }}
                className="bg-background border-white/5 text-text-primary"
              />
              {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="text-text-secondary text-xs mb-1.5 block">{t.audit.phoneLabel}</label>
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={leadForm.phone}
                onChange={(e) => { setLeadForm((p) => ({ ...p, phone: e.target.value })); setFormErrors((p) => ({ ...p, phone: "" })) }}
                className="bg-background border-white/5 text-text-primary placeholder:text-text-muted"
              />
              {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
            </div>
            <div>
              <label className="text-text-secondary text-xs mb-1.5 block">{t.audit.emailLabel}</label>
              <Input
                type="email"
                value={leadForm.email}
                onChange={(e) => setLeadForm((p) => ({ ...p, email: e.target.value }))}
                className="bg-background border-white/5 text-text-primary"
              />
            </div>
            <div>
              <label className="text-text-secondary text-xs mb-1.5 block">{t.audit.businessLabel}</label>
              <Input
                value={leadForm.business}
                onChange={(e) => setLeadForm((p) => ({ ...p, business: e.target.value }))}
                className="bg-background border-white/5 text-text-primary"
              />
            </div>

            <Button onClick={handleSubmit} disabled={submitting} className="w-full accent-gradient text-white" size="lg">
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <>{t.audit.send} <Send size={14} className="ml-1" /></>}
            </Button>
            <p className="text-center text-text-muted text-xs">{t.audit.responseTime}</p>
          </div>
        </motion.div>
      )}

      {/* ---- Done ---- */}
      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 sm:p-14 text-center"
        >
          <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">{t.audit.doneTitle}</h3>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            {t.audit.doneDesc}
          </p>
        </motion.div>
      )}
    </div>
  )
}
