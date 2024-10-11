'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/useAuth'

import Nav from './Nav'

export default function Header() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { isLogin } = useAuthStore()

  return (
    <header
      className={`w-full ${!isActive ? 'h-[55px]' : isLogin ? 'h-[450px]' : 'h-[350px]'} md:h-[52px] flex-center fixed top-[10px] z-30 transition-height duration-500 ease-in-out overflow-hidden md:transition-none`}
    >
      <Nav isActive={isActive} handleClickOutside={() => setIsActive(false)} />
    </header>
  )
}
