"use client"

import { useState } from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MotionWrapper } from "@/components/motion-wrapper"

export function AIConsultantSection() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { role: "user" as const, content: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Спасибо за описание задачи! Я AI-консультант AIAutomation Studio. В текущей версии я работаю в демо-режиме. Для полноценной консультации свяжитесь с нами через форму на странице контактов или напишите в Telegram.",
        },
      ])
    }, 1000)
  }

  return (
    <section className="py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-2xl mx-auto">
        <MotionWrapper className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">AI-консультант</p>
          <h2 className="text-3xl font-bold text-text-primary mb-3">
            Опишите вашу задачу
          </h2>
          <p className="text-text-muted text-sm">AI подберёт подходящее решение автоматизации</p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="glass-panel overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/[0.06]">
              <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div>
                <p className="text-text-primary text-xs font-medium">AI Consultant</p>
                <p className="text-text-muted text-[10px]">AIAutomation Studio</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                  <p className="text-text-muted text-sm text-center max-w-xs">
                    Опишите бизнес-процесс, который хотите автоматизировать
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                    msg.role === "assistant" ? "accent-gradient" : "bg-white/10"
                  }`}>
                    {msg.role === "assistant" ? <Bot size={11} className="text-white" /> : <User size={11} className="text-text-secondary" />}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-tr-none"
                      : "bg-background text-text-primary rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.06] p-3 flex gap-2">
              <Textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
                }}
                placeholder="Например: хочу автоматизировать приём заявок..."
                rows={2}
                className="resize-none bg-background border-white/[0.06] text-text-primary text-sm placeholder:text-text-muted"
              />
              <Button onClick={handleSend} disabled={!input.trim()} className="accent-gradient text-white self-end shrink-0">
                <Send size={14} />
              </Button>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
