'use client'

import { useState, useEffect } from 'react'
import { Head, Content, CommentPost, Comments, Footer } from '@/components/Page/Diary/Detail'
import { getDiaryDetail } from '@/lib/api/diary'

type Params = {
  id: string
}

export default function DiaryDetail({ params }: { params: Params }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDiaryDetail({ diaryId: params.id })
      console.log(result)
      setData(result)
    }

    fetchData()
  }, [params.id])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[100px] md:pt-[140px] overflow-auto px-[5%] md:px-[20%] pb-[60px]">
      <Head />
      <Content />
      <CommentPost />
      <Comments />
      <Footer />
      <p>{params.id}</p>
    </div>
  )
}
