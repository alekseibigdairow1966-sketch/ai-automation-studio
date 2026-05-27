"use client"

import { StaggerContainer, StaggerItem, MotionWrapper } from "@/components/motion-wrapper"

const technologies = [
  { name: "Next.js", color: "#000000" },
  { name: "n8n", color: "#EA4B71" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "OpenAI", color: "#412991" },
  { name: "WhatsApp API", color: "#25D366" },
  { name: "Telegram", color: "#26A5E4" },
  { name: "Make", color: "#6D00CC" },
  { name: "Vercel", color: "#000000" },
]

export function TechStack() {
  return (
    <section className="py-14 md:py-16 px-6 lg:px-8 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">Стек</p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary">
            Технологии, которые мы используем
          </h2>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="glass-panel hover-glow p-5 text-center group cursor-default">
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: tech.color + "20", border: `1px solid ${tech.color}30` }}
                >
                  {tech.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-text-secondary text-sm font-medium">{tech.name}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
