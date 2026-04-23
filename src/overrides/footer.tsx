import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const columns = [
  {
    title: 'Discover',
    links: [
      { label: 'Press room', href: '/updates' },
      { label: 'Search', href: '/search' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-[#87431d]/20 bg-[#290001] text-[#dbcbbd]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold text-white">socialMedixy.com</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#dbcbbd]/85">{SITE_CONFIG.description}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c87941]">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[#dbcbbd]/90 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-[#dbcbbd]/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-[#dbcbbd]/50">Press distribution — built for media teams and public communications.</p>
        </div>
      </div>
    </footer>
  )
}
