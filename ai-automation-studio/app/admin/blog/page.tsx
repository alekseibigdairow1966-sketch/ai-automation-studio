"use client"

import { useState, useEffect } from "react"
import {
  BookOpen,
  Save,
  Loader2,
  CheckCircle2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Eye,
  EyeOff,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface BlogPost {
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

const CATEGORIES = [
  "WhatsApp AI",
  "n8n",
  "AI Automation",
  "Business Systems",
  "CRM",
  "Кейсы",
]

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then(setPosts)
  }, [])

  const save = async () => {
    if (!posts) return
    setSaving(true)
    await fetch("/api/admin/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const addPost = () => {
    if (!posts) return
    const post: BlogPost = {
      id: String(Date.now()),
      title: "Новая статья",
      slug: "new-post-" + Date.now(),
      content: "",
      excerpt: "",
      cover_image: null,
      category: "AI Automation",
      seo_title: "",
      seo_description: "",
      published_at: null,
      created_at: new Date().toISOString(),
    }
    setPosts([post, ...posts])
    setOpenId(post.id)
  }

  const updatePost = (id: string, patch: Partial<BlogPost>) => {
    if (!posts) return
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  const removePost = (id: string) => {
    if (!posts) return
    setPosts(posts.filter((p) => p.id !== id))
    if (openId === id) setOpenId(null)
  }

  const togglePublish = (id: string) => {
    if (!posts) return
    const post = posts.find((p) => p.id === id)
    if (!post) return
    updatePost(id, {
      published_at: post.published_at ? null : new Date().toISOString(),
    })
  }

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[а-яё]/gi, (c) => {
        const map: Record<string, string> = {
          а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
          ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
          н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
          ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
          ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
        }
        return map[c.toLowerCase()] || c
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

  if (!posts) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BookOpen size={24} className="text-accent" />
          <h1 className="text-2xl font-bold text-text-primary">Блог</h1>
          <span className="text-text-muted text-sm">({posts.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={addPost} size="sm" variant="outline" className="text-xs border-white/[0.06] text-text-secondary hover:text-text-primary">
            <Plus size={14} className="mr-1" /> Новая статья
          </Button>
          <Button onClick={save} disabled={saving} size="sm" className="accent-gradient text-white text-xs">
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : saved ? (
              <><CheckCircle2 size={14} className="mr-1" /> Сохранено</>
            ) : (
              <><Save size={14} className="mr-1" /> Сохранить всё</>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((post) => {
          const isOpen = openId === post.id
          const isPublished = !!post.published_at
          return (
            <div key={post.id} className="glass-panel overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setOpenId(isOpen ? null : post.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
              >
                <GripVertical size={14} className="text-text-muted/40 shrink-0" />
                {isOpen ? <ChevronDown size={16} className="text-accent shrink-0" /> : <ChevronRight size={16} className="text-text-muted shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm font-medium truncate">{post.title}</p>
                  <p className="text-text-muted text-xs truncate">
                    {post.category}
                    {post.published_at && (
                      <> &middot; {new Date(post.published_at).toLocaleDateString("ru-RU")}</>
                    )}
                  </p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${isPublished ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {isPublished ? "Опубликована" : "Черновик"}
                </span>
              </button>

              {/* Body */}
              {isOpen && (
                <div className="px-4 pb-5 border-t border-white/[0.04] pt-4 space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="text-text-muted text-xs mb-1.5 block">Заголовок</label>
                      <Input
                        value={post.title}
                        onChange={(e) => {
                          updatePost(post.id, { title: e.target.value })
                        }}
                        className="bg-background border-white/[0.06] text-text-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-text-muted text-xs mb-1.5 block">
                        Slug (URL)
                        <button
                          type="button"
                          onClick={() => updatePost(post.id, { slug: slugify(post.title) })}
                          className="text-accent ml-2 hover:underline"
                        >
                          сгенерировать
                        </button>
                      </label>
                      <Input
                        value={post.slug}
                        onChange={(e) => updatePost(post.id, { slug: e.target.value })}
                        className="bg-background border-white/[0.06] text-text-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-text-muted text-xs mb-1.5 block">Категория</label>
                      <select
                        value={post.category}
                        onChange={(e) => updatePost(post.id, { category: e.target.value })}
                        className="w-full h-9 rounded-md border border-white/[0.06] bg-background text-text-primary text-sm px-3"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <Field label="URL обложки (необязательно)" value={post.cover_image || ""} onChange={(v) => updatePost(post.id, { cover_image: v || null })} />
                  </div>

                  <div>
                    <label className="text-text-muted text-xs mb-1.5 block">Краткое описание (excerpt)</label>
                    <Textarea value={post.excerpt} onChange={(e) => updatePost(post.id, { excerpt: e.target.value })} rows={2} className="resize-none bg-background border-white/[0.06] text-text-primary text-sm" />
                  </div>

                  <div>
                    <label className="text-text-muted text-xs mb-1.5 block">Контент (Markdown)</label>
                    <Textarea
                      value={post.content}
                      onChange={(e) => updatePost(post.id, { content: e.target.value })}
                      rows={12}
                      className="resize-y bg-background border-white/[0.06] text-text-primary text-sm font-mono text-xs"
                    />
                  </div>

                  {/* SEO */}
                  <div className="glass-panel p-4 bg-white/[0.01]">
                    <p className="text-text-secondary text-xs font-medium mb-3">SEO</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <Field label="SEO заголовок" value={post.seo_title} onChange={(v) => updatePost(post.id, { seo_title: v })} />
                      <div>
                        <label className="text-text-muted text-xs mb-1.5 block">SEO описание</label>
                        <Textarea value={post.seo_description} onChange={(e) => updatePost(post.id, { seo_description: e.target.value })} rows={2} className="resize-none bg-background border-white/[0.06] text-text-primary text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Publish + Delete */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <button
                      onClick={() => togglePublish(post.id)}
                      className={`flex items-center gap-2 text-xs transition-colors ${isPublished ? "text-green-400 hover:text-yellow-400" : "text-yellow-400 hover:text-green-400"}`}
                    >
                      {isPublished ? <><Eye size={14} /> Опубликована</> : <><EyeOff size={14} /> Черновик — нажмите для публикации</>}
                    </button>
                    <button
                      onClick={() => removePost(post.id)}
                      className="text-text-muted hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={12} /> Удалить статью
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Статей пока нет</p>
          <button onClick={addPost} className="text-accent text-sm mt-2 hover:underline">
            Написать первую статью
          </button>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-text-muted text-xs mb-1.5 block">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-background border-white/[0.06] text-text-primary text-sm" />
    </div>
  )
}
