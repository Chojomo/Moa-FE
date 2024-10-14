'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuth'
import Nav from './Nav'

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const { isLogin } = useAuthStore()
  const pathname = usePathname()

  useEffect(() => {
    setIsVisible(pathname !== '/diary/post')
  }, [pathname])

  return (
    isVisible && (
      <header
        className={`w-full ${!isActive ? 'h-[55px]' : isLogin ? 'h-[400px]' : 'h-[300px]'} md:h-[52px] flex-center fixed top-[10px] z-30 transition-height duration-500 ease-in-out overflow-hidden md:transition-none`}
      >
        <Nav isActive={isActive} setIsActive={setIsActive} />
      </header>
    )
  )
}
