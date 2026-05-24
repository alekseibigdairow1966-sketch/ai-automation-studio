"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/motion-wrapper"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <MotionWrapper>
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden animate-gradient-shift"
          style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED, #8B5CF6, #6366F1)", backgroundSize: "200% 200%" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Готовы к операционной автоматизации?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Расскажите о вашем сервисном центре — проведём аудит процессов и покажем, где AI сократит хаос
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
