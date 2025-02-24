'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'

import { useGetUser } from '@/hooks/user/useGetUser'

import Button from '@/components/Button'
import Profile from './Profile'

type UserInfoProps = {
  userId: string
}

export default function UserInfo({ userId }: UserInfoProps) {
  const { data: user, isLoading, error } = useGetUser(userId)

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
