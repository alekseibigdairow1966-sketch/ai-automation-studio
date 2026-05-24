"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingDown, TrendingUp, ArrowRight, DollarSign, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/motion-wrapper"
import Link from "next/link"

/* ------------------------------------------------------------------ */
/*  Defaults & constants                                               */
/* ------------------------------------------------------------------ */

const MANAGER_HOURLY_RATE = 500 // RUB/hour
const AI_EFFICIENCY_FACTOR = 0.6 // AI saves ~60%
const CONTROL_HOURS_PER_DAY = 2 // hours spent on oversight per manager

interface Inputs {
  requestsPerDay: number
  avgResponseMin: number
  lostPct: number
  managerCount: number
  avgRepairValue: number
}

const DEFAULTS: Inputs = {
  requestsPerDay: 30,
  avgResponseMin: 15,
  lostPct: 10,
  managerCount: 3,
  avgRepairValue: 5000,
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ROICalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS)

  const results = useMemo(() => {
    const monthlyRequests = inputs.requestsPerDay * 30
    const lostRevenue = monthlyRequests * (inputs.lostPct / 100) * inputs.avgRepairValue
    const commTime = monthlyRequests * (inputs.avgResponseMin / 60) * MANAGER_HOURLY_RATE
    const controlOverhead = inputs.managerCount * CONTROL_HOURS_PER_DAY * 30 * MANAGER_HOURLY_RATE
    const totalLosses = lostRevenue + commTime + controlOverhead
    const potentialSavings = Math.round(totalLosses * AI_EFFICIENCY_FACTOR)
    const annualSavings = potentialSavings * 12

    return { lostRevenue, commTime, controlOverhead, totalLosses, potentialSavings, annualSavings }
  }, [inputs])

  const fmt = (n: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n)

  const handleChange = (field: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
            Калькулятор
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Сколько вы теряете без автоматизации?
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto">
            Введите параметры вашего бизнеса — калькулятор покажет операционные потери и потенциал AI-автоматизации
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Inputs */}
          <MotionWrapper delay={0.1}>
            <div className="glass-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Calculator size={18} className="text-accent" />
                <h3 className="text-text-primary font-semibold">Параметры бизнеса</h3>
              </div>

              <SliderInput
                label="Заявок в день"
                value={inputs.requestsPerDay}
                min={5}
                max={200}
                step={5}
                unit=""
                onChange={(v) => handleChange("requestsPerDay", v)}
              />
              <SliderInput
                label="Среднее время ответа"
                value={inputs.avgResponseMin}
                min={1}
                max={60}
                step={1}
                unit="мин"
                onChange={(v) => handleChange("avgResponseMin", v)}
              />
              <SliderInput
                label="Потеря заявок"
                value={inputs.lostPct}
                min={0}
                max={30}
                step={1}
                unit="%"
                onChange={(v) => handleChange("lostPct", v)}
              />
              <SliderInput
                label="Менеджеров"
                value={inputs.managerCount}
                min={1}
                max={20}
                step={1}
                unit=""
                onChange={(v) => handleChange("managerCount", v)}
              />
              <SliderInput
                label="Средний чек ремонта"
                value={inputs.avgRepairValue}
                min={1000}
                max={30000}
                step={500}
                unit="₽"
                onChange={(v) => handleChange("avgRepairValue", v)}
              />
            </div>
          </MotionWrapper>

          {/* Results */}
          <MotionWrapper delay={0.2}>
            <div className="space-y-4">
              {/* Losses breakdown */}
              <div className="glass-panel p-6 border-red-500/10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown size={18} className="text-red-400" />
                  <h3 className="text-text-primary font-semibold text-sm">
                    Ежемесячные потери
                  </h3>
                </div>
                <div className="space-y-3">
                  <ResultRow
                    icon={<DollarSign size={14} />}
                    label="Упущенная выручка"
                    value={fmt(results.lostRevenue)}
                    color="text-red-400"
                  />
                  <ResultRow
                    icon={<Clock size={14} />}
                    label="Время на коммуникацию"
                    value={fmt(results.commTime)}
                    color="text-red-400"
                  />
                  <ResultRow
                    icon={<AlertTriangle size={14} />}
                    label="Контроль и координация"
                    value={fmt(results.controlOverhead)}
                    color="text-red-400"
                  />
                  <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
                    <span className="text-text-primary text-sm font-semibold">Итого потерь / мес</span>
                    <motion.span
                      key={results.totalLosses}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-red-400 text-lg font-bold"
                    >
                      {fmt(results.totalLosses)}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Savings */}
              <div className="glass-panel p-6 border-accent/20">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-accent" />
                  <h3 className="text-text-primary font-semibold text-sm">
                    С AI-автоматизацией
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-sm">Экономия / мес</span>
                    <motion.span
                      key={results.potentialSavings}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-accent text-lg font-bold"
                    >
                      {fmt(results.potentialSavings)}
                    </motion.span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-sm">Экономия / год</span>
                    <motion.span
                      key={results.annualSavings}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="accent-gradient-text text-2xl font-bold"
                    >
                      {fmt(results.annualSavings)}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link href="/audit">
                <Button className="w-full accent-gradient text-white" size="lg">
                  Получить план автоматизации <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-text-secondary text-xs">{label}</span>
        <span className="text-text-primary text-sm font-semibold tabular-nums">
          {value.toLocaleString("ru-RU")} {unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-white/[0.06] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(99,102,241,0.4)]
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${pct}%, rgba(255,255,255,0.06) ${pct}%, rgba(255,255,255,0.06) 100%)`,
          }}
        />
      </div>
    </div>
  )
}

function ResultRow({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={color}>{icon}</span>
        <span className="text-text-muted text-xs">{label}</span>
      </div>
      <span className={`text-sm font-medium ${color}`}>{value}</span>
    </div>
  )
}
