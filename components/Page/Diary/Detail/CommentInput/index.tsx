'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type CommentInputProps = {
  isLogin: boolean
  comment: string
  setComment: Dispatch<SetStateAction<string>>
}

export default function CommentInput({ isLogin, comment, setComment }: CommentInputProps) {
  const [placeholder, setPlaceholder] = useState<string>(
    window.innerWidth < 400
      ? '댓글을 작성하세요'
      : '모두가 함께 보는 공간입니다. 타인을 존중하는 멋진 댓글을 작성해 보세요!'
  )

  const handleResize = () => {
    setPlaceholder(
      window.innerWidth < 400
        ? '댓글을 작성하세요'
        : '모두가 함께 보는 공간입니다. 타인을 존중하는 멋진 댓글을 작성해 보세요!'
    )
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <textarea
      placeholder={placeholder}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="flex-grow flex items-center min-h-[80px] text-[13px] rounded-[10px] focus:outline-none focus:ring-0 px-4 py-2 md:py-5 border placeholder-pre-line"
    />
  )
}
