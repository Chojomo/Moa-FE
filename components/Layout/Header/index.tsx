'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuth'
import Button from '@/components/Button'
import Image from 'next/image'
import ThemeToggle from '@/components/Themes/Toggle'
import { LoginModal } from '@/components/Page/Auth/Modal'
import { useAppStore } from '@/store/useApp'
import Logo from './Logo'
import NavModal from './NavModal'
import IconLink from './IconLink'

export default function Header() {
  const { isLoginModalOpen, loginModalOpen, loginModalClose } = useAppStore()
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false)
  const { isLogin } = useAuthStore()
  const pathname = usePathname()

  if (pathname.includes('/diary/post')) return null

  const getUserProfile = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    return userInfo.profile
  }

  return (
    <header className="z-30 fixed top-0 left-0 bg-background w-full py-[12px] px-[5%] flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-[7px]">
        {isLogin && (
          <IconLink
            href="/notifications"
            iconName="Bell"
            iconColor="inverse"
            hoverColor="[#888888]"
            iconSize={17}
          />
        )}
        <IconLink
          href="/search"
          iconName="Search"
          iconColor="inverse"
          hoverColor="main-blue"
          iconSize={17}
        />
        <IconLink
          href="/zip"
          iconName="Zip"
          iconColor="inverse"
          hoverColor="accent"
          iconSize={17}
        />
        <ThemeToggle />
        {isLogin ? (
          <Button type="button" ariaLabel="zz" onClick={() => setIsNavModalOpen((prev) => !prev)}>
            <Image
              src={getUserProfile()}
              alt="user profile"
              width={50}
              height={50}
              quality={75}
              loading="lazy"
              draggable="false"
              objectFit="cover"
              className="w-[40px] h-[40px] rounded-full border border-border ml-[7px]"
            />
          </Button>
        ) : (
          <Button
            type="button"
            ariaLabel="로그인 버튼"
            className="bg-inverse px-[14px] py-[5px] rounded-full text-background text-[0.9rem] font-semibold ml-[7px]"
            onClick={loginModalOpen}
          >
            로그인
          </Button>
        )}
      </div>
      <NavModal isOpen={isNavModalOpen} handleClose={() => setIsNavModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} handleClose={loginModalClose} />
    </header>
  )
}
