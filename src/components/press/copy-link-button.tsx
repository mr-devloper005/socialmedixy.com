'use client'

import { Link as LinkIcon } from 'lucide-react'

export function CopyLinkButton({ url }: { url: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-[#e8d8ca] bg-white px-4 py-2 text-sm font-semibold text-[#290001] transition hover:border-[#c87941]"
      onClick={() => {
        void navigator.clipboard?.writeText(url)
      }}
    >
      <LinkIcon className="h-4 w-4" />
      Copy link
    </button>
  )
}
