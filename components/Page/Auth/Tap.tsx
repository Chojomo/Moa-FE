'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Tap() {
  const pathname = usePathname()

  return (
    <div className="h-auto text-[16px] font-bold border border-border rounded-full shadow-sm mb-[70px]">
      <Link
        href="/signup"
        className={`inline-block ${pathname === '/signup' && 'text-accent'} px-[50px] py-[10px] border-r border-r-border`}
      >
        회원가입
      </Link>
      <Link
        href="/login"
        className={`inline-block ${pathname === '/login' && 'text-accent'} px-[50px] py-[10px]`}
      >
        로그인
      </Link>
    </div>
  )
}
