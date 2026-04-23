import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Distribution plans & pricing',
    description:
      'Compare Basic, Pro, and Premium press distribution on socialMedixy.com — syndication reach, analytics, and optional add-ons.',
    openGraphTitle: 'Pricing — socialMedixy.com',
    openGraphDescription: 'Wire-style distribution tiers built for media announcements and measurable reach.',
  })
}

const plans = [
  {
    name: 'Basic',
    price: '$149',
    period: '/ release',
    blurb: 'Essential visibility for single announcements and lean teams.',
    features: ['Standard distribution tier', 'Indexed archive page', 'Email-friendly layout', 'Basic share tools'],
    cta: 'Contact sales',
    href: '/contact',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$349',
    period: '/ month',
    blurb: 'Most teams — stronger analytics and wider syndication surfaces.',
    features: [
      'Elevated distribution tier',
      'Engagement & referral analytics',
      'Extended media reach package',
      'Priority editorial formatting review',
    ],
    cta: 'Talk to the desk',
    href: '/contact',
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'Custom',
    period: '',
    blurb: 'High-volume desks, agencies, and multi-brand programs.',
    features: [
      'Maximum distribution tier',
      'Dedicated account routing',
      'Custom syndication bundles',
      'SLA-backed publishing windows',
    ],
    cta: 'Request a quote',
    href: '/contact',
    highlight: false,
  },
] as const

const comparison = [
  { label: 'Distribution level', basic: 'Standard', pro: 'Elevated', premium: 'Maximum' },
  { label: 'Analytics', basic: '—', pro: 'Included', premium: 'Advanced + exports' },
  { label: 'Media reach', basic: 'Core surfaces', pro: 'Extended', premium: 'Custom / multi-channel' },
  { label: 'Embargo & scheduling', basic: 'Self-serve', pro: 'Guided', premium: 'White-glove' },
] as const

const addOns = [
  { title: 'Extra syndication lane', body: 'Add a vertical or regional distribution lane for a fixed window.' },
  { title: 'Rich media pack', body: 'Hero galleries, pull quotes, and structured fact boxes for longer releases.' },
  { title: 'Compliance review', body: 'Optional legal/comms checkpoint before the wire timestamp.' },
] as const

const faq = [
  {
    q: 'Do plans include writing or editing?',
    a: 'Plans cover distribution, formatting, and syndication surfaces. Copy development is available as an add-on through the desk.',
  },
  {
    q: 'Can we switch tiers mid-contract?',
    a: 'Yes — upgrades apply immediately; downgrades align to your next billing cycle where applicable.',
  },
  {
    q: 'What does “distribution tier” mean?',
    a: 'It reflects how prominently your release is surfaced across archive, search, and partner discovery — not vanity impressions.',
  },
  {
    q: 'Is there a trial?',
    a: 'We offer a guided walkthrough and a single-release pilot for qualified teams — ask via contact.',
  },
] as const

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f7f1ea] text-[#290001]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <header className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#87431d]">Pricing</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Plans that scale with your news flow</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#5c4a42]">
            Transparent tiers for press distribution — pick the lane that matches your cadence, then layer add-ons as your program grows.
          </p>
        </header>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`smdx-hover-rise relative flex flex-col rounded-[1.75rem] border bg-[#fffdfa] p-7 shadow-[0_18px_50px_rgba(41,0,1,0.06)] transition ${
                plan.highlight
                  ? 'border-[#c87941] ring-2 ring-[#c87941]/50'
                  : 'border-[#e8d8ca]'
              }`}
            >
              {plan.highlight ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#87431d] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#dbcbbd]">
                  Popular
                </span>
              ) : null}
              <h2 className="font-display text-2xl font-semibold text-[#290001]">{plan.name}</h2>
              <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-[#5c4a42]">{plan.blurb}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-[#290001]">{plan.price}</span>
                <span className="text-sm text-[#6b5348]">{plan.period}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-[#5c4a42]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c87941]" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-10 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-[#87431d] text-[#dbcbbd] hover:bg-[#290001]'
                    : 'border border-[#dbcbbd] bg-white text-[#290001] hover:border-[#c87941]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-20 overflow-hidden rounded-[1.75rem] border border-[#e8d8ca] bg-[#fffdfa] shadow-sm">
          <h2 className="border-b border-[#e8d8ca] px-6 py-5 font-display text-xl font-semibold sm:px-8">Feature comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8d8ca] bg-[#f7f1ea]/80 text-[11px] font-bold uppercase tracking-[0.16em] text-[#87431d]">
                  <th className="px-6 py-4 sm:px-8">Capability</th>
                  <th className="px-4 py-4">Basic</th>
                  <th className="px-4 py-4">Pro</th>
                  <th className="px-6 py-4 sm:px-8">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-[#f0e6dc] last:border-0">
                    <td className="px-6 py-4 font-medium text-[#290001] sm:px-8">{row.label}</td>
                    <td className="px-4 py-4 text-[#5c4a42]">{row.basic}</td>
                    <td className="px-4 py-4 text-[#5c4a42]">{row.pro}</td>
                    <td className="px-6 py-4 text-[#5c4a42] sm:px-8">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-[#290001]">Add-ons</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c4a42]">
            Bolt these onto any active plan — perfect for launches, investor days, and coordinated regional pushes.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {addOns.map((a) => (
              <div key={a.title} className="rounded-2xl border border-[#e8d8ca] bg-[#fffdfa] p-6">
                <h3 className="font-semibold text-[#290001]">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5c4a42]">{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-[#290001]">FAQ</h2>
          <div className="mt-6 divide-y divide-[#e8d8ca] rounded-[1.5rem] border border-[#e8d8ca] bg-[#fffdfa]">
            {faq.map((item) => (
              <details key={item.q} className="group px-5 py-4 sm:px-6">
                <summary className="cursor-pointer list-none font-semibold text-[#290001] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-[#c87941] transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#5c4a42]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-16 rounded-[1.75rem] border border-[#e8d8ca] bg-[#290001] px-6 py-10 text-center text-[#dbcbbd] sm:px-10">
          <p className="font-display text-2xl font-semibold text-white">Need a tailored bundle?</p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#dbcbbd]/85">
            Tell us about volume, regions, and compliance needs — we will map the right distribution stack.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-[#c87941] px-8 py-3 text-sm font-semibold text-[#290001] transition hover:bg-[#dbcbbd]"
          >
            Contact the desk
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
