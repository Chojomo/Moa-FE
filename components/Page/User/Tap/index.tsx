'use client'

import { TAPS } from '@/helper/constants/taps'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Tap() {
  const pathname = usePathname()

  console.log(pathname)

  return (
    <div className="w-full h-[60px] mt-[50px] flex-center border-b border-border">
      <ul className="w-full flex items-start gap-6 text-[1.1rem] text-nonActive-text">
        {TAPS.map(({ name, href, path }) => (
          <li key={name}>
            <Link
              href={href}
              className={`${pathname === path && 'text-heading-text font-bold'} pr-5 py-5`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
