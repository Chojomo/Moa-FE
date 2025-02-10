import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<null | string>(null)

  return (
    <div className="w-full">
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
    </div>
  )
}
