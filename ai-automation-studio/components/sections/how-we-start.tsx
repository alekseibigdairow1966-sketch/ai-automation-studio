"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

interface Step {
  day: string
  title: string
  desc: string
  guarantee?: boolean
}

const content = {
  ru: {
    badge: "Как начинаем",
    title: "Запуск за 14 дней. С гарантией.",
    cta: "Начать с бесплатного аудита",
    steps: [
      {
        day: "День 0",
        title: "Аудит потерь — бесплатно",
        desc: "Считаем по вашим цифрам, сколько вы теряете и что уберём.",
      },
      {
        day: "Дни 1–7",
        title: "Настройка",
        desc: "Подключаем каналы, собираем AI-сценарии под ваш процесс, интегрируем с CRM.",
      },
      {
        day: "Дни 8–14",
        title: "Запуск и обучение",
        desc: "Система принимает заявки, ваша команда учится работать в новом потоке.",
      },
      {
        day: "День 30",
        title: "Замер результата",
        desc: "Смотрим на цифры. Не увидели результата — вернём деньги.",
        guarantee: true,
      },
    ] as Step[],
  },
  kk: {
    badge: "Қалай бастаймыз",
    title: "14 күнде іске қосу. Кепілдікпен.",
    cta: "Тегін аудиттен бастау",
    steps: [
      {
        day: "0-күн",
        title: "Шығын аудиті — тегін",
        desc: "Сіздің сандарыңыз бойынша қанша жоғалтып жатқаныңызды және нені жоятынымызды есептейміз.",
      },
      {
        day: "1–7-күндер",
        title: "Баптау",
        desc: "Арналарды қосамыз, процесіңізге AI-сценарийлер жинаймыз, CRM-мен интеграциялаймыз.",
      },
      {
        day: "8–14-күндер",
        title: "Іске қосу және оқыту",
        desc: "Жүйе өтінімдерді қабылдайды, командаңыз жаңа ағында жұмыс істеуді үйренеді.",
      },
      {
        day: "30-күн",
        title: "Нәтижені өлшеу",
        desc: "Сандарға қараймыз. Нәтиже көрмесеңіз — ақшаны қайтарамыз.",
        guarantee: true,
      },
    ] as Step[],
  },
} as const

export function HowWeStart() {
  const { locale } = useLocale()
  const c = content[locale] ?? content.ru

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            {c.badge}
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary">
            {c.title}
          </h2>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {c.steps.map((step) => (
            <StaggerItem key={step.day}>
              <div
                className={`relative h-full rounded-2xl p-6 ${
                  step.guarantee
                    ? "border border-emerald-500/30 bg-emerald-500/[0.04]"
                    : "glass-panel"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      step.guarantee
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                        : "bg-accent/10 text-accent border border-accent/20"
                    }`}
                  >
                    {step.day}
                  </span>
                  {step.guarantee && (
                    <ShieldCheck size={16} className="text-emerald-400" />
                  )}
                </div>
                <h3 className="font-semibold text-text-primary text-sm mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <MotionWrapper delay={0.2}>
          <div className="flex justify-center mt-8">
            <Link href="/audit">
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
