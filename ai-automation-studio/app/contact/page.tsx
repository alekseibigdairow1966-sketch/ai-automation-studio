import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { ContactFormSection } from "@/components/sections/contact-form"

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с AIAutomation Studio — обсудим задачу AI-автоматизации вашего бизнеса. Ответим в течение 2 часов.",
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@aiautomation.studio", href: "mailto:hello@aiautomation.studio" },
  { icon: Phone, label: "Телефон", value: "+7 (XXX) XXX-XX-XX", href: "tel:+7XXXXXXXXXX" },
  { icon: Clock, label: "Время ответа", value: "В течение 2 часов", href: null },
  { icon: MapPin, label: "Формат", value: "Удалённо, по всему СНГ", href: null },
]

const socialLinks = [
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/" },
  { icon: Send, label: "Telegram", href: "https://t.me/" },
]

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Контакты</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Обсудить проект</h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Расскажите о задаче — подберём решение и посчитаем ROI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
        {/* Left: Form */}
        <div className="lg:col-span-3">
          <ContactFormSection />
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-text-primary font-semibold mb-5">Контактная информация</h2>
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs">{item.label}</p>
                      <p className="text-text-primary text-sm">{item.value}</p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity">{content}</a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-text-primary font-semibold mb-4">Мессенджеры</h2>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 glass-panel hover-glow p-4 text-center"
                  >
                    <Icon size={20} className="text-accent mx-auto mb-2" />
                    <p className="text-text-secondary text-xs">{link.label}</p>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="glass-panel p-6">
            <p className="text-text-primary text-sm font-medium mb-2">Как мы работаем</p>
            <ol className="space-y-2 text-text-muted text-xs">
              <li className="flex gap-2"><span className="text-accent font-medium">1.</span> Вы описываете задачу</li>
              <li className="flex gap-2"><span className="text-accent font-medium">2.</span> Мы проводим аудит и предлагаем решение</li>
              <li className="flex gap-2"><span className="text-accent font-medium">3.</span> Согласовываем архитектуру и сроки</li>
              <li className="flex gap-2"><span className="text-accent font-medium">4.</span> Внедряем и запускаем за 2-3 недели</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
