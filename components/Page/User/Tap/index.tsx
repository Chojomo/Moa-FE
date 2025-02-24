'use client'

import { TAPS } from '@/helper/constants/taps'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Tap() {
  const pathname = usePathname()
  const currentTap = pathname.split('/').at(-1)

  return (
    <div className="relative w-full h-[60px] mt-[50px] flex-center">
      <ul className="w-full flex items-start gap-6 text-[1.1rem] py-5 text-nonActive-text border-b border-border">
        {TAPS.map(({ name, href }) => (
          <li key={name}>
            <Link
              href={href}
              className={`${currentTap === href && 'text-heading-text font-bold'} pr-5 py-5`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
