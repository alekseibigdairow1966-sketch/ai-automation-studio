export interface CaseStudy {
  id: string
  title: string
  slug: string
  description: string
  industry: string
  problem: string
  inefficiencies: string
  solution: string
  architecture: {
    nodes: { id: string; label: string; icon: string; x: number; y: number }[]
    edges: { from: string; to: string; label?: string }[]
  } | null
  technologies: string[]
  screenshots: string[]
  results: { metric: string; before: string; after: string }[]
  published: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string | null
  category: string
  seo_title: string
  seo_description: string
  published_at: string | null
  created_at: string
}

export interface Lead {
  id: string
  name: string
  phone: string
  business: string | null
  message: string | null
  source: "contact_form" | "ai_widget" | "case_cta"
  status: "new" | "contacted" | "closed"
  created_at: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  useCases: string[]
}
