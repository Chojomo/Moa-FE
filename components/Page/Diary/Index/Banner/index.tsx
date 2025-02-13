'use client'

import { useState, useEffect } from 'react'
import { Diary } from '@/types/diary'
import { getDiarys } from '@/lib/api/diary'
import Arrow from './Arrow'
import Progress from './Progress'
import PopularPost from '../Popular'

export default function Banner() {
  const [posts, setPosts] = useState<Diary[] | null>(null)
  const [step, setStep] = useState(1)
  const postIndex = step - 1 || 0

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDiarys({ pageParam: 0, sortType: 'viewCount' })
      const diarys = data?.data?.diaryPreviewList

      console.log(diarys)

      setPosts(diarys)
    }

    getPosts()
  }, [])

  return (
    <section className="w-full h-[450px] md:h-[270px] flex-center flex-col-reverse md:flex-center md:flex-row gap-[10%] bg-banner-bg py-[20px] md:py-[40px]">
      <div className="md:max-w-[300px] md:h-full flex flex-col justify-between">
        <div className="h-[full] flex flex-col">
          <h3 className="text-white text-[18px] md:text-[24px] font-bold mb-[20px]">인기 게시물</h3>
          <p className="text-[#FFFFFFCC] text-[16px] mb-[52px]">
            현재 최고 인기 있는 게시물을 살펴 보세요
          </p>
        </div>
        <Progress step={step} setStep={setStep} />
      </div>
      {posts && <PopularPost key={postIndex} post={posts[step - 1]} />}
      <Arrow setStep={setStep} />
    </section>
  )
}
