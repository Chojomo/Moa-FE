'use client'

import { useState, useEffect } from 'react'
import { Head, Content, Like, CommentPost, Comments, Footer } from '@/components/Page/Diary/Detail'
import { getDiaryDetail } from '@/lib/api/diary'

type Params = {
  id: string
}

type Comment = {
  commentAuthorId: string
  commentContents: string
  commentId: string
  createdAt: string
  diaryAuthorNickname: string
  diaryAuthorProfileImage: string
  isCommentOwner: boolean
  isLiked: boolean
  likeCount: number
}

type Post = {
  comment: Comment[]
  commentCount: number
  diaryAuthorId: string
  diaryAuthorNickname: string
  diaryAuthorProfileImage: string
  diaryContents: string
  diaryId: string
  diaryPublishedAt: string
  diaryThumbnail: string
  diaryTitle: string
  isDiaryOwner: boolean
  isDiaryPublic: boolean
  isLiked: boolean
  likeCount: number
  viewCount: number
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
      <Head
        diaryId={post.diaryId}
        title={post.diaryTitle}
        profile={post.diaryAuthorProfileImage}
        publishedAt={post.diaryPublishedAt}
      />
      <Content content={post.diaryContents} />
      <Like diaryId={post.diaryId} isLiked={post.isLiked} />
      <CommentPost diaryId={post.diaryId} profile={post.diaryAuthorProfileImage} />
      <Comments commentCount={post.commentCount} />
      <Footer diaryId={post.diaryId} isLiked={post.isLiked} />
    </div>
  )
}
