'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'
import usePostComment from '@/hooks/comment/usePostComment'

type CommentPostProps = {
  isLogin: boolean
  diaryId: string
  profile: string
  handleToast: (message: string) => void
}

export default function CommentPost({ isLogin, diaryId, profile, handleToast }: CommentPostProps) {
  const [comment, setComment] = useState<string>('')
  const { mutateAsync: postComment } = usePostComment()

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!isLogin) {
      handleToast('로그인 후 이용하실 수 있습니다.')
      return
    }

    if (!comment.trim()) {
      handleToast('댓글을 입력하세요!')
      return
    }

    try {
      await postComment({
        diaryId,
        commentContents: comment,
      })

      setComment('')
    } catch (error) {
      console.error('게시물 등록 중 오류:', error)
    }
  }

  return (
    <div className="w-full flex-center border-y px-[16px] py-[50px] gap-[25px]">
      <Image
        src={profile}
        alt="user profile"
        width={55}
        height={60}
        quality={55}
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
        onClick={(e) => {
          e.stopPropagation()

          if (!isLogin) {
            handleToast('로그인 후 이용하실 수 있습니다.')
          }
        }}
        disabled={!isLogin}
        className="flex-grow h-[80px] text-[13px] rounded-[10px] focus:outline-none focus:ring-0 px-4 py-2 border"
      />
      <Button
        type="button"
        ariaLabel="follow button"
        className="bg-soft-bg rounded-md text-[12px] md:text-[13px] text-white font-semibold w-[50px] h-[40px] shadow-button hover:bg-[#2D2D2D]"
        onClick={handleButtonClick}
      >
        등록
      </Button>
    </div>
  )
}
