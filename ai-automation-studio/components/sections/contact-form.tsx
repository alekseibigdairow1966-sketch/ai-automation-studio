"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MotionWrapper } from "@/components/motion-wrapper"

export function ContactFormSection() {
  const [status, setStatus] = useState<"idle" | "success">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get("name") as string
    const phone = form.get("phone") as string
    const newErrors: Record<string, string> = {}
    if (!name || name.length < 2) newErrors.name = "Введите имя"
    if (!phone || !/^\+?[\d\s\-()]{7,20}$/.test(phone)) newErrors.phone = "Введите корректный номер"
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setErrors({})
    setStatus("success")
  }

  if (status === "success") {
    return (
      <section className="py-24 px-4 sm:px-6" id="contact-form">
        <MotionWrapper className="max-w-lg mx-auto text-center py-16">
          <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">Заявка отправлена!</h3>
          <p className="text-text-muted text-sm">Ответим в течение 2 часов в рабочее время</p>
        </MotionWrapper>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 sm:px-6" id="contact-form">
      <div className="max-w-lg mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Контакты</p>
          <h2 className="text-3xl font-bold text-text-primary mb-3">Оставить заявку</h2>
          <p className="text-text-muted text-sm">Расскажите о задаче — подберём решение</p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 space-y-4">
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-text-secondary text-xs mb-1.5 block">Имя *</label>
                <Input name="name" className="bg-background border-white/[0.06] text-text-primary" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-text-secondary text-xs mb-1.5 block">Телефон *</label>
                <Input name="phone" type="tel" placeholder="+7 (___) ___-__-__" className="bg-background border-white/[0.06] text-text-primary placeholder:text-text-muted" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="text-text-secondary text-xs mb-1.5 block">Бизнес</label>
              <Input name="business" placeholder="Сфера и масштаб" className="bg-background border-white/[0.06] text-text-primary placeholder:text-text-muted" />
            </div>

            <div>
              <label className="text-text-secondary text-xs mb-1.5 block">Сообщение</label>
              <Textarea name="message" rows={3} placeholder="Опишите задачу или вопрос..." className="resize-none bg-background border-white/[0.06] text-text-primary placeholder:text-text-muted" />
            </div>

            <Button type="submit" className="w-full accent-gradient text-white font-medium">
              Отправить заявку
            </Button>
            <p className="text-center text-text-muted text-xs">Ответим в течение 2 часов</p>
          </form>
        </MotionWrapper>
      </div>
    </section>
  )
}
