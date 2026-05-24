import Link from "next/link"

const SERVICE_LINKS = [
  { href: "/services", label: "AI Receptionist" },
  { href: "/services", label: "WhatsApp AI" },
  { href: "/services", label: "CRM Automation" },
  { href: "/services", label: "n8n Workflows" },
]

const COMPANY_LINKS = [
  { href: "/cases", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакты" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg accent-gradient flex items-center justify-center text-white text-[10px] font-bold">
              AI
            </div>
            <span className="font-semibold text-text-primary text-sm">AIAutomation Studio</span>
          </div>
          <p className="text-text-muted text-xs leading-relaxed max-w-xs">
            Строим AI-инфраструктуру для бизнеса. WhatsApp AI, CRM-автоматизация, AI-ресепшн, n8n workflows.
          </p>
        </div>

        <div>
          <p className="text-text-primary font-medium mb-4 text-xs uppercase tracking-wider">Услуги</p>
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
          <p className="text-text-primary font-medium mb-4 text-xs uppercase tracking-wider">Компания</p>
          <div className="space-y-2">
            {COMPANY_LINKS.map((link) => (
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

      <div className="border-t border-white/[0.06] px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} AIAutomation Studio</span>
          <div className="flex gap-4">
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary transition-colors">Telegram</a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
