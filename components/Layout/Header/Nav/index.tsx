'use client'

import { ReactNode, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import { useAuthStore } from '@/store/useAuth'
import ThemeToggle from '@/components/Themes/Toggle'

type NavItem = {
  index: number
  href?: string
  component: ReactNode
  class?: string
}

type NavList = NavItem[]

function NavLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`min-w-[188px] md:min-w-[55px] nav-item border-nav-border ${className}`}
    >
      {children}
    </Link>
  )
}

function NavButton({
  ariaLabel,
  onClick,
  children,
  className,
}: {
  ariaLabel: string
  onClick?: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <Button
      className={`min-w-[188px] md:min-w-[55px] nav-item border-nav-border ${className}`}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

type NavProps = {
  isActive: boolean
  handleClickOutside: () => void
}

export default function Nav({ isActive, handleClickOutside }: NavProps) {
  const { isLogin, logout: handleLogout } = useAuthStore()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        handleClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const home = {
    index: 0,
    href: '/',
    component: (
      <NavLink href="/" className="gap-[28px]">
        <Icon name="Logo" width={35} height={35} className="mb-[10px]" />
        <p className="text-[18px] font-bold text-[#A6A6A6]">Moa</p>
        <Icon name="Home" width={20} height={20} className="flex-center hidden md:block" />
        <Icon
          className="mt-[6px] block md:hidden"
          name={isActive ? 'NavArrowTop' : 'NavArrowBottom'}
          width={20}
          height={13}
        />
      </NavLink>
    ),
  }

  const zip = {
    index: 1,
    href: '/zip',
    component: (
      <NavLink href="/zip" className="text-[#A6A6A6]">
        <p>ZIP</p>
      </NavLink>
    ),
  }

  const search = {
    index: 2,
    component: (
      <NavButton ariaLabel="search button">
        <Icon name="Search" width={18} height={18} />
      </NavButton>
    ),
  }

  const login = {
    index: 3,
    href: '/login',
    component: (
      <NavLink href="/login">
        <Icon name="Login" width={20} height={18} />
      </NavLink>
    ),
  }

  const logout = {
    index: 4,
    component: (
      <NavButton ariaLabel="logout button" onClick={handleLogout}>
        <Icon name="Logout" width={20} height={18} />
      </NavButton>
    ),
  }

  const user = {
    index: 5,
    href: '/user/about',
    component: (
      <NavLink href="/user/about">
        <Icon name="User" width={18} height={20} />
      </NavLink>
    ),
  }

  const alert = {
    index: 6,
    component: (
      <NavButton ariaLabel="bell button">
        <Icon name="Bell" width={18} height={18} />
      </NavButton>
    ),
  }

  const LoggedInNav: NavList = [home, zip, user, alert, search, logout]
  const LoggedOutNav: NavList = [home, zip, search, login]

  return (
    <nav
      ref={navRef}
      className="bg-nav-bg h-[100%] px-[10px] rounded-[28px] md:rounded-full md:flex-center"
    >
      <ul className="flex-center gap-[10px] flex-col md:flex-row mt-[8px] md:mt-[0px] mb-[8px] md:mb-[0px]">
        {(isLogin ? LoggedInNav : LoggedOutNav).map(({ index, component }) => (
          <li key={index}>{component}</li>
        ))}
        <ThemeToggle />
      </ul>
    </nav>
  )
}
