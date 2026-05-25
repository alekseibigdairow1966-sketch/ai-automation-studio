export const CONTACTS = {
  companyName: "ALBI Service Center",
  companyNameRu: "Сервисный центр ALBI",
  description: "Качественный ремонт техники с гарантией надежности и профессионализма. Более 18 лет опыта.",

  phones: [
    { display: "+7 (707) 660-86-31", raw: "+77076608631" },
    { display: "+7 (708) 367-73-05", raw: "+77083677305" },
  ],

  email: "albi-service@mail.ru",

  address: {
    city: "Семей",
    street: "ул. Дулатова, 168",
    full: "г. Семей, ул. Дулатова, 168",
    mapUrl: "https://2gis.kz/semey/search/Дулатова%20168",
  },

  social: {
    whatsapp: "https://wa.me/77076608631",
    telegram: "https://t.me/albi_service",
    instagram: "https://instagram.com/albi_service",
  },

  workingHours: {
    weekdays: "Пн–Пт: 9:00–18:00 (без перерыва)",
    saturday: "Сб: 9:00–14:00",
    sunday: "Вс: выходной",
    short: "Пн–Пт 9:00–18:00, Сб 9:00–14:00",
  },
} as const
