export interface ConsultantStep {
  id: string
  message: string
  type: "greeting" | "select" | "multi"
  field?: string
  options?: { label: string; value: string }[]
}

export interface Recommendation {
  title: string
  description: string
  impact: string
  priority: "high" | "medium" | "low"
}

export const CONSULTANT_STEPS: ConsultantStep[] = [
  {
    id: "greeting",
    message:
      "Здравствуйте! Я AI-консультант AIAutomation Studio. Проведу экспресс-аудит вашего бизнеса и покажу, какие процессы можно автоматизировать. Это займёт 2 минуты.",
    type: "greeting",
  },
  {
    id: "business_type",
    message: "Какой у вас тип бизнеса?",
    type: "select",
    field: "Тип бизнеса",
    options: [
      { label: "Сервисный центр", value: "service_center" },
      { label: "Клиника / Медцентр", value: "clinic" },
      { label: "Ресторан / Кафе", value: "restaurant" },
      { label: "E-commerce", value: "ecommerce" },
      { label: "Другое", value: "other" },
    ],
  },
  {
    id: "daily_requests",
    message: "Сколько заявок вы получаете в день?",
    type: "select",
    field: "Заявок в день",
    options: [
      { label: "До 10", value: "1-10" },
      { label: "10–30", value: "10-30" },
      { label: "30–100", value: "30-100" },
      { label: "100+", value: "100+" },
    ],
  },
  {
    id: "channels",
    message: "Через какие каналы общаетесь с клиентами?",
    type: "multi",
    field: "Каналы",
    options: [
      { label: "WhatsApp", value: "whatsapp" },
      { label: "Telegram", value: "telegram" },
      { label: "Телефон", value: "phone" },
      { label: "Email", value: "email" },
      { label: "Сайт / Форма", value: "website" },
    ],
  },
  {
    id: "crm",
    message: "Используете ли вы CRM-систему?",
    type: "select",
    field: "CRM",
    options: [
      { label: "Да, активно", value: "active" },
      { label: "Есть, но не ведём", value: "inactive" },
      { label: "Нет", value: "none" },
      { label: "Используем таблицы", value: "spreadsheet" },
    ],
  },
  {
    id: "status_updates",
    message: "Как клиенты узнают о статусе заявки?",
    type: "select",
    field: "Уведомления",
    options: [
      { label: "Звонят сами", value: "client_calls" },
      { label: "Мы звоним / пишем вручную", value: "manual" },
      { label: "Автоматические уведомления", value: "auto" },
      { label: "Никак", value: "none" },
    ],
  },
  {
    id: "team_size",
    message: "Сколько менеджеров обрабатывают заявки?",
    type: "select",
    field: "Менеджеров",
    options: [
      { label: "1 человек", value: "1" },
      { label: "2–3", value: "2-3" },
      { label: "4–10", value: "4-10" },
      { label: "10+", value: "10+" },
    ],
  },
  {
    id: "problems",
    message: "Какие операционные проблемы вас беспокоят больше всего?",
    type: "multi",
    field: "Проблемы",
    options: [
      { label: "Теряются заявки", value: "lost_requests" },
      { label: "Медленные ответы клиентам", value: "slow_response" },
      { label: "Нет контроля над мастерами", value: "no_control" },
      { label: "Ручная рутина отнимает время", value: "manual_routine" },
      { label: "Нет аналитики", value: "no_analytics" },
      { label: "Хаос в коммуникации", value: "comm_chaos" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Recommendation engine                                             */
/* ------------------------------------------------------------------ */

export function generateRecommendations(
  answers: Record<string, string | string[]>,
): Recommendation[] {
  const recs: Recommendation[] = []
  const problems = (answers["Проблемы"] as string[] | undefined) ?? []
  const crm = (answers["CRM"] as string) ?? ""
  const channels = (answers["Каналы"] as string[] | undefined) ?? []
  const statusUpdates = (answers["Уведомления"] as string) ?? ""
  const dailyRequests = (answers["Заявок в день"] as string) ?? ""

  if (channels.length > 1) {
    recs.push({
      title: "Омниканальный AI-хаб",
      description: `Вы используете ${channels.length} каналов связи. Объединение в единую AI-систему устранит потерю заявок и ускорит обработку.`,
      impact: "Сокращение времени обработки на 70%",
      priority: "high",
    })
  }

  if (crm === "none" || crm === "spreadsheet" || crm === "inactive") {
    recs.push({
      title: "AI CRM-система",
      description:
        "Автоматическая фиксация заявок, статусов и истории клиентов. Интеграция с мессенджерами и телефонией.",
      impact: "0 потерянных заявок, полная история клиента",
      priority: "high",
    })
  }

  if (statusUpdates !== "auto") {
    recs.push({
      title: "Автоматические уведомления",
      description:
        "AI-система уведомляет клиентов о каждом этапе: приём, диагностика, ремонт, готовность.",
      impact: "Снижение входящих звонков на 60%",
      priority: "high",
    })
  }

  if (problems.includes("lost_requests") || problems.includes("slow_response")) {
    recs.push({
      title: "AI-ресепшн 24/7",
      description:
        "Автоматический приём заявок через WhatsApp, Telegram и сайт. Мгновенная классификация и маршрутизация.",
      impact: "Время ответа: 30 сек вместо 15 мин",
      priority: "high",
    })
  }

  if (problems.includes("no_control") || problems.includes("no_analytics")) {
    recs.push({
      title: "Операционный dashboard",
      description:
        "Real-time контроль: загрузка мастеров, скорость обработки, NPS. AI-аналитика и прогнозы.",
      impact: "Контроль за 5 минут вместо 2 часов",
      priority: "medium",
    })
  }

  if (problems.includes("manual_routine")) {
    recs.push({
      title: "n8n-автоматизация процессов",
      description:
        "Автоматизация рутины: назначение мастеров, отправка счетов, генерация отчётов, follow-up.",
      impact: "Экономия 15+ часов в неделю",
      priority: "medium",
    })
  }

  if (dailyRequests === "30-100" || dailyRequests === "100+") {
    recs.push({
      title: "AI-маршрутизация заявок",
      description:
        "Интеллектуальное распределение по мастерам на основе загрузки, специализации и приоритета.",
      impact: "Равномерная загрузка, -40% очереди",
      priority: "medium",
    })
  }

  if (recs.length < 3) {
    recs.push({
      title: "Комплексная AI-инфраструктура",
      description:
        "Полный стек автоматизации под ваши процессы: от приёма заявок до аналитики и контроля.",
      impact: "Повышение эффективности на 40–60%",
      priority: "medium",
    })
  }

  return recs.slice(0, 5)
}

/* ------------------------------------------------------------------ */
/*  Audit summary generator                                           */
/* ------------------------------------------------------------------ */

const BUSINESS_NAMES: Record<string, string> = {
  service_center: "сервисного центра",
  clinic: "клиники",
  restaurant: "ресторана",
  ecommerce: "e-commerce бизнеса",
  other: "вашего бизнеса",
}

export function generateAuditSummary(
  answers: Record<string, string | string[]>,
): string {
  const biz = (answers["Тип бизнеса"] as string) ?? "other"
  const requests = (answers["Заявок в день"] as string) ?? ""
  const problems = (answers["Проблемы"] as string[] | undefined) ?? []
  const bName = BUSINESS_NAMES[biz] ?? "вашего бизнеса"

  let s = `На основе анализа ${bName}`
  if (requests) s += ` с объёмом ${requests} заявок/день`
  s += `, мы выявили ${problems.length || "несколько"} ключевых точек для автоматизации.`
  s += ` Внедрение AI-системы позволит сократить операционные издержки и повысить скорость обработки заявок.`
  return s
}
