'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import ThemeToggle from '@/components/Themes/Toggle'
import { tintcolor, tincolorIcon } from '@/helper/constants/tintcolor'
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

  const handleClick = (index: number) => {
    setActiveIndex(index)
  }
  const navList = isLogin ? isLoginNav(activeIndex) : notLoginNav(activeIndex)

  return (
    <header className="w-[100vw] h-[52px] flex-center relative top-[10px]">
      <nav className="bg-nav-bg h-[100%] px-[10px] rounded-full flex-center">
        <ul className="flex-center gap-[10px]">
          {navList.map((item: NavItem) => (
            <li key={item.index}>
              {item.type === 'link' ? (
                <Link
                  className={`min-w-[${item.minW}] nav-item ${tintcolor(activeIndex, item.index)} ${item.styles}`}
                  href={item.href || ''}
                  onClick={() => handleClick(item.index)}
                >
                  {item.script}
                </Link>
              ) : (
                <Button
                  className={`min-w-[${item.minW}] nav-item  ${tintcolor(activeIndex, item.index)}`}
                  onClick={() => handleClick(item.index)}
                >
                  {item.icon && (
                    <Icon
                      name={item.icon.name}
                      width={item.icon.width}
                      height={item.icon?.height}
                      skeletonClassName="rounded"
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
