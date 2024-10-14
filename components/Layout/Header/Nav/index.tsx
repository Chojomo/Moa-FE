import { useMemo, useCallback } from 'react'
import { useAuthStore } from '@/store/useAuth'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import ThemeToggle from '@/components/Themes/Toggle'

export default function Nav() {
  const { isLogin, logout } = useAuthStore()

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return (
    <nav className="bg-nav-bg h-[100%] px-[10px] rounded-[28px] md:rounded-full md:flex-center text-[#A6A6A6]">
      <ul className="flex-center gap-[10px] flex-col md:flex-row mt-[8px] md:mt-[0px] mb-[8px] md:mb-[0px]">
        <li>
          <Link href="/" className="nav-li gap-[28px]">
            <Icon name="Logo" width={35} height={35} className="mb-[10px]" />
            <p className="text-[18px] font-bold">Moa</p>
            <Icon name="Home" width={20} height={20} className="flex-center hidden md:block" />
          </Link>
        </li>
        <li>
          <Link href="/zip" className="nav-li min-w-[70px]">
            ZIP
          </Link>
        </li>
        {isLogin && (
          <>
            <li>
              <Link href="/user/about" className="nav-li">
                <Icon name="User" width={18} height={20} />
              </Link>
            </li>
            <li>
              <Button type="button" ariaLabel="bell button" className="nav-li">
                <Icon name="Bell" width={20} height={20} />
              </Button>
            </li>
          </>
        )}
        <li>
          <Button type="button" ariaLabel="search button" className="nav-li">
            <Icon name="Search" width={18} height={18} />
          </Button>
        </li>
        <li>
          {isLogin ? (
            <Link href="/login" className="nav-li">
              <Icon name="Login" width={20} height={18} />
            </Link>
          ) : (
            <Button
              type="button"
              ariaLabel="logout button"
              className="nav-li"
              onClick={handleLogout}
            >
              <Icon name="Logout" width={20} height={18} />
            </Button>
          )}
        </li>
        <ThemeToggle />
      </ul>
    </nav>
  )
}
