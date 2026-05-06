'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type PressReleaseCard = {
  id: string
  slug: string
  title: string
  summary: string | null
  publishedAt: string | null
  authorName: string | null
  category: string
  image: string
}

type DateFilter = 'all' | '7d' | '30d' | 'year'

function parseTime(value: string | null): number {
  if (!value) return 0
  const t = Date.parse(value)
  return Number.isFinite(t) ? t : 0
}

export function PressReleaseDirectory({
  items,
  routePrefix,
  initialCategory,
}: {
  items: PressReleaseCard[]
  routePrefix: string
  initialCategory?: string
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(initialCategory && initialCategory !== 'all' ? initialCategory : 'all')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')

  const categories = useMemo(() => {
    const set = new Set<string>()
    items.forEach((i) => {
      if (i.category?.trim()) set.add(i.category.trim())
    })
    const sorted = Array.from(set).sort((a, b) => a.localeCompare(b))
    const out = ['all', ...sorted]
    if (initialCategory && initialCategory !== 'all' && !out.includes(initialCategory)) {
      out.push(initialCategory)
    }
    return out
  }, [items, initialCategory])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const now = Date.now()
    const cutoff =
      dateFilter === '7d'
        ? now - 7 * 86400000
        : dateFilter === '30d'
          ? now - 30 * 86400000
          : dateFilter === 'year'
            ? now - 365 * 86400000
            : 0

    return items.filter((item) => {
      if (category !== 'all') {
        const c = item.category.trim().toLowerCase()
        if (c !== category.toLowerCase()) return false
      }
      if (cutoff > 0 && parseTime(item.publishedAt) < cutoff) return false
      if (!q) return true
      const hay = `${item.title} ${item.summary || ''} ${item.authorName || ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [items, query, category, dateFilter])

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#dbcbbd] bg-[#fffdfa]/80 px-6 py-16 text-center">
        <p className="text-lg font-medium text-[#290001]">No release media published yet.</p>
        <p className="mt-2 text-sm text-[#6b5348]">When your feed goes live, stories will appear here with filters enabled.</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--smdx-rust)]/15 bg-[#fffdfa] p-5 shadow-[0_16px_48px_rgba(41,0,1,0.06)] sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-[200px] flex-1">
          <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5348]">Search</label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#87431d]/70" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Headlines, topics, organizations…"
              className="h-11 rounded-xl border-[#dbcbbd] bg-white pl-10 pr-3 text-[#290001] placeholder:text-[#6b5348]/70"
            />
          </div>
        </div>
        <div className="w-full min-w-[160px] sm:w-auto sm:max-w-[200px]">
          <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5348]">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-2 h-11 rounded-xl border-[#dbcbbd] bg-white text-[#290001]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === 'all' ? 'All categories' : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full min-w-[160px] sm:w-auto sm:max-w-[200px]">
          <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5348]">Date</label>
          <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as DateFilter)}>
            <SelectTrigger className="mt-2 h-11 rounded-xl border-[#dbcbbd] bg-white text-[#290001]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any time</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="year">Past year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl border-[#87431d]/40 text-[#87431d] hover:bg-[#dbcbbd]/40"
          onClick={() => {
            setQuery('')
            setCategory('all')
            setDateFilter('all')
          }}
        >
          Reset
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#dbcbbd] bg-[#fffdfa]/80 px-6 py-16 text-center">
          <p className="text-lg font-medium text-[#290001]">No releases match these filters.</p>
          <p className="mt-2 text-sm text-[#6b5348]">Try a broader search or clear filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post, index) => (
            <Link
              key={post.id}
              href={`${routePrefix}/${post.slug}`}
              className="smdx-hover-rise group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8d8ca] bg-white shadow-[0_12px_36px_rgba(41,0,1,0.05)]"
              style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f0e6dc]">
                <ContentImage
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#290001]/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#dbcbbd]">
                  {post.category || 'Press'}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-[#290001] group-hover:text-[#87431d]">
                  {post.title}
                </h2>
                {post.summary ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#5c4a42]">{post.summary}</p>
                ) : null}
                <span className="mt-4 text-xs font-medium text-[#6b5348]">By {post.authorName || 'Editorial desk'}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
