"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Phone,
  Settings,
  ExternalLink,
  LogOut,
  Briefcase,
  Layers,
  BookOpen,
} from "lucide-react"
import { useAdmin } from "./admin-shell"

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
  { href: "/admin/leads", icon: Users, label: "Заявки" },
  { href: "/admin/content", icon: FileText, label: "Главная" },
  { href: "/admin/cases", icon: Briefcase, label: "Кейсы" },
  { href: "/admin/services", icon: Layers, label: "Услуги" },
  { href: "/admin/blog", icon: BookOpen, label: "Блог" },
  { href: "/admin/contacts", icon: Phone, label: "Контакты" },
  { href: "/admin/settings", icon: Settings, label: "Настройки" },
]

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()
  const { logout } = useAdmin()

  return (
    <>
      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-white/[0.06] flex flex-col z-50 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-white text-xs font-bold">
              SL
            </div>
            <div>
              <p className="text-text-primary text-sm font-semibold">
                Админ-панель
              </p>
              <p className="text-text-muted text-[10px]">
                ServiceLayer
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-text-muted hover:text-text-secondary hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/[0.06] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-secondary hover:bg-white/[0.04] transition-colors"
          >
            <ExternalLink size={18} />
            Открыть сайт
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <LogOut size={18} />
            Выйти
          </button>
        </div>
      </aside>
    </>
  )
}
