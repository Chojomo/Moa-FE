'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuth'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import ThemeToggle from '@/components/Themes/Toggle'

export default function Header() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { isLogin } = useAuthStore()
  const pathname = usePathname()

  const handleActive = (href: string, type: 'border' | 'icon') => {
    const classActive =
      type === 'border' ? 'border-white-active text-white-active' : 'rgba(255, 255, 255, 0.85)'

    const classNormal =
      type === 'border' ? 'border-nav-border text-icon-normal' : 'rgb(166,166,166)'

    if (pathname.includes(href) && href !== '/') {
      return classActive
    }

    if (pathname === href) {
      return classActive
    }

    return classNormal
  }

  const handleActiveHome = (href: string, type: 'border' | 'icon') => {
    const isMobile = window.matchMedia(`(max-width: 768px)`).matches

    const classActive =
      type === 'border' ? 'border-white-active text-white-active' : 'rgba(255, 255, 255, 0.85)'

    const classNormal =
      type === 'border' ? 'border-nav-border text-icon-normal' : 'rgb(166,166,166)'

    if (isMobile) {
      return classActive
    }

    if (pathname === href) {
      return classActive
    }

    return classNormal
  }

  type NavItem = {
    href: string
    label: string
    icon: JSX.Element | null
    additionalIcon: JSX.Element | null
  }

  const navItems: NavItem[] = [
    { href: '/diary', label: 'Diary', icon: null, additionalIcon: null },
    { href: '/zip', label: 'ZIP', icon: null, additionalIcon: null },
  ]

  if (isLogin) {
    navItems.push(
      {
        href: '/user',
        label: '',
        icon: <Icon name="User" width={18} height={20} fill={handleActive('/user', 'icon')} />,
        additionalIcon: null,
      },
      {
        href: '',
        label: '',
        icon: (
          <Button
            className="min-w-[188px] md:min-w-[55px] nav-item border-nav-border"
            type="button"
            aria-label="bell button"
          >
            <Icon name="Bell" width={18} height={18} />
          </Button>
        ),
        additionalIcon: null,
      }
    )
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = window.matchMedia(`(max-width: 768px)`).matches

    if (isMobile) {
      e.preventDefault()

      setIsActive(!isActive)
    }
  }

  return (
    <header
      className={`w-full ${!isActive ? 'h-[55px]' : isLogin ? 'h-[450px]' : 'h-[350px]'} md:h-[52px] flex-center fixed top-[10px] z-30 transition-height duration-500 ease-in-out overflow-hidden md:transition-none`}
    >
      <nav className="bg-nav-bg h-[100%] px-[10px] rounded-[28px] md:rounded-full md:flex-center">
        <ul className="flex-center gap-[10px] flex-col md:flex-row mt-[8px] md:mt-[0px] mb-[8px] md:mb-[0px]">
          <li>
            <Link
              className={`min-w-[188px] nav-item gap-[28px] ${handleActiveHome('/', 'border')}`}
              href="/"
              onClick={handleClick}
            >
              <Icon name="Logo" width={35} height={35} className="mb-[10px]" />
              <p className="text-[18px] font-bold">Moa</p>
              <Icon
                name="Home"
                width={20}
                height={20}
                className="flex-center hidden md:block"
                fill={handleActiveHome('/', 'icon')}
              />
              <Icon
                className="mt-[6px] block md:hidden"
                name={isActive ? 'NavArrowTop' : 'NavArrowBottom'}
                width={20}
                height={13}
              />
            </Link>
          </li>
          <li className="block md:hidden">
            <Link
              href="/"
              className={`min-w-[188px] nav-item gap-[28px] ${handleActive('/', 'border')}`}
            >
              <p className="text-[14px]">Home</p>
            </Link>
          </li>
          {navItems.map((item) => (
            <li key={item.href} className="min-w-[188px] md:min-w-[55px]">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`${item.href === '/user' ? 'min-w-[55px]' : 'min-w-[70px]'} nav-item gap-[28px] ${handleActive(item.href, 'border')}`}
                >
                  {item.icon}
                  {item.label && (
                    <p className={`${item.href === '/' ? 'text-[18px] font-bold' : 'text-[14px]'}`}>
                      {item.label}
                    </p>
                  )}
                  {item.additionalIcon}
                </Link>
              ) : (
                item.icon
              )}
            </li>
          ))}
          <li>
            <Button
              className="min-w-[188px] md:min-w-[55px] nav-item border-nav-border"
              type="button"
              aria-label="search button"
            >
              <Icon name="Search" width={18} height={18} />
            </Button>
          </li>
          {isLogin ? (
            <li>
              <Button
                className="min-w-[188px] md:min-w-[55px] nav-item border-nav-border"
                type="button"
                aria-label="logout button"
              >
                <Icon name="Logout" width={20} height={18} />
              </Button>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                className={`min-w-[188px] md:min-w-[55px] nav-item gap-[28px] ${handleActive('/login', 'border')}`}
              >
                <Icon name="Login" width={20} height={18} fill={handleActive('/login', 'icon')} />
              </Link>
            </li>
          )}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}
