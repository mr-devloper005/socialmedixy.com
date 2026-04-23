'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const utility = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
]

/** Primary + secondary emphasis: press archive + pricing; other routes stay in footer / direct URLs. */
const primaryNav = [
  { label: 'Press room', href: '/updates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#87431d]/20 bg-[#fffdfa]/92 text-[#290001] backdrop-blur-md">
      <div className="border-b border-[#dbcbbd]/60 bg-[#290001] py-2 text-[11px] text-[#dbcbbd]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 sm:px-6">
          <span className="font-medium tracking-wide">socialMedixy.com — media distribution & press visibility</span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {utility.map((item) => (
              <Link key={item.href} href={item.href} className="text-[#dbcbbd]/85 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-[-0.03em] text-[#290001] transition group-hover:text-[#87431d] sm:text-2xl">
            socialMedixy
          </span>
          <span className="hidden text-sm font-medium text-[#87431d] sm:inline">.com</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  active ? 'bg-[#87431d] text-[#dbcbbd]' : 'text-[#5c4a42] hover:bg-[#f0e6dc]',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/search"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-[#dbcbbd] bg-white px-4 py-2 text-sm font-semibold text-[#290001] shadow-sm transition hover:border-[#c87941]"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dbcbbd] bg-white text-[#290001]"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dbcbbd] bg-white text-[#290001]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[#e8d8ca] bg-[#fffdfa] px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-semibold text-[#290001] hover:bg-[#f0e6dc]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="mt-2 rounded-xl border border-[#dbcbbd] px-4 py-3 text-base font-semibold text-[#87431d]"
              onClick={() => setOpen(false)}
            >
              Search the archive
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
