'use client'

import { useState, useEffect } from 'react'
import { Head, Content, CommentPost, Comments, Footer } from '@/components/Page/Diary/Detail'
import { getDiaryDetail } from '@/lib/api/diary'

type Params = {
  id: string
}

type Post = {
  diaryContents: string
  diaryId: string
  diaryStatus: number
  diaryThumbnail: null | string
  diaryTitle: string
  isDiaryPublic: boolean
}

export default function DiaryDetail({ params }: { params: Params }) {
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const getPopst = async () => {
      const { data } = await getDiaryDetail({ diaryId: params.id })
      setPost(data)
    }

    getPopst()
  }, [params.id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[100px] md:pt-[140px] overflow-auto px-[5%] md:px-[20%] pb-[60px]">
      <Head title={post.diaryTitle} />
      <Content content={post.diaryContents} />
      <CommentPost />
      <Comments />
      <Footer />
    </div>
  )
}
