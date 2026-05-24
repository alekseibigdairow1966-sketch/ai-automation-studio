"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/motion-wrapper"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <MotionWrapper>
        <div className="max-w-4xl mx-auto accent-gradient rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Готовы автоматизировать бизнес?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Расскажите о вашем бизнесе — подберём решение и посчитаем ROI
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-accent font-medium px-8 hover:bg-white/90 transition-colors">
                Обсудить проект
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </MotionWrapper>
    </section>
  )
}
