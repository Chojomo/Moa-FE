'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'

import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/lib/api/user'

import Button from '@/components/Button'
import { User } from '@/types/user'
import Profile from './Profile'

type UserInfoProps = {
  userId: string
  initialData: User
}

export default function UserInfo({ userId, initialData }: UserInfoProps) {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser({ userId }),
    initialData,
  })

  return (
    <div className="w-full relative">
      <Profile user={user} />
      {user?.isMyPage ? (
        <Link href="/user/setting" className="absolute top-[10px] right-[20px] group p-2">
          <Icon
            name="Setting"
            width={30}
            height={30}
            className="text-[#636363] group-hover:text-[#404040] dark:text-[#b2b2b2] dark:group-hover:text-[#e8e8e8] transition-colors"
          />
        </Link>
      ) : (
        <Button
          type="button"
          ariaLabel="팔로우 버튼"
          className="absolute top-[20px] right-[20px] px-[18px] py-[5px] bg-main-blue hover:bg-[#3878d7] rounded-full text-white font-semibold"
        >
          팔로우
        </Button>
      )}
    </div>
  )
}
