'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import ThemeToggle from '@/components/Themes/Toggle'
import { tincolorIcon } from '@/helper/constants/tintcolor'
import { isLoginNav, notLoginNav } from '@/helper/constants/nav'
import { useAuthStore } from '@/store/useAuth'

type IconType = {
  name: string
  width: number
  height: number
}

type NavItem = {
  index: number
  type: string
  href?: string
  minW?: string
  styles?: string
  script?: JSX.Element
  icon?: IconType
}

export default function Header() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const { isLogin } = useAuthStore()

  const handleActive = (index: number) => {
    if (activeIndex === index) {
      return 'border-white-active text-white-active'
    }
    return 'border-nav-border text-icon-normal'
  }

  const handleClick = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const navList = useMemo(
    () => (isLogin ? isLoginNav(activeIndex) : notLoginNav(activeIndex)),
    [isLogin, activeIndex]
  )

  return (
    <header className="w-[100vw] h-[52px] flex-center fixed top-[10px] z-30">
      <nav className="bg-nav-bg h-[100%] px-[10px] rounded-full flex-center">
        <ul className="flex-center gap-[10px]">
          {navList.map((item: NavItem) => (
            <li key={item.index}>
              {item.type === 'link' ? (
                <Link
                  className={`min-w-[${item.minW}] nav-item gap-[28px] ${handleActive(item.index)}`}
                  href={item.href || ''}
                  onClick={() => handleClick(item.index)}
                >
                  {item.script}
                </Link>
              ) : (
                <Button
                  className={`nav-item ${handleActive(item.index)}`}
                  onClick={() => handleClick(item.index)}
                  style={{ minWidth: item.minW }}
                  type="button"
                  aria-label={item.icon?.name}
                >
                  {item.icon && (
                    <Icon
                      name={item.icon.name}
                      width={item.icon.width}
                      height={item.icon?.height}
                      fill={tincolorIcon(activeIndex, item.index)}
                    />
                  )}
                </Button>
              )}
            </li>
          ))}
          <ThemeToggle />
        </ul>
      </nav>
    </header>
  )
}
