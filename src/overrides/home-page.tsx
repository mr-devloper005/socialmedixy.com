import Link from 'next/link'
import { ArrowRight, Radio, ShieldCheck, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const HERO_STOCK =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2000&q=80'
const SECOND_STOCK =
  'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&w=1200&q=80'

const TESTIMONIALS = [
  {
    quote:
      'We switched our announcement flow to socialMedixy and instantly got cleaner distribution pages that our partners could actually trust.',
    name: 'Aditi Sharma',
    role: 'PR Manager, Nexa Health',
  },
  {
    quote:
      'The platform streamlined our content distribution with professional presentation and reliable delivery across all channels.',
    name: 'Sarah Mitchell',
    role: 'Marketing Director, TechVision Solutions',
  },
  {
    quote:
      'Our media outreach became more effective with better organization and a polished interface that reflects our brand quality.',
    name: 'James Chen',
    role: 'Communications Manager, Innovate Labs',
  },
]

const HOME_FAQ = [
  {
    question: 'Can we publish frequent release media every week?',
    answer:
      'Yes. The homepage and archive are built for recurring announcements, so teams can keep publishing without redesigning layouts each cycle.',
  },
  {
    question: 'Do release pages support social sharing?',
    answer:
      'Yes. Each detail page includes social share actions and copy-link support, along with featured imagery and metadata-focused layout.',
  },
  {
    question: 'Can we upgrade our distribution plan later?',
    answer:
      'Absolutely. You can start with a smaller tier and move to Pro or Premium when you need broader media reach and advanced analytics.',
  },
  {
    question: 'Will this affect existing task routes?',
    answer:
      'No. This redesign changes presentation only. Existing task routes and core platform behavior remain intact.',
  },
]

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return ''
  return value.length > 160 ? value.slice(0, 157).trimEnd() + '…' : value
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images?.find((url) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo?: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=600&width=960'
}

function categoryOf(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : ''
  return typeof c === 'string' && c.trim() ? c.trim() : 'Release media'
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 14, { fresh: true })
  const lead = posts[0]
  const grid = posts.slice(1, 7)
  const ticker = posts.slice(0, 8)

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[#f7f1ea] text-[#290001]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <section className="relative min-h-[460px] overflow-hidden border-b border-[#87431d]/25 bg-[#290001] text-[#dbcbbd] sm:min-h-[520px]">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <ContentImage src={HERO_STOCK} alt="" fill className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#290001]/95 via-[#290001]/88 to-[#87431d]/75" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-22 lg:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c87941]/50 bg-[#290001]/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#dbcbbd] motion-safe:animate-[factory-fade-in_0.55s_ease_both]">
            <Radio className="h-3.5 w-3.5 text-[#c87941]" aria-hidden />
            Media wire
          </div>
          <h1 className="mt-8 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.15rem] motion-safe:animate-[factory-fade-in_0.6s_ease_both]">
            {SITE_CONFIG.name}
            <span className="mt-3 block text-lg font-normal leading-snug text-[#dbcbbd]/90 sm:text-xl">
              {SITE_CONFIG.tagline}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#dbcbbd]/85 sm:text-lg">{SITE_CONFIG.description}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 rounded-full bg-[#c87941] px-7 py-3.5 text-sm font-semibold text-[#290001] shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition hover:bg-[#dbcbbd]"
            >
              Browse press room
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <form
            action="/search"
            method="get"
            className="mt-12 flex max-w-xl flex-col gap-2 sm:flex-row sm:items-stretch"
          >
            <input type="hidden" name="task" value="mediaDistribution" />
            <label className="sr-only" htmlFor="home-search">
              Search releases
            </label>
            <input
              id="home-search"
              name="q"
              placeholder="Search headlines, companies, beats…"
              className="h-12 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-[#dbcbbd]/55 outline-none ring-[#c87941]/40 focus:ring-2"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-[#dbcbbd] px-6 text-sm font-semibold text-[#290001] transition hover:bg-white"
            >
              Search
            </button>
          </form>

          <dl className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
            {[
              ['Distribution', 'Multi-channel syndication-ready pages'],
              ['Trust', 'Editorial framing & structured metadata'],
              ['Reach', 'Built for discovery and sharing'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c87941]">{k}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#dbcbbd]/88">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {ticker.length ? (
        <div className="border-b border-[#87431d]/15 bg-[#fffdfa] py-3">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.3em] text-[#87431d]">Latest wire</span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <ul className="animate-smdx-ticker flex w-max gap-10 whitespace-nowrap">
                {[...ticker, ...ticker].map((p, i) => (
                  <li key={`${p.id}-${i}`}>
                    <Link href={`/updates/${p.slug}`} className="text-sm font-medium text-[#290001] hover:text-[#87431d]">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6 lg:py-20">
        {lead ? (
          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-[#e8d8ca] shadow-[0_28px_80px_rgba(41,0,1,0.08)]">
              <ContentImage
                src={getPostImage(lead)}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#290001]/80 via-[#290001]/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <span className="inline-flex rounded-full bg-[#c87941] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#290001]">
                  {categoryOf(lead)}
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  <Link href={`/updates/${lead.slug}`} className="hover:underline">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#dbcbbd]/95">{excerpt(lead.summary)}</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#87431d]">Lead story</p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-[#290001]">Front page for your next announcement</h3>
              <p className="mt-5 text-sm leading-8 text-[#5c4a42]">
                SocialMedixy is tuned for press-style distribution: readable typography, strong hero imagery, and archive pages
                that scan like a professional wire — without the clutter of generic SaaS marketing pages.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-[#5c4a42]">
                {[
                  { icon: Sparkles, t: 'Structured releases with category cues and author lines.' },
                  { icon: ShieldCheck, t: 'Stable URLs and layouts compatible with your existing publishing flow.' },
                  { icon: Radio, t: 'Listing and detail surfaces designed for newsroom scanning.' },
                ].map(({ icon: Icon, t }) => (
                  <li key={t} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#c87941]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/updates/${lead.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#87431d] hover:text-[#290001]"
              >
                Read full release
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ) : (
          <section className="rounded-[2rem] border border-dashed border-[#dbcbbd] bg-[#fffdfa] px-6 py-16 text-center">
            <h2 className="font-display text-2xl font-semibold text-[#290001]">Release media will appear here</h2>
            <p className="mt-3 text-[#5c4a42]">Connect your feed — the homepage is ready to spotlight your next story.</p>
            <Link href="/contact" className="mt-8 inline-flex rounded-full bg-[#87431d] px-6 py-3 text-sm font-semibold text-[#dbcbbd]">
              Contact the desk
            </Link>
          </section>
        )}

        <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-[#e8d8ca] bg-[#fffdfa] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[240px] lg:min-h-full">
            <ContentImage src={SECOND_STOCK} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#290001]/55 to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#290001] sm:text-3xl">Why teams choose a wire-style archive</h3>
            <p className="mt-4 text-sm leading-8 text-[#5c4a42]">
              Audiences skim fast. This layout keeps headlines legible, dates visible, and imagery consistent — the same cues readers
              expect from established press distribution sites.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['Speed', 'Scan-friendly grids and filters on the archive.'],
                ['Clarity', 'Author + date lines that build credibility.'],
                ['Share-ready', 'Detail pages built for social previews.'],
                ['Scale', 'Pricing tiers for add-ons and wider syndication.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-[#f0e0d2] bg-[#fffcf8] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#87431d]">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4a42]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {grid.length ? (
          <section>
            <div className="flex flex-col gap-4 border-b border-[#e8d8ca] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#87431d]">Press room</p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-[#290001]">Recent releases</h3>
              </div>
              <Link
                href="/updates"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#87431d] hover:text-[#290001]"
              >
                Open full archive
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="smdx-hover-rise group overflow-hidden rounded-2xl border border-[#e8d8ca] bg-white"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f0e6dc]">
                    <ContentImage
                      src={getPostImage(post)}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#87431d]">{categoryOf(post)}</span>
                    <h4 className="mt-2 font-display text-lg font-semibold leading-snug text-[#290001] group-hover:text-[#87431d]">
                      {post.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-[#5c4a42]">{excerpt(post.summary)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-[2rem] border border-[#e8d8ca] bg-[#fffdfa] p-7 shadow-[0_20px_60px_rgba(41,0,1,0.06)] sm:p-10">
          <div className="flex flex-col gap-3 border-b border-[#e8d8ca] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#87431d]">Testimonials</p>
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-[#290001]">
                Trusted by communications teams
              </h3>
            </div>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <article key={item.name} className="rounded-2xl border border-[#f0e0d2] bg-[#fffcf8] p-5">
                <p className="text-sm leading-7 text-[#5c4a42]">"{item.quote}"</p>
                <p className="mt-5 text-sm font-semibold text-[#290001]">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-[#87431d]">{item.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#e8d8ca] bg-[#fffdfa] p-7 shadow-[0_20px_60px_rgba(41,0,1,0.06)] sm:p-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#87431d]">FAQ</p>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-[#290001]">
              Common questions
            </h3>
          </div>
          <div className="mt-8 divide-y divide-[#e8d8ca] rounded-2xl border border-[#f0e0d2] bg-[#fffcf8]">
            {HOME_FAQ.map((item) => (
              <details key={item.question} className="group px-5 py-4 sm:px-6">
                <summary className="cursor-pointer list-none font-semibold text-[#290001] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-[#c87941] transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-[#5c4a42]">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
