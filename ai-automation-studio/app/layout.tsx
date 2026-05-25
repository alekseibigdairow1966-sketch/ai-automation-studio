import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ConsultantWidget } from "@/components/ai-consultant/consultant-widget"
import { LocaleProvider } from "@/lib/i18n"
import type { Locale } from "@/lib/translations"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "AIAutomation Studio — AI-инфраструктура для бизнеса",
    template: "%s | AIAutomation Studio",
  },
  description: "Строим AI-автоматизацию для сервисного бизнеса. WhatsApp AI, CRM-автоматизация, AI-ресепшн, n8n workflows. 30+ проектов, 50+ интеграций.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiautomation.studio"),
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await cookies()
  const locale = (c.get("locale")?.value === "kk" ? "kk" : "ru") as Locale

  return (
    <html lang={locale === "kk" ? "kk" : "ru"} className="dark">
      <body className={inter.className}>
        <LocaleProvider initialLocale={locale}>
          <Header />
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
          <ConsultantWidget />
        </LocaleProvider>
      </body>
    </html>
  )
}
