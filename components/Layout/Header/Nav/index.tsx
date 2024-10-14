import { useEffect, useCallback, Dispatch, SetStateAction, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuth'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import ThemeToggle from '@/components/Themes/Toggle'
import NavButton from './NavButton'
import NavLink from './NavLink'

type NavProps = {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
}

export default function Nav({ isActive, setIsActive }: NavProps) {
  const { isLogin, logout } = useAuthStore()
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsActive])

  const handleLogout = useCallback(() => logout(), [logout])

  const getClassNames = useCallback(
    (type: 'border' | 'icon', href?: string) => {
      const activeClass =
        type === 'border'
          ? 'border-white-active text-white-active font-bold'
          : 'rgba(255, 255, 255, 0.85)'

      const normalClass =
        type === 'border' ? 'border-nav-border text-icon-normal' : 'rgb(166,166,166)'

      if (href === pathname || (href && href !== '/' && pathname.includes(href))) {
        return activeClass
      }

      if (pathname === '/signup' && href === '/login') {
        return activeClass
      }

      return normalClass
    },
    [pathname]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (window.matchMedia(`(max-width: 768px)`).matches) {
        e.preventDefault()
        setIsActive((prev) => !prev)
      }
    },
    [setIsActive]
  )

  return (
    <nav
      ref={navRef}
      className="bg-nav-bg h-full px-[10px] rounded-[28px] md:rounded-full md:flex-center text-[#A6A6A6]"
    >
      <ul className="flex-center gap-[10px] flex-col md:flex-row mt-[8px] md:mt-0 mb-[8px] md:mb-0">
        <NavLink
          href="/"
          className={`gap-[28px] ${getClassNames('border', '/')}`}
          onClick={handleClick}
        >
          <Icon name="Logo" width={35} height={35} className="mb-[10px]" />
          <p className="text-[18px] font-bold">Moa</p>
          <Icon
            name="Home"
            width={20}
            height={20}
            className="flex-center hidden md:block"
            fill={getClassNames('icon', '/')}
          />
          <Icon
            className="mt-[6px] block md:hidden"
            name={isActive ? 'NavArrowTop' : 'NavArrowBottom'}
            width={20}
            height={13}
          />
        </NavLink>
        <NavLink href="/" liClassName="block md:hidden" className={getClassNames('border', '/')}>
          <p>Home</p>
        </NavLink>
        <NavLink href="/zip" className={getClassNames('border', '/zip')}>
          ZIP
        </NavLink>
        {isLogin && (
          <>
            <NavLink href="/user/about" className={getClassNames('border', '/user')}>
              <Icon name="User" width={18} height={20} fill={getClassNames('icon', '/user')} />
            </NavLink>
            <NavButton iconName="Bell" iconWidth={20} iconHeight={20} />
          </>
        )}
        <NavButton iconName="Search" iconWidth={18} iconHeight={18} />
        {isLogin ? (
          <NavButton iconName="Logout" iconWidth={20} iconHeight={18} onClick={handleLogout} />
        ) : (
          <NavLink href="/login" className={getClassNames('border', '/login')}>
            <Icon name="Login" width={20} height={18} fill={getClassNames('icon', '/login')} />
          </NavLink>
        )}
        <ThemeToggle />
      </ul>
    </nav>
  )
}
