'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'
import { Comment as PostComment } from '@/types/diary'
import usePostReply from '@/hooks/comment/usePostReply'
import CommentInput from '../../CommentInput'

type CmtProps = {
  isReply?: boolean
  profile: string
  name: string
  createdAt: string
  content: string
}

type CommentProps = {
  isLogin: boolean
  diaryId: string
  comment: PostComment
  handleToast: (message: string) => void
}

function Cmt({ isReply = false, profile, name, createdAt, content }: CmtProps) {
  return (
    <>
      <div className={`flex-center gap-[3%] ${isReply ? '' : ''}`}>
        <Image
          src={profile}
          alt="user profile"
          width={isReply ? 50 : 60}
          height={isReply ? 50 : 60}
          quality={75}
          loading="lazy"
          draggable="false"
          objectFit="cover"
          className={`${isReply ? 'w-[40px] h-[40px] md:w-[50px] md:h-[50px]' : 'w-[50px] h-[50px] md:w-[60px] md:h-[60px]'} rounded-full border border-border`}
        />
        <div className="flex-grow flex flex-col gap-[3px]">
          <p className={`${isReply ? 'text-[1rem]' : 'text-[1.1rem]'} text-main-blue font-bold`}>
            {name}
          </p>
          <p
            className={`${isReply ? 'text-[0.8rem]' : 'text-[0.8rem] md:text-[0.9rem]'} text-[#999999]`}
          >
            {createdAt.split('T')[0]}
          </p>
        </div>
      </div>
      <p
        className={`text-body-tex px-[5px] ${isReply ? 'border-b pt-[3%] pb-[5%] mb-3 text-[0.9rem]' : 'py-[5%] text-[1rem]'}`}
      >
        {content}
      </p>
    </>
  )
}

export default function Comment({ isLogin, diaryId, comment, handleToast }: CommentProps) {
  const [reply, setReply] = useState<string>('')
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false)
  const { mutateAsync: postReply } = usePostReply()

  const {
    diaryAuthorNickname,
    commentContents,
    createdAt,
    diaryAuthorProfileImage,
    isCommentOwner,
    replies,
  } = comment

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!reply.trim()) {
      handleToast('댓글을 입력하세요!')
      return
    }

    try {
      await postReply({
        diaryId,
        commentId: comment.commentId,
        replyContents: reply,
      })

      setReply('')
    } catch (error) {
      console.error('대댓글 등록 중 오류:', error)
    }
  }

  return (
    <div className="flex flex-col border-b py-[35px]">
      <Cmt
        profile={diaryAuthorProfileImage}
        name={diaryAuthorNickname}
        createdAt={createdAt}
        content={commentContents}
      />
      {(isLogin || (!isLogin && replies && replies.length > 0)) && (
        <div className="self-end flex items-center gap-5">
          {replies && replies.length > 0 && (
            <span className="text-[0.9rem] text-main-blue font-semibold">{replies.length}</span>
          )}
          <Button
            type="button"
            ariaLabel="답글 버튼"
            className="bg-soft-bg rounded-md text-[10px] text-white font-semibold w-[50px] h-[30px] shadow-button hover:bg-[#2D2D2D]"
            onClick={() => setIsCommentOpen((prev) => !prev)}
          >
            {isCommentOpen ? '숨기기' : '답글'}
          </Button>
        </div>
      )}
      <div
        className={` flex flex-col pl-[3%] mt-[30px] gap-[20px] ${isCommentOpen ? 'animate-slideDown' : 'hidden'}`}
      >
        {replies &&
          replies.map((re) => (
            <Cmt
              key={re.replyId}
              isReply
              profile={re.replyAuthorProfileImage}
              name={re.replyAuthorNickname}
              createdAt={re.createdAt}
              content={re.replyContents}
            />
          ))}
        {isLogin && (
          <div className="flex gap-7">
            <div className="w-[20px] h-[20px] border-l-2 border-b-2" />
            <CommentInput isLogin={isLogin} comment={reply} setComment={setReply} />
          </div>
        )}
        <div className="flex justify-end gap-[20px]">
          <Button
            type="button"
            ariaLabel="답글 버튼"
            className="bg-main-blue rounded-md text-[10px] text-white font-semibold w-[50px] h-[30px] self-end shadow-button hover:bg-[#1666DE]"
            onClick={() => setIsCommentOpen(false)}
          >
            {isLogin ? '취소' : '닫기'}
          </Button>
          {isLogin && (
            <Button
              type="button"
              ariaLabel="답글 버튼"
              className="bg-soft-bg rounded-md text-[10px] text-white font-semibold w-[50px] h-[30px] self-end shadow-button hover:bg-[#2D2D2D]"
              onClick={handleButtonClick}
            >
              댓글 작성
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
