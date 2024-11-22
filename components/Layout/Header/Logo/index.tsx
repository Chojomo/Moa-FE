import Link from 'next/link'
import { Icon } from '@/components/Icon'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-[12px]">
      <Icon name="Logo" width={35} height={35} className="mb-[15px]" />
      <span className="text-[20px] text-foreground font-bold">Moa</span>
    </Link>
  )
}
