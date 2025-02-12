'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'
import { Comment as PostComment, Reply } from '@/types/diary'

import usePostReply from '@/hooks/comment/usePostReply'
import usePatchReply from '@/hooks/comment/usePatchReply'
import usePatchComment from '@/hooks/comment/usePatchComment'
import useDeleteComment from '@/hooks/comment/useDeleteComment'

import { toast } from 'react-toastify'
import CommentInput from '../../CommentInput'
import CommentButton from '../Button'

type CmtProps = {
  isReply?: boolean
  diaryId: string
  commentId: string
  isOwner: boolean
  profile: string
  name: string
  createdAt: string
  content: string
  isLogin: boolean
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
  handleDeleteComment: (commentId: string, isReply?: boolean) => void
}

type CommentProps = {
  isLogin: boolean
  diaryId: string
  comment: PostComment
  handleAddReply: (commentId: string, newReply: Reply) => void
  handleDeleteComment: (commentId: string, isReply?: boolean) => void
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
}

function Cmt({
  isReply = false,
  diaryId,
  commentId,
  isOwner,
  profile,
  name,
  createdAt,
  content,
  isLogin,
  setCommentCount,
  handleDeleteComment,
}: CmtProps) {
  const [isEdit, setIsEdit] = useState(false)
  const [comment, setComment] = useState(content)
  const { mutateAsync: patchComment } = usePatchComment()
  const { mutateAsync: patchReply } = usePatchReply()
  const { mutateAsync: deleteComment } = useDeleteComment()

  const handleDelete = async () => {
    setCommentCount((prev: number) => prev - 1)

    try {
      handleDeleteComment(commentId, isReply)
      await deleteComment({ diaryId, commentId })
    } catch (error) {
      console.error('댓글 삭제 중 오류:', error)
    }
  }

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
        {isOwner && (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              ariaLabel="댓글 수정 버튼"
              className="p-2 text-[0.9rem] hover:text-main-blue hover:underline"
              onClick={() => {
                setIsEdit(true)
              }}
            >
              수정
            </Button>
            <Button
              type="button"
              ariaLabel="댓글 삭제 버튼"
              className="p-2 text-[0.9rem] hover:text-main-blue hover:underline"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>
        )}
      </div>
      <div
        className={`text-body-text px-[5px] ${isReply ? 'border-b pt-[3%] pb-[5%] mb-3 text-[0.9rem]' : 'py-[5%] text-[1rem]'}`}
      >
        {!isEdit ? (
          comment
        ) : (
          <div className="flex flex-col gap-7">
            <CommentInput isLogin={isLogin} comment={comment} setComment={setComment} />
            <div className="flex justify-end gap-[20px]">
              <CommentButton
                type="cancel"
                text="취소"
                handleClick={() => {
                  setIsEdit(false)
                  setComment(content)
                }}
              />
              <CommentButton
                type="edit"
                text="댓글 수정"
                handleClick={async () => {
                  try {
                    if (!isReply) {
                      await patchComment({ diaryId, commentId, commentContents: comment })
                    } else {
                      await patchReply({ diaryId, replyId: commentId, replyContents: comment })
                    }

                    setComment(comment)
                    setIsEdit(false)
                  } catch (error) {
                    console.error('댓글 수정 중 오류:', error)
                  }
                }}
              />
            </div>
            {!isReply && <div className="border w-full my-[20px]" />}
          </div>
        )}
      </div>
    </>
  )
}

export default function Comment({
  isLogin,
  diaryId,
  comment,
  handleAddReply,
  handleDeleteComment,
  setCommentCount,
}: CommentProps) {
  const {
    diaryAuthorNickname,
    commentAuthorNickname,
    commentContents,
    commentId,
    createdAt,
    diaryAuthorProfileImage,
    commentAuthorProfileImage,
    isCommentOwner,
    replies,
  } = comment

  const [reply, setReply] = useState<string>('')
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false)
  const { mutateAsync: postReply } = usePostReply()

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!reply.trim()) {
      toast.error('댓글을 입력하세요!')
      return
    }

    try {
      const { data: newReply } = await postReply({
        diaryId,
        commentId,
        replyContents: reply,
      })

      handleAddReply(commentId, newReply)

      setReply('')
      setCommentCount((prev: number) => prev + 1)
    } catch (error) {
      console.error('대댓글 등록 중 오류:', error)
    }
  }

  return (
    <div className="flex flex-col border-b py-[35px]">
      <Cmt
        diaryId={diaryId}
        commentId={commentId}
        isOwner={isCommentOwner}
        profile={commentAuthorProfileImage ?? diaryAuthorProfileImage}
        name={commentAuthorNickname ?? diaryAuthorNickname}
        createdAt={createdAt}
        content={commentContents}
        isLogin={isLogin}
        setCommentCount={setCommentCount}
        handleDeleteComment={handleDeleteComment}
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
              diaryId={diaryId}
              commentId={re.replyId}
              isOwner={re.isReplyOwner}
              profile={re.replyAuthorProfileImage}
              name={re.replyAuthorNickname}
              createdAt={re.createdAt}
              content={re.replyContents}
              isLogin={isLogin}
              setCommentCount={setCommentCount}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        {isLogin && (
          <div className="flex gap-7">
            <div className="w-[20px] h-[20px] border-l-2 border-b-2" />
            <CommentInput isLogin={isLogin} comment={reply} setComment={setReply} />
          </div>
        )}
        <div className="flex justify-end gap-[20px]">
          <CommentButton
            type="cancel"
            text={isLogin ? '취소' : '닫기'}
            handleClick={() => setIsCommentOpen(false)}
          />
          {isLogin && (
            <CommentButton type="edit" text="댓글 작성" handleClick={handleButtonClick} />
          )}
        </div>
      </div>
    </div>
  )
}
