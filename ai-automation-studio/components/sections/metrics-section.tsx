"use client"

import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { useLocale } from "@/lib/i18n"

export function MetricsSection() {
  const { t } = useLocale()

  return (
    <section className="py-14 md:py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {t.metrics.map((m, i) => (
            <StaggerItem key={i}>
              <div className="glass-panel p-6 text-center hover-glow group">
                <motion.p
                  className="text-3xl sm:text-4xl font-bold accent-gradient-text mb-2"
                  initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                >
                  {m.value}
                </motion.p>
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
