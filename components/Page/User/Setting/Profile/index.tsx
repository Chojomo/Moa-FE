'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'
import Link from 'next/link'
import { Icon } from '@/components/Icon'

type ProfileProps = {
  userId: string
}

export default function Profile({ userId }: ProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<null | string>(null)

  return (
    <div className="w-full relative">
      <p className="text-[1.5rem] font-semibold text-heading-text pb-[30px]">프로필 변경</p>
      <div className="flex items-center gap-8">
        <div className="relative w-[120px] h-[120px] rounded-md overflow-hidden bg-background">
          <Image
            src={profile ?? '/images/pebble/purple-pebble2.png'}
            alt="프로필 사진"
            quality={75}
            layout="fill"
            objectFit="contain"
            loading="lazy"
            draggable="false"
          />
        </div>
        <div className="flex flex-col gap-4 text-[1.1rem] text-[#4a4a4a] dark:text-[#767575]">
          <Button
            type="button"
            ariaLabel="프로필 추가 버튼"
            className="px-[20px] py-[8px] bg-[#d5d5d5] dark:bg-[#333333] hover:bg-[#d0d0d0] dark:hover:bg-[#2d2d2d] rounded-md"
          >
            프로필 추가
          </Button>
          <Button
            type="button"
            ariaLabel="프로필 추가 버튼"
            className="px-[20px] py-[8px] bg-[#d5d5d5] dark:bg-[#333333] hover:bg-[#d0d0d0] dark:hover:bg-[#2d2d2d] rounded-md"
          >
            프로필 제거
          </Button>
        </div>
      </div>
      <Link href={`/user/${userId}/posts`} className="absolute top-[10px] right-[20px] group p-2">
        <Icon
          name="Cancel"
          width={30}
          height={30}
          className="text-[#636363] group-hover:text-[#404040] dark:text-[#b2b2b2] dark:group-hover:text-[#e8e8e8] transition-colors"
        />
      </Link>
    </div>
  )
}
