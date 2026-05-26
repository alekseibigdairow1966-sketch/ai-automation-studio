"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLocale } from "@/lib/i18n"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLocale()

  const NAV_LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/cases", label: t.nav.cases },
    { href: "/services", label: t.nav.services },
    { href: "/audit", label: t.nav.audit },
    { href: "/calculator", label: t.nav.roi },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/[0.06]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-white text-xs font-bold tracking-tight">
              SL
            </div>
            <span className="font-semibold text-text-primary text-sm hidden sm:block">
              ServiceLayer
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/admin"
              className="text-text-muted hover:text-accent transition-colors duration-200"
              title="Админ-панель"
            >
              <Settings size={18} />
            </Link>
            <Link href="/contact">
              <Button size="sm" className="accent-gradient text-white text-xs font-medium hidden sm:flex hover:opacity-90 transition-opacity">
                {t.nav.discuss}
              </Button>
            </Link>
            <button
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} discussLabel={t.nav.discuss} />
    </>
  )
}
