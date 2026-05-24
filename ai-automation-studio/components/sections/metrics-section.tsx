"use client"

import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const metrics = [
  { value: "80%", label: "сокращение времени ответа", desc: "AI отвечает за секунды, не минуты" },
  { value: "3x", label: "рост конверсии", desc: "Ни одно обращение не потеряно" },
  { value: "24/7", label: "работа без перерывов", desc: "AI не спит и не уходит в отпуск" },
  { value: "2 нед", label: "срок внедрения", desc: "От аудита до запуска" },
]

export function MetricsSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <StaggerItem key={m.label}>
              <div className="glass-panel p-6 text-center hover-glow">
                <p className="text-3xl sm:text-4xl font-bold accent-gradient-text mb-2">{m.value}</p>
                <p className="text-text-primary text-sm font-medium mb-1">{m.label}</p>
                <p className="text-text-muted text-xs">{m.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
