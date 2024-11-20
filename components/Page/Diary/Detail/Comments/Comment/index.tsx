'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'

export default function Comment() {
  const [comment, setComment] = useState<string>('')
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false)

  const handleButtonClick = () => {
    setIsCommentOpen((prev) => !prev)
    console.log('클릭')
  }

  return (
    <div className="flex flex-col border-b py-[35px]">
      <div className="flex-center gap-[3%]">
        <Image
          src="/images/dfsfs.jpeg"
          alt="user profile"
          width={50}
          height={50}
          quality={75}
          loading="lazy"
          draggable="false"
          objectFit="cover"
          className="w-[60px] h-[60px] rounded-full border border-border"
        />
        <div className="flex-grow flex flex-col gap-[3px]">
          <p className="text-[18px] text-main-blue font-bold">뭐라뤂</p>
          <p className="text-[12px] text-[#999999]">2023.11.10. 18:32</p>
        </div>
        <div className="flex gap-[14px]">
          <Icon name="Unlike" width={20} height={20} />
          <span className="text-[14px] text-[#A6A6A6] font-bold">32</span>
        </div>
      </div>
      <p className="py-[5%] text-body-text">
        저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고
        저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어 쩌고? 어쩌고
        저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고
        저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!
      </p>
      <Button
        type="button"
        ariaLabel="답글 버튼"
        className="bg-soft-bg rounded-md text-[10px] text-white font-semibold w-[50px] h-[30px] self-end shadow-button hover:bg-[#2D2D2D]"
        onClick={handleButtonClick}
      >
        답글
      </Button>
      {isCommentOpen && (
        <div className="flex flex-col pl-[3%] mt-[30px] gap-[20px]">
          <div className="flex gap-7">
            <div className="w-[20px] h-[20px] border-l-2 border-b-2" />
            <input
              type="text"
              placeholder="모두가 함께 보는 공간입니다. 타인을 존중하는 멋진 댓글을 작성해 보세요!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-grow h-[80px] text-[13px] rounded-[10px] focus:outline-none focus:ring-0 px-4 py-2 border"
            />
          </div>
          <div className="flex justify-end gap-[20px]">
            <Button
              type="button"
              ariaLabel="답글 버튼"
              className="bg-main-blue rounded-md text-[10px] text-white font-semibold w-[50px] h-[30px] self-end shadow-button hover:bg-[#1666DE]"
              onClick={handleButtonClick}
            >
              취소
            </Button>
            <Button
              type="button"
              ariaLabel="답글 버튼"
              className="bg-soft-bg rounded-md text-[10px] text-white font-semibold w-[50px] h-[30px] self-end shadow-button hover:bg-[#2D2D2D]"
              onClick={handleButtonClick}
            >
              답글
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
