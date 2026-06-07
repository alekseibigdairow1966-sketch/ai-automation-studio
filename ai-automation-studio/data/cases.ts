import type { CaseStudy } from "@/types/database"

export const cases: CaseStudy[] = [
  {
    id: "4",
    title: "CRM-автоматизация для сервисного центра",
    slug: "crm-automation-service-center",
    description: "Полная автоматизация воронки заявок: от приёма до завершения ремонта с автоуведомлениями на каждом этапе.",
    industry: "Сервисные центры",
    level: "ADVANCED",
    problem: "Сервисный центр по ремонту техники вёл учёт заявок в Google Sheets. Мастера забывали обновлять статусы, клиенты звонили по 3-4 раза узнать готовность, 10% заявок терялись. Директор тратил 2 часа ежедневно на ручной контроль.",
    inefficiencies: "Google Sheets вместо CRM — заявки терялись между вкладками. Ручное обновление статусов — мастера забывали. Нет автоуведомлений — клиенты звонили сами. Потеря 10% заявок. Директор тратил 2 часа в день на обзвон мастеров для контроля.",
    solution: "Построили операционную CRM на Supabase + n8n. Заявки поступают автоматически из WhatsApp, Telegram и формы на сайте. AI классифицирует тип ремонта и назначает мастера по специализации. Статусы обновляются мастерами в один клик через Telegram-бот. Клиент автоматически получает уведомления на каждом этапе: принято → диагностика → ремонт → готово. Директор видит real-time dashboard с загрузкой мастеров, сроками и воронкой заявок.",
    architecture: {
      nodes: [
        { id: "channels", label: "Каналы", icon: "Inbox", x: 50, y: 150 },
        { id: "n8n", label: "n8n Router", icon: "Workflow", x: 200, y: 150 },
        { id: "ai", label: "AI-классификатор", icon: "Bot", x: 350, y: 80 },
        { id: "supabase", label: "Supabase CRM", icon: "Database", x: 350, y: 220 },
        { id: "master", label: "Telegram мастера", icon: "Send", x: 500, y: 80 },
        { id: "client", label: "WhatsApp клиента", icon: "MessageCircle", x: 500, y: 220 },
        { id: "dashboard", label: "Dashboard", icon: "BarChart3", x: 650, y: 150 },
      ],
      edges: [
        { from: "channels", to: "n8n" },
        { from: "n8n", to: "ai", label: "Классификация" },
        { from: "n8n", to: "supabase", label: "Создание заявки" },
        { from: "ai", to: "master", label: "Назначение" },
        { from: "supabase", to: "client", label: "Статус клиенту" },
        { from: "supabase", to: "dashboard", label: "Аналитика" },
      ],
    },
    technologies: ["n8n", "Supabase", "Telegram Bot", "WhatsApp API", "OpenAI"],
    screenshots: [],
    workflow: ["WhatsApp / Telegram", "AI Router", "CRM Supabase", "Telegram мастера", "Dashboard"],
    automatedFeatures: [
      "WhatsApp / Telegram приёмка",
      "AI-классификация обращений",
      "CRM-маршрутизация заявок",
      "Telegram уведомления мастерам",
      "Автостатусы клиентам",
      "Dashboard руководителя",
    ],
    proofMetrics: [
      { value: "3 200+", label: "обращений обработано" },
      { value: "94%", label: "автоуведомлений" },
      { value: "< 1 мин", label: "время ответа" },
    ],
    results: [
      { metric: "Потерянные заявки", before: "10%", after: "< 1% после CRM-автоматизации" },
      { metric: "Время директора на контроль", before: "2 часа/день", after: "15 мин/день после dashboard" },
      { metric: "Уведомления клиентам", before: "Вручную", after: "Автоматически после внедрения" },
      { metric: "Прозрачность процессов", before: "Нет", after: "Real-time dashboard" },
    ],
    published: true,
    created_at: "2026-02-20T10:00:00Z",
  },
]
