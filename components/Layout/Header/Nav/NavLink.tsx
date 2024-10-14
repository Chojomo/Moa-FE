import { ReactNode } from 'react'
import Link from 'next/link'

type NavButtonProps = {
  href: string
  liClassName?: string
  className?: string
  onClick?: () => void
  children: ReactNode
}

function NavLink({ href, liClassName, className, onClick, children }: NavButtonProps) {
  return (
    <li className={liClassName}>
      <Link href={href} className={`nav-li ${className}`} onClick={onClick}>
        {children}
      </Link>
    </li>
  )
}

export default NavLink
