import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, AtSign } from "lucide-react"
import { ContactFormSection } from "@/components/sections/contact-form"
import { readStore } from "@/lib/content-store"
import { CONTACTS } from "@/data/contacts"
import { getServerLocale, getTranslations } from "@/lib/i18n-server"

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с AIAutomation Studio — обсудим задачу AI-автоматизации вашего бизнеса. Ответим в течение 2 часов.",
}

export default async function ContactPage() {
  const c = await readStore("contacts", CONTACTS)
  const locale = await getServerLocale()
  const t = getTranslations(locale)

  const contactInfo = [
    ...(c.phones || []).map((p: { display: string; raw: string }, i: number) => ({
      icon: Phone,
      label: `${t.contactPage.phone}${(c.phones?.length ?? 0) > 1 ? ` ${i + 1}` : ""}`,
      value: p.display,
      href: `tel:${p.raw}`,
    })),
    {
      icon: Mail,
      label: "Email",
      value: c.email,
      href: `mailto:${c.email}`,
    },
    {
      icon: MapPin,
      label: t.contactPage.address,
      value: c.address.full,
      href: c.address.mapUrl,
    },
    {
      icon: Clock,
      label: t.contactPage.weekdays,
      value: c.workingHours.weekdays,
      href: null,
    },
    {
      icon: Clock,
      label: t.contactPage.saturday,
      value: c.workingHours.saturday,
      href: null,
    },
  ]

  const socialLinks = [
    { icon: MessageCircle, label: "WhatsApp", href: c.social.whatsapp },
    { icon: Send, label: "Telegram", href: c.social.telegram },
    { icon: AtSign, label: "Instagram", href: c.social.instagram },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
          {t.contactPage.badge}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          {t.contactPage.title}
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          {t.contactPage.subtitle}
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
            <h2 className="text-text-primary font-semibold mb-5">
              {t.contactPage.infoTitle}
            </h2>
            <div className="space-y-4">
              {contactInfo.map((item, idx) => {
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
                  <a
                    key={idx}
                    href={item.href}
                    className="block hover:opacity-80 transition-opacity"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {content}
                  </a>
                ) : (
                  <div key={idx}>{content}</div>
                )
              })}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-text-primary font-semibold mb-4">
              {t.contactPage.messengers}
            </h2>
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
            <p className="text-text-primary text-sm font-medium mb-2">
              {t.contactPage.howWeWork}
            </p>
            <ol className="space-y-2 text-text-muted text-xs">
              {t.contactPage.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent font-medium">{i + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
