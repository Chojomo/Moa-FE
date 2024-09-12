'use client'

import { useAuthStore } from '@/store/useAuth'
import Link from 'next/link'
import { Icon } from '@/components/Icon'

type PostIconProps = {
  className?: string
}

export default function PostIcon({ className }: PostIconProps) {
  const { isLogin } = useAuthStore()
  return (
    isLogin && (
      <Link href="/diary/post" className={className}>
        <Icon name="Post" width={27} height={33} />
      </Link>
    )
  )
}
