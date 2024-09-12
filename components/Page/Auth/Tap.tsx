'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Tap() {
  const pathname = usePathname()

  return (
    <div className="h-auto text-[16px] border border-border rounded-full shadow-sm mb-[50px]">
      <Link
        href="/login"
        className={`inline-block ${pathname === '/login' ? 'text-heading-text font-bold' : 'text-nonActive-text'} px-[50px] py-[10px] border-r border-r-border`}
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className={`inline-block ${pathname === '/signup' ? 'text-heading-text font-bold' : 'text-nonActive-text'} px-[50px] py-[10px]`}
      >
        회원가입
      </Link>
    </div>
  )
}
