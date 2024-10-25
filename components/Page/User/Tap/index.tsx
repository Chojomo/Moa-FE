'use client'

import { taps } from '@/helper/constants/taps'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Tap() {
  const pathname = usePathname()

  return (
    <div
      className={`w-full h-[60px] flex-center ${pathname === '/user/setting' ? 'hidden' : ''} my-[40px] md:my-[30px]`}
    >
      <ul className="w-full h-full flex-center gap-5 md:gap-[10%] border-b border-border text-[14px] md:text-[15px] font-semibold">
        {taps.map(({ name, href }) => (
          <li
            key={name}
            className={`h-full flex-center ${pathname.includes(href) ? 'border-b-[3px] border-main-blue' : ''}`}
          >
            <Link href={href} className="px-4 py-3">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
