import Link from 'next/link'
import { Icon } from '@/components/Icon'

type IconLinkProps = {
  href: string
  iconName: string
  hoverColor: string
  children?: React.ReactNode
}

export default function IconLink({ href, iconName, hoverColor, children }: IconLinkProps) {
  return (
    <Link href={href} className="flex gap-[20px] group p-2">
      <Icon
        name={iconName}
        width={17}
        height={17}
        className={`text-inverse group-hover:${hoverColor} transition-colors`}
      />
      {children}
    </Link>
  )
}
