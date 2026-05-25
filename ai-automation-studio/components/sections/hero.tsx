"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/i18n"

export interface HeroContent {
  badge: string
  title: string
  titleAccent: string
  subtitle: string
  stats: { value: string; label: string }[]
}

export function Hero({ content }: { content?: HeroContent }) {
  const { t } = useLocale()

  const c = content ?? {
    badge: t.hero.badge,
    title: t.hero.title,
    titleAccent: t.hero.titleAccent,
    subtitle: t.hero.subtitle,
    stats: t.hero.stats as unknown as { value: string; label: string }[],
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background — animated drift */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-drift-1" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-end/15 rounded-full blur-[120px] animate-drift-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-pulse-ambient" />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 hero-grid opacity-[0.04]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-accent font-medium tracking-wide">
                {c.badge}
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              {c.title}{" "}
              <span className="accent-gradient-text">{c.titleAccent}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed lg:mx-0 mx-auto">
              {c.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-16">
              <Link href="/cases">
                <Button
                  size="lg"
                  className="accent-gradient text-white font-medium px-8 hover:opacity-90 transition-opacity"
                >
                  {t.hero.cta1}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10 text-text-primary hover:bg-white/5 px-8"
                >
                  {t.hero.cta2}
                </Button>
              </Link>
            </div>

            {/* Stats — staggered blur reveal */}
            <div className="flex justify-center lg:justify-start gap-8 sm:gap-12">
              {c.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.15,
                    ease: "easeOut",
                  }}
                >
                  <p className="text-3xl sm:text-4xl font-bold accent-gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-text-muted text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Avatar */}
          <motion.div
            className="relative shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* Glow behind avatar */}
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-[60px] scale-110" />
            <div className="absolute inset-0 rounded-full bg-accent-end/10 blur-[80px] scale-125 animate-pulse-ambient" />

            {/* Avatar image */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-accent/30 shadow-[0_0_60px_rgba(99,102,241,0.2)]">
              <Image
                src="/avatar.png"
                alt="AIAutomation Studio — Founder"
                fill
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                className="object-cover"
                priority
              />
            </div>

            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDuration: "25s" }} />
            <div className="absolute -inset-6 rounded-full border border-accent/5" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
