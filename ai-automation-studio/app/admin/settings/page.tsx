"use client"

import { useState, useEffect } from "react"
import {
  Settings,
  CheckCircle2,
  XCircle,
  Loader2,
  Send,
  Database,
  Webhook,
  Globe,
  Shield,
} from "lucide-react"

interface SettingsData {
  integrations: {
    supabase: { configured: boolean; url: string | null }
    telegram: { configured: boolean; chatId: string | null }
    n8n: { configured: boolean }
  }
  siteUrl: string
}

export default function SettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null)
  const [testing, setTesting] = useState("")
  const [testResult, setTestResult] = useState("")

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setData)
  }, [])

  const testTelegram = async () => {
    setTesting("telegram")
    setTestResult("")
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Тест из админ-панели",
          phone: "+7 000 000 0000",
          source: "contact",
        }),
      })
      if (res.ok) {
        setTestResult("Тестовое сообщение отправлено!")
      } else {
        setTestResult("Ошибка отправки")
      }
    } catch {
      setTestResult("Ошибка сети")
    }
    setTesting("")
    setTimeout(() => setTestResult(""), 5000)
  }

  if (!data) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    )
  }

  const integrations = [
    {
      icon: Send,
      name: "Telegram",
      description: "Уведомления о новых заявках в Telegram",
      configured: data.integrations.telegram.configured,
      detail: data.integrations.telegram.chatId
        ? `Chat ID: ${data.integrations.telegram.chatId}`
        : null,
      action: data.integrations.telegram.configured ? (
        <button
          onClick={testTelegram}
          disabled={testing === "telegram"}
          className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
        >
          {testing === "telegram" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            "Тест"
          )}
        </button>
      ) : null,
      envVars: ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"],
    },
    {
      icon: Database,
      name: "Supabase",
      description: "Облачная база данных для заявок",
      configured: data.integrations.supabase.configured,
      detail: data.integrations.supabase.url,
      envVars: ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
    },
    {
      icon: Webhook,
      name: "n8n",
      description: "Вебхук для автоматизации воронки",
      configured: data.integrations.n8n.configured,
      envVars: ["N8N_WEBHOOK_URL"],
    },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Settings size={24} className="text-accent" />
        <h1 className="text-2xl font-bold text-text-primary">Настройки</h1>
      </div>

      {/* Site URL */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Globe size={18} className="text-accent" />
          <h2 className="text-text-primary font-semibold">Сайт</h2>
        </div>
        <p className="text-text-secondary text-sm">{data.siteUrl}</p>
        <p className="text-text-muted text-xs mt-1">
          Настраивается через{" "}
          <code className="text-accent/70">NEXT_PUBLIC_SITE_URL</code> в{" "}
          <code className="text-accent/70">.env.local</code>
        </p>
      </div>

      {/* Test result */}
      {testResult && (
        <div className="glass-panel p-4 mb-6 border-accent/20 text-accent text-sm">
          {testResult}
        </div>
      )}

      {/* Integrations */}
      <h2 className="text-text-primary font-semibold mb-4">Интеграции</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {integrations.map((int) => (
          <div key={int.name} className="glass-panel p-6">
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  int.configured ? "bg-green-400/10" : "bg-white/[0.04]"
                }`}
              >
                <int.icon
                  size={20}
                  className={
                    int.configured ? "text-green-400" : "text-text-muted"
                  }
                />
              </div>
              <div className="min-w-0">
                <p className="text-text-primary font-medium text-sm">
                  {int.name}
                </p>
                <p className="text-text-muted text-xs">{int.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {int.configured ? (
                  <>
                    <CheckCircle2 size={14} className="text-green-400" />
                    <span className="text-green-400 text-xs">Подключено</span>
                  </>
                ) : (
                  <>
                    <XCircle size={14} className="text-text-muted" />
                    <span className="text-text-muted text-xs">
                      Не настроено
                    </span>
                  </>
                )}
              </div>
              {int.action}
            </div>
            {int.detail && (
              <p className="text-text-muted text-xs mt-2 truncate">
                {int.detail}
              </p>
            )}
            {!int.configured && (
              <div className="mt-3 p-2 bg-white/[0.02] rounded text-text-muted text-xs space-y-0.5">
                <span>Добавьте в .env.local:</span>
                {int.envVars.map((v) => (
                  <code key={v} className="block text-accent/70">
                    {v}=...
                  </code>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={18} className="text-accent" />
          <h2 className="text-text-primary font-semibold">Безопасность</h2>
        </div>
        <p className="text-text-muted text-sm leading-relaxed">
          Пароль админ-панели настраивается через переменную{" "}
          <code className="text-accent/70">ADMIN_PASSWORD</code> в файле{" "}
          <code className="text-accent/70">.env.local</code>. После изменения
          перезапустите dev-сервер.
        </p>
      </div>
    </div>
  )
}
