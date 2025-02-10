'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/Icon'

import Button from '@/components/Button'
import Profile from './Profile'

export default function UserInfo() {
  const [isMyPage, setIsMyPage] = useState<boolean>(true)

  const ghost = {
    profile: '/images/pebble/purple-pebble2.png',
    nickName: 'ichubtou',
    dio: '안녕하세요. 반갑습니다.',
    follows: 3,
    followers: 2,
  }
  return (
    <div className="w-full relative">
      <Profile user={ghost} />
      {isMyPage ? (
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
          className="absolute top-[5s0px] right-[20px] px-[18px] py-[5px] bg-main-blue hover:bg-[#3878d7] rounded-full text-white font-semibold"
        >
          팔로우
        </Button>
      )}
    </div>
  )
}
