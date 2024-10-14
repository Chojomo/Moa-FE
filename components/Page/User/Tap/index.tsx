'use client'

import { taps } from '@/helper/constants/taps'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Tap() {
  const pathname = usePathname()

  return (
    <div className={`w-full h-[60px] flex-center ${pathname === '/user/setting' ? 'hidden' : ''}`}>
      <ul className="flex gap-20 border border-border px-10 py-3 rounded-full text-[15px]">
        {taps.map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
