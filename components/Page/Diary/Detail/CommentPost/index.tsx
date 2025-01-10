'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'
import usePostComment from '@/hooks/comment/usePostComment'
import { Comment } from '@/types/diary'
import { toast } from 'react-toastify'
import CommentInput from '../CommentInput'

type CommentPostProps = {
  isLogin: boolean
  diaryId: string
  profile: string
  setComment: Dispatch<SetStateAction<Comment[] | null>>
  setCommentCount: Dispatch<SetStateAction<number>>
  handleCommentsUpdate: () => void
}

export default function CommentPost({
  isLogin,
  diaryId,
  profile,
  setComment: setComments,
  setCommentCount,
  handleCommentsUpdate,
}: CommentPostProps) {
  const [comment, setComment] = useState<string>('')
  const { mutateAsync: postComment } = usePostComment()

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!isLogin) {
      toast.info('로그인 후 이용하실 수 있습니다.')
      return
    }

    if (!comment.trim()) {
      toast.error('댓글을 입력하세요!')
      return
    }

    try {
      const newComment: Comment = await postComment({
        diaryId,
        commentContents: comment,
      })

      setComments((prev: Comment[] | null) => {
        if (prev) {
          return [...prev, newComment]
        }
        return [newComment]
      })

      setComment('')
      setTimeout(handleCommentsUpdate, 100)
      setCommentCount((prev: number) => prev + 1)
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
        className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full border border-border"
      />
      <CommentInput isLogin={isLogin} comment={comment} setComment={setComment} />
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
