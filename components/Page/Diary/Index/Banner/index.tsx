'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDiarys } from '@/lib/api/diary'
import Arrow from './Arrow'
import Progress from './Progress'
import PopularPost from '../Popular'

export default function Banner() {
  const [step, setStep] = useState(1)

  const { data } = useQuery({
    queryKey: ['diaries'],
    queryFn: () => getDiarys({ pageParam: 0, sortType: 'viewCounts' }),
    staleTime: 5 * 60 * 1000,
  })

  const posts = data?.data?.diaryPreviewList
  const postIndex = step - 1

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
      {posts && <PopularPost key={postIndex} post={posts[postIndex]} />}
      <Arrow setStep={setStep} />
    </section>
  )
}
