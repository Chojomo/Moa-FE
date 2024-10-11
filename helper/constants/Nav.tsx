import { ReactNode } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import { useAuthStore } from '@/store/useAuth'

type NavItem = {
  href?: string
  component: ReactNode
}

type NavList = NavItem[]

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="min-w-[188px] md:min-w-[55px] nav-item border-nav-border">
      {children}
    </Link>
  )
}

function NavButton({
  ariaLabel,
  onClick,
  children,
}: {
  ariaLabel: string
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <Button
      className="min-w-[188px] md:min-w-[55px] nav-item border-nav-border"
      type="button"
      ariaLabel={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default function Nav() {
  const { isLogin, logout: handleLogout } = useAuthStore()

  const home = {
    href: '/',
    component: (
      <NavLink href="/">
        <Icon name="Logo" width={35} height={35} className="mb-[10px]" />
        <p className="text-[18px] font-bold">Moa</p>
        <Icon name="Home" width={20} height={20} className="flex-center hidden md:block" />
      </NavLink>
    ),
  }

  const zip = {
    href: '/zip',
    component: (
      <NavLink href="/zip">
        <p>ZIP</p>
      </NavLink>
    ),
  }

  const search: NavItem = {
    component: (
      <NavButton ariaLabel="search button">
        <Icon name="Search" width={18} height={18} />
      </NavButton>
    ),
  }

  const login: NavItem = {
    href: '/login',
    component: (
      <NavLink href="/login">
        <Icon name="Login" width={20} height={18} />
      </NavLink>
    ),
  }

  const logout: NavItem = {
    component: (
      <NavButton ariaLabel="logout button" onClick={handleLogout}>
        <Icon name="Logout" width={20} height={18} />
      </NavButton>
    ),
  }

  const user: NavItem = {
    href: '/user/about',
    component: (
      <NavLink href="/user/about">
        <Icon name="User" width={18} height={20} />
      </NavLink>
    ),
  }

  const alert: NavItem = {
    component: (
      <NavButton ariaLabel="bell button">
        <Icon name="Bell" width={18} height={18} />
      </NavButton>
    ),
  }

  const LoggedInNav: NavList = [home, zip, user, alert, search, logout]
  const LoggedOutNav: NavList = [home, zip, search, login]

  return isLogin ? LoggedInNav : LoggedOutNav
}
