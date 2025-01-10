'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/useAuth'
import { Head, Content, Like, CommentPost, Comments, Footer } from '@/components/Page/Diary/Detail'
import { getDiaryDetail } from '@/lib/api/diary'
import { isTouchDevice } from '@/utils'
import { Post, Comment } from '@/types/diary'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Params = {
  id: string
}

export default function DiaryDetail({ params }: { params: Params }) {
  const { isLogin } = useAuthStore()
  const [post, setPost] = useState<Post | null>(null)
  const [comment, setComment] = useState<Comment[] | null>(null)
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

  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[100px] md:pt-[140px] overflow-auto px-[5%] md:px-[20%] pb-[60px]">
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
          handleCommentsUpdate={handleCommentsUpdate}
        />
      </div>
      <Comments
        isLogin={isLogin}
        diaryId={post.diaryId}
        comments={comment}
        commentCount={post.commentCount}
      />
      <div ref={scrollRef} />
      <Footer
        isLogin={isLogin}
        diaryId={post.diaryId}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        isLike={isLike}
        setIsLike={setIsLike}
        handleLikeClick={handleLikeClick}
        handleCommentClick={handleCommentClick}
        isDiaryOwner={post.isDiaryOwner}
      />
    </div>
  )
}
