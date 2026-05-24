"use client"

import { motion } from "framer-motion"
import {
  User, MessageCircle, Bot, Database, Calendar, Bell,
  Workflow, Monitor, Send, Package, ShoppingCart,
  MessageSquare, BookOpen, Ticket, Inbox, BarChart3,
} from "lucide-react"

const ICON_MAP: Record<string, React.ElementType> = {
  User, MessageCircle, Bot, Database, Calendar, Bell,
  Workflow, Monitor, Send, Package, ShoppingCart,
  MessageSquare, BookOpen, Ticket, Inbox, BarChart3,
}

interface WorkflowNode {
  id: string
  label: string
  icon: string
  x: number
  y: number
}

interface WorkflowEdge {
  from: string
  to: string
  label?: string
}

interface WorkflowDiagramProps {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export function WorkflowDiagram({ nodes, edges }: WorkflowDiagramProps) {
  // Normalize coordinates to fit within viewBox
  const maxX = Math.max(...nodes.map((n) => n.x))
  const maxY = Math.max(...nodes.map((n) => n.y))

  const viewWidth = 800
  const viewHeight = 400
  const padX = 80
  const padY = 60

  const scaleX = (x: number) => padX + (x / maxX) * (viewWidth - padX * 2)
  const scaleY = (y: number) => padY + (y / maxY) * (viewHeight - padY * 2)

  const getNode = (id: string) => nodes.find((n) => n.id === id)

  return (
    <div className="glass-panel p-4 sm:p-6 md:p-8 overflow-hidden">
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        className="w-full h-auto"
        fill="none"
      >
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = getNode(edge.from)
          const to = getNode(edge.to)
          if (!from || !to) return null

          const x1 = scaleX(from.x)
          const y1 = scaleY(from.y)
          const x2 = scaleX(to.x)
          const y2 = scaleY(to.y)

          const midX = (x1 + x2) / 2
          const midY = (y1 + y2) / 2

          return (
            <g key={`edge-${i}`}>
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#edge-gradient)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              />
              {/* Animated pulse dot */}
              <motion.circle
                r="2.5"
                fill="#6366F1"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true }}
                transition={{
                  duration: 2,
                  delay: 1 + i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <animateMotion
                  dur="2s"
                  begin={`${1 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={`M${x1},${y1} L${x2},${y2}`}
                />
              </motion.circle>
              {/* Edge label */}
              {edge.label && (
                <text
                  x={midX}
                  y={midY - 8}
                  textAnchor="middle"
                  className="fill-text-muted text-[9px]"
                >
                  {edge.label}
                </text>
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const Icon = ICON_MAP[node.icon] ?? Bot
          const cx = scaleX(node.x)
          const cy = scaleY(node.y)

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Node glow */}
              <circle
                cx={cx}
                cy={cy}
                r="28"
                fill="rgba(99, 102, 241, 0.05)"
                stroke="rgba(99, 102, 241, 0.15)"
                strokeWidth="1"
              />
              {/* Node circle */}
              <circle
                cx={cx}
                cy={cy}
                r="20"
                fill="rgba(24, 24, 27, 0.9)"
                stroke="rgba(99, 102, 241, 0.3)"
                strokeWidth="1"
              />
              {/* Icon — foreignObject for lucide */}
              <foreignObject
                x={cx - 10}
                y={cy - 10}
                width="20"
                height="20"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Icon size={14} className="text-accent" />
                </div>
              </foreignObject>
              {/* Label */}
              <text
                x={cx}
                y={cy + 38}
                textAnchor="middle"
                className="fill-text-primary text-[11px] font-medium"
              >
                {node.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
