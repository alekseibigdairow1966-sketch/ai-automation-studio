"use client"

import { PhoneOff, Clock, FileSpreadsheet, EyeOff, UserX, TrendingDown } from "lucide-react"
import { StaggerContainer, StaggerItem, MotionWrapper } from "@/components/motion-wrapper"

const pains = [
  {
    icon: PhoneOff,
    title: "Пропущенные обращения",
    desc: "40% звонков теряются в часы пик. Клиенты уходят к конкурентам, не дождавшись ответа.",
  },
  {
    icon: Clock,
    title: "Медленная реакция",
    desc: "Среднее время ответа — 15 минут. Клиент за это время уже нашёл другой сервис.",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel вместо CRM",
    desc: "Заявки в таблицах, статусы не обновляются, мастера забывают, заявки теряются.",
  },
  {
    icon: EyeOff,
    title: "Нет прозрачности",
    desc: "Директор не видит реальную картину без звонков и ручных проверок каждого мастера.",
  },
  {
    icon: UserX,
    title: "Ручная рутина",
    desc: "Операторы тратят 80% времени на типовые ответы: статус ремонта, стоимость, сроки.",
  },
  {
    icon: TrendingDown,
    title: "Нет аналитики",
    desc: "Невозможно измерить скорость ремонта, загрузку мастеров, NPS и точки потерь.",
  },
]

export function PainPointsSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-red-400/80 text-xs font-medium uppercase tracking-widest mb-3">
            Проблема
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Сервисный бизнес теряет деньги каждый день
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            Пока заявки обрабатываются вручную — вы теряете клиентов, время и контроль
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pains.map((pain) => {
            const Icon = pain.icon
            return (
              <StaggerItem key={pain.title}>
                <div className="glass-panel p-6 h-full group hover-glow">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-red-500/15 group-hover:border-red-500/20 group-hover:shadow-[0_0_16px_rgba(239,68,68,0.1)]">
                    <Icon size={18} className="text-red-400/80" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">{pain.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{pain.desc}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
