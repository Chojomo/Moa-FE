'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'

export default function CommentPost() {
  const [comment, setComment] = useState<string>('')

  const handleButtonClick = () => {
    console.log('클릭')
  }

  return (
    <div className="w-full flex-center border-y px-[16px] py-[50px] gap-[25px]">
      <Image
        src="/images/dfsfs.jpeg"
        alt="user profile"
        width={60}
        height={60}
        quality={75}
        loading="lazy"
        draggable="false"
        objectFit="cover"
        className="w-[60px] h-[60px] rounded-full border border-border"
      />
      <input
        type="text"
        placeholder="모두가 함께 보는 공간입니다. 타인을 존중하는 멋진 댓글을 작성해 보세요!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-grow h-[80px] text-[13px] rounded-[10px] focus:outline-none focus:ring-0 px-4 py-2 border"
      />
      <Button
        type="button"
        ariaLabel="follow button"
        className="bg-soft-bg rounded-md text-[12px] md:text-[13px] text-white font-semibold w-[50px] h-[40px]"
        onClick={handleButtonClick}
      >
        등록
      </Button>
    </div>
  )
}
