import Link from "next/link"
import { readStore } from "@/lib/content-store"
import { CONTACTS } from "@/data/contacts"
import { getServerLocale, getTranslations } from "@/lib/i18n-server"

const SERVICE_LINKS = [
  { href: "/services", label: "AI Receptionist" },
  { href: "/services", label: "WhatsApp AI" },
  { href: "/services", label: "CRM Automation" },
  { href: "/services", label: "n8n Workflows" },
]

const COMPANY_LINKS_RU = [
  { href: "/cases", label: "Кейсы" },
  { href: "/audit", label: "AI-аудит" },
  { href: "/calculator", label: "ROI-калькулятор" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакты" },
]

const COMPANY_LINKS_KK = [
  { href: "/cases", label: "Кейстер" },
  { href: "/audit", label: "AI-аудит" },
  { href: "/calculator", label: "ROI-калькулятор" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Байланыс" },
]

export async function Footer() {
  const c = await readStore("contacts", CONTACTS)
  const locale = await getServerLocale()
  const t = getTranslations(locale)

  return (
    <footer className="border-t border-white/10 mt-24">
      {/* Operational capabilities bar */}
      <div className="border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            { label: "SLA Monitoring", status: "active" },
            { label: "Queue Coordination", status: "active" },
            { label: "Multi-channel Intake", status: "active" },
            { label: "Repair Lifecycle Tracking", status: "active" },
          ].map((cap) => (
            <span key={cap.label} className="flex items-center gap-2 text-text-muted/80 text-[10px]">
              <span className="w-1 h-1 rounded-full bg-emerald-500/60" />
              {cap.label}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg accent-gradient flex items-center justify-center text-white text-[10px] font-bold">
              SL
            </div>
            <span className="font-semibold text-text-primary text-sm">
              ServiceLayer
            </span>
          </div>
          <p className="text-text-muted text-xs leading-relaxed max-w-xs mb-3">
            {c.description}
          </p>
          <div className="space-y-1 text-text-muted text-xs">
            <p>{c.address.full}</p>
            <p>
              <a
                href={`mailto:${c.email}`}
                className="hover:text-text-secondary transition-colors"
              >
                {c.email}
              </a>
            </p>
            <p>{c.workingHours.short}</p>
          </div>
        </div>

        <div>
          <p className="text-text-primary font-medium mb-4 text-xs uppercase tracking-wider">
            {t.footer.services}
          </p>
          <div className="space-y-2">
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-text-muted text-xs hover:text-text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-text-primary font-medium mb-4 text-xs uppercase tracking-wider">
            {t.footer.company}
          </p>
          <div className="space-y-2">
            {(locale === "kk" ? COMPANY_LINKS_KK : COMPANY_LINKS_RU).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-text-muted text-xs hover:text-text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} ServiceLayer</span>
          <div className="flex gap-4">
            {c.phones[0] && (
              <a
                href={`tel:${c.phones[0].raw}`}
                className="hover:text-text-secondary transition-colors"
              >
                {c.phones[0].display}
              </a>
            )}
            <a
              href={c.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-secondary transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={c.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-secondary transition-colors"
            >
              Telegram
            </a>
            <a
              href={c.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-secondary transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
