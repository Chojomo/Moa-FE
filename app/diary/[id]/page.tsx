'use client'

import { useState, useEffect } from 'react'
import { Head, Content, Like, CommentPost, Comments, Footer } from '@/components/Page/Diary/Detail'
import { getDiaryDetail } from '@/lib/api/diary'
import { Post } from '@/types/diary'

type Params = {
  id: string
}

export default function DiaryDetail({ params }: { params: Params }) {
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const getPopst = async () => {
      const { data } = await getDiaryDetail({ diaryId: params.id })
      setPost(data)
      console.log(data)
    }

    getPopst()
  }, [params.id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[100px] md:pt-[140px] overflow-auto px-[5%] md:px-[20%] pb-[60px]">
      <Head post={post} />
      <Content content={post.diaryContents} />
      <Like diaryId={post.diaryId} isLiked={post.isLiked} />
      <CommentPost diaryId={post.diaryId} profile={post.diaryAuthorProfileImage} />
      <Comments commentCount={post.commentCount} />
      <Footer diaryId={post.diaryId} isLiked={post.isLiked} />
    </div>
  )
}
