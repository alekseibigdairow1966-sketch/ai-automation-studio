"use client"

import { useLocale } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center rounded-lg border border-white/10 overflow-hidden text-xs">
      <button
        onClick={() => setLocale("ru")}
        className={`px-2.5 py-1.5 font-medium transition-colors ${
          locale === "ru"
            ? "bg-accent/15 text-accent"
            : "text-text-muted hover:text-text-secondary hover:bg-white/[0.04]"
        }`}
      >
        RU
      </button>
      <div className="w-px h-4 bg-white/[0.08]" />
      <button
        onClick={() => setLocale("kk")}
        className={`px-2.5 py-1.5 font-medium transition-colors ${
          locale === "kk"
            ? "bg-accent/15 text-accent"
            : "text-text-muted hover:text-text-secondary hover:bg-white/[0.04]"
        }`}
      >
        KZ
      </button>
    </div>
  )
}
