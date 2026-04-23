import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const editorialEmail = process.env.NEXT_PUBLIC_EDITORIAL_EMAIL || 'editor@socialmedixy.com'
const generalEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@socialmedixy.com'

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#f7f1ea] text-[#290001]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#87431d]">Contact</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Reach the SocialMedixy desk</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5c4a42]">
              Editorial questions, distribution upgrades, corrections, and partnership notes — send them to the right inbox and we will
              route your request without a generic support black hole.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex gap-4 rounded-2xl border border-[#e8d8ca] bg-[#fffdfa] p-5">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-[#c87941]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#87431d]">Editorial & wire</p>
                  <a href={`mailto:${editorialEmail}`} className="mt-1 block text-lg font-semibold text-[#290001] hover:text-[#87431d]">
                    {editorialEmail}
                  </a>
                  <p className="mt-2 text-sm text-[#5c4a42]">Embargo timing, headline tweaks, and release formatting.</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-[#e8d8ca] bg-[#fffdfa] p-5">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-[#c87941]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#87431d]">Accounts & billing</p>
                  <a href={`mailto:${generalEmail}`} className="mt-1 block text-lg font-semibold text-[#290001] hover:text-[#87431d]">
                    {generalEmail}
                  </a>
                  <p className="mt-2 text-sm text-[#5c4a42]">Plans, invoices, and organization-level access.</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-[#e8d8ca] bg-[#fffdfa] p-5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#c87941]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#87431d]">Service footprint</p>
                  <p className="mt-1 text-lg font-semibold text-[#290001]">Remote-first · {SITE_CONFIG.domain}</p>
                  <p className="mt-2 text-sm text-[#5c4a42]">We coordinate publishing windows across regions online.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#e8d8ca] bg-[#fffdfa] p-7 shadow-[0_20px_60px_rgba(41,0,1,0.06)] sm:p-9">
            <h2 className="font-display text-2xl font-semibold text-[#290001]">Send a message</h2>
            <p className="mt-2 text-sm text-[#5c4a42]">
              This form is for enquiries only — use your author account for live submissions when publishing is enabled.
            </p>
            <div className="mt-8 grid gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b5348]" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  className="mt-2 h-12 w-full rounded-xl border border-[#dbcbbd] bg-white px-4 text-sm text-[#290001] outline-none ring-[#c87941]/30 focus:ring-2"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b5348]" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-2 h-12 w-full rounded-xl border border-[#dbcbbd] bg-white px-4 text-sm text-[#290001] outline-none ring-[#c87941]/30 focus:ring-2"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b5348]" htmlFor="contact-topic">
                  Topic
                </label>
                <input
                  id="contact-topic"
                  name="topic"
                  className="mt-2 h-12 w-full rounded-xl border border-[#dbcbbd] bg-white px-4 text-sm text-[#290001] outline-none ring-[#c87941]/30 focus:ring-2"
                  placeholder="Distribution, billing, correction…"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b5348]" htmlFor="contact-body">
                  Message
                </label>
                <textarea
                  id="contact-body"
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-[#dbcbbd] bg-white px-4 py-3 text-sm text-[#290001] outline-none ring-[#c87941]/30 focus:ring-2"
                  placeholder="Share context so we can respond with the right next step."
                />
              </div>
              <a
                href={`mailto:${generalEmail}?subject=${encodeURIComponent('SocialMedixy enquiry')}`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#87431d] text-sm font-semibold text-[#dbcbbd] transition hover:bg-[#290001]"
              >
                Open email client
              </a>
            </div>
            <p className="mt-6 text-center text-xs text-[#6b5348]">
              Prefer email?{' '}
              <a href={`mailto:${generalEmail}`} className="font-semibold text-[#87431d] hover:underline">
                Write to us directly
              </a>{' '}
              or browse{' '}
              <Link href="/pricing" className="font-semibold text-[#87431d] hover:underline">
                pricing
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
