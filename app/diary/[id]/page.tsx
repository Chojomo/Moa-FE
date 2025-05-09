'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/useAuth'
import { Head, Content, Like, CommentPost, Comments, Footer } from '@/components/Page/Diary/Detail'
import { getDiaryDetail } from '@/lib/api/diary'
import { isTouchDevice } from '@/utils'
import { Post, Comment, Reply } from '@/types/diary'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Params = {
  id: string
}

export default function DiaryDetail({ params }: { params: Params }) {
  const { isLogin } = useAuthStore()
  const [post, setPost] = useState<Post | null>(null)
  const [comment, setComment] = useState<Comment[] | []>([])
  const [commentCount, setCommentCount] = useState<number>(0)
  const [isLike, setIsLike] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)

  const commentPostRef = useRef<HTMLDivElement>(null)
  const likeRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getPopst = async () => {
      const { data } = await getDiaryDetail({ diaryId: params.id })
      setPost(data)
      setComment(data.comment.comments)
      setCommentCount(data.commentCount)

      if (isLogin) {
        setIsLike(data.isLiked)
        setLikeCount(data.likeCount)
      }
    }

    getPopst()
  }, [params.id, isLogin])

  if (!post) {
    return <div>Loading...</div>
  }

  const handleCommentClick = () => {
    if (commentPostRef.current) {
      commentPostRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleLikeClick = () => {
    if (likeRef.current) {
      likeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleCommentsUpdate = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  const handleAddReply = (commentId: string, newReply: Reply) => {
    setComment((prev: Comment[]) =>
      prev.map((c) =>
        c.commentId === commentId
          ? {
              ...c,
              replies: c.replies ? [...c.replies, newReply] : [newReply],
            }
          : c
      )
    )
  }

  const handleDeleteComment = (commentId: string, isReply: boolean = false) => {
    if (!isReply) {
      const commentToDelete = comment.find((c) => c.commentId === commentId)

      if (commentToDelete) {
        const deleteCommentCount = commentToDelete.replies?.length || 0
        setCommentCount((prev) => prev - deleteCommentCount)
      }

      setComment((prev) => prev.filter((c) => c.commentId !== commentId))
    } else {
      setComment((prev: Comment[]) => {
        const newComment = prev.map((c) => ({
          ...c,
          replies: c.replies?.filter((r: Reply) => r.replyId !== commentId),
        }))

        return newComment
      })
    }
  }

  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[100px] md:pt-[140px] overflow-auto diary-padding pb-[60px]">
      <ToastContainer
        position={`${isTouchDevice() ? 'top-right' : 'top-right'}`}
        autoClose={3000}
        hideProgressBar={false}
        style={{
          top: 74,
        }}
      />
      <Head post={post} isLogin={isLogin} />
      <Content
        content={post.diaryContents}
        isDiaryOwner={post.isDiaryOwner}
        isDiaryPublic={post.isDiaryPublic}
      />
      <div ref={likeRef}>
        <Like
          diaryId={post.diaryId}
          setLikeCount={setLikeCount}
          isLike={isLike}
          setIsLike={setIsLike}
          isLogin={isLogin}
        />
      </div>
      <div ref={commentPostRef}>
        <CommentPost
          diaryId={post.diaryId}
          profile={post.diaryAuthorProfileImage}
          isLogin={isLogin}
          setComment={setComment}
          setCommentCount={setCommentCount}
          handleCommentsUpdate={handleCommentsUpdate}
        />
      </div>
      <Comments
        isLogin={isLogin}
        diaryId={post.diaryId}
        comments={comment}
        handleAddReply={handleAddReply}
        handleDeleteComment={handleDeleteComment}
        commentCount={commentCount}
        setCommentCount={setCommentCount}
      />
      <div ref={scrollRef} />
      <Footer
        isLogin={isLogin}
        diaryId={post.diaryId}
        likeCount={likeCount}
        isLike={isLike}
        commentCount={commentCount}
        handleLikeClick={handleLikeClick}
        handleCommentClick={handleCommentClick}
        isDiaryOwner={post.isDiaryOwner}
      />
    </div>
  )
}
