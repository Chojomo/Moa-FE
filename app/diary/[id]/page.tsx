'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuth'
import { Head, Content, Like, CommentPost, Comments, Footer } from '@/components/Page/Diary/Detail'
import { getDiaryDetail } from '@/lib/api/diary'
import { Post } from '@/types/diary'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Params = {
  id: string
}

export default function DiaryDetail({ params }: { params: Params }) {
  const { isLogin } = useAuthStore()
  const [post, setPost] = useState<Post | null>(null)
  const [isLike, setIsLike] = useState<boolean>(false)

  useEffect(() => {
    const getPopst = async () => {
      const { data } = await getDiaryDetail({ diaryId: params.id })
      setPost(data)
      setIsLike(data.isLiked)
    }

    getPopst()
  }, [params.id])

  if (!post) {
    return <div>Loading...</div>
  }

  const handleToast = (message: string) => {
    toast.error(message)
  }

  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[100px] md:pt-[140px] overflow-auto px-[5%] md:px-[20%] pb-[60px]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Head post={post} isLogin={isLogin} />
      <Content
        content={post.diaryContents}
        isDiaryOwner={post.isDiaryOwner}
        isDiaryPublic={post.isDiaryPublic}
      />
      <Like
        diaryId={post.diaryId}
        isLike={isLike}
        setIsLike={setIsLike}
        isLogin={isLogin}
        handleToast={handleToast}
      />
      <CommentPost
        diaryId={post.diaryId}
        profile={post.diaryAuthorProfileImage}
        isLogin={isLogin}
        handleToast={handleToast}
      />
      <Comments
        isLogin={isLogin}
        comments={post.comment.comments}
        commentCount={post.commentCount}
      />
      <Footer diaryId={post.diaryId} isLike={isLike} setIsLike={setIsLike} />
    </div>
  )
}
