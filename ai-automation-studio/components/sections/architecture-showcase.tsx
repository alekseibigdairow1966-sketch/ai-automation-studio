"use client"

import { MotionWrapper } from "@/components/motion-wrapper"
import { motion } from "framer-motion"

const nodes = [
  { id: "user", label: "Клиент", x: 5, y: 45, icon: "\u{1F464}" },
  { id: "whatsapp", label: "WhatsApp", x: 22, y: 45, icon: "\u{1F4AC}" },
  { id: "ai", label: "AI Router", x: 42, y: 45, icon: "\u{1F916}" },
  { id: "crm", label: "CRM", x: 65, y: 20, icon: "\u{1F4CA}" },
  { id: "n8n", label: "n8n", x: 65, y: 45, icon: "\u{26A1}" },
  { id: "notify", label: "Уведомления", x: 65, y: 70, icon: "\u{1F514}" },
  { id: "dashboard", label: "Dashboard", x: 85, y: 45, icon: "\u{1F4C8}" },
]

const edges = [
  { from: "user", to: "whatsapp" },
  { from: "whatsapp", to: "ai" },
  { from: "ai", to: "crm" },
  { from: "ai", to: "n8n" },
  { from: "ai", to: "notify" },
  { from: "crm", to: "dashboard" },
  { from: "n8n", to: "dashboard" },
]

export function ArchitectureShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Архитектура</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Как выглядит типичная AI-автоматизация
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            От обращения клиента до автоматической обработки — без участия оператора
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="glass-panel p-8 sm:p-12 overflow-x-auto">
            <svg viewBox="0 0 100 90" className="w-full max-w-3xl mx-auto" style={{ minWidth: 500 }}>
              {/* Edges */}
              {edges.map((edge, i) => {
                const fromNode = nodes.find((n) => n.id === edge.from)!
                const toNode = nodes.find((n) => n.id === edge.to)!
                return (
                  <motion.line
                    key={i}
                    x1={fromNode.x + 6}
                    y1={fromNode.y + 5}
                    x2={toNode.x}
                    y2={toNode.y + 5}
                    stroke="rgba(99,102,241,0.3)"
                    strokeWidth="0.3"
                    strokeDasharray="1 0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                  />
                )
              })}

              {/* Nodes */}
              {nodes.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width="12"
                    height="10"
                    rx="1.5"
                    fill="#18181B"
                    stroke="rgba(99,102,241,0.2)"
                    strokeWidth="0.2"
                  />
                  <text x={node.x + 6} y={node.y + 4.5} textAnchor="middle" fontSize="3.5">
                    {node.icon}
                  </text>
                  <text
                    x={node.x + 6}
                    y={node.y + 8}
                    textAnchor="middle"
                    fontSize="1.6"
                    fill="#A1A1AA"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
