import Link from 'next/link'
import { Icon } from '@/components/Icon'

type IconLinkProps = {
  href: string
  iconName: string
  iconColor: string
  hoverColor: string
  iconSize: number
  children?: React.ReactNode
}

export default function IconLink({
  href,
  iconName,
  iconColor,
  hoverColor,
  iconSize,
  children,
}: IconLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-[20px] group p-2 ${href === '/zip' && 'hidden sm:block'}`}
    >
      <Icon
        name={iconName}
        width={iconSize}
        height={iconSize}
        className={`text-${iconColor} group-hover:text-${hoverColor} transition-colors`}
      />
      {children}
    </Link>
  )
}
