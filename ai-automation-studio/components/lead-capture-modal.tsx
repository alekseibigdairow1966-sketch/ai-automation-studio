"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, MessageCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LeadCaptureModalProps {
  open: boolean
  onClose: () => void
}

export function LeadCaptureModal({ open, onClose }: LeadCaptureModalProps) {
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [about, setAbout] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: contact,
          business: about,
          source: "contact",
        }),
      })
      setSubmitted(true)
    } catch {
      // silently handle
    }
    setLoading(false)
  }

  const handleClose = () => {
    onClose()
    // Reset form after animation
    setTimeout(() => {
      setName("")
      setContact("")
      setAbout("")
      setSubmitted(false)
    }, 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-[#0a0a12] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-text-muted hover:text-text-primary transition-colors z-10"
              >
                <X size={14} />
              </button>

              {submitted ? (
                <div className="px-8 py-14 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-text-primary text-lg font-semibold mb-2">
                    Заявка отправлена
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Мы свяжемся с вами в течение 2 часов
                  </p>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="mt-6 border-white/10 text-text-secondary text-sm"
                  >
                    Закрыть
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8">
                  <h3 className="text-text-primary text-lg font-semibold mb-1.5 pr-8">
                    Обсудим автоматизацию вашего сервиса
                  </h3>
                  <p className="text-text-muted text-sm mb-7 leading-relaxed">
                    Покажем, какие процессы можно автоматизировать и где сервис теряет заявки и время.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-text-secondary text-xs mb-1.5 block">Имя</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Как к вам обращаться"
                        className="bg-white/[0.03] border-white/[0.06] text-text-primary text-sm placeholder:text-text-muted/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-text-secondary text-xs mb-1.5 block">
                        WhatsApp / Telegram
                      </label>
                      <Input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="bg-white/[0.03] border-white/[0.06] text-text-primary text-sm placeholder:text-text-muted/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-text-secondary text-xs mb-1.5 block">
                        Коротко о сервисе
                      </label>
                      <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Например: ремонт телефонов, 30 заявок в день"
                        rows={2}
                        className="w-full rounded-md bg-white/[0.03] border border-white/[0.06] text-text-primary text-sm px-3 py-2 placeholder:text-text-muted/40 focus:outline-none focus:ring-1 focus:ring-accent/50 resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-7 space-y-3">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full accent-gradient text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <Send size={14} className="mr-2" />
                          Получить аудит процессов
                        </>
                      )}
                    </Button>
                    <a
                      href="https://t.me/servicelayer_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-white/[0.02]"
                    >
                      <MessageCircle size={14} />
                      Написать в Telegram
                    </a>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
