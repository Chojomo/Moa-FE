'use client'

import { Icon } from '@/components/Icon'
import { posts } from '@/helper/constants/popular'
import { useEffect, Dispatch, SetStateAction, useState } from 'react'
import PopularCard from './PopularCard'

type IntroProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function Intro({ setCurrentPage }: IntroProps) {
  const [isBottom, setIsBottom] = useState<boolean>(false)
  const COOLDOWN = 800

  useEffect(() => {
    const container = document.querySelector('#intro')

    if (!container) {
      return undefined
    }

    const handleWheel: EventListener = (event) => {
      const e = event as WheelEvent
      const { scrollHeight, scrollTop, clientHeight } = container as HTMLElement
      const totalHeight = scrollHeight - clientHeight

      if (scrollTop >= totalHeight) {
        if (isBottom && e.deltaY > 0) {
          setCurrentPage(2)

          setTimeout(() => {
            container.scrollTop = 0
          }, COOLDOWN)
        } else {
          setIsBottom(true)
        }
      } else {
        setIsBottom(false)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [isBottom, setCurrentPage])

  return (
    <div
      id="intro"
      className="w-[100vw] h-[100vh] flex-center flex-col sm:gap-[50px] gap-[20px] overflow-scroll py-[100px] px-[20px]"
    >
      <div className="flex-center flex-col sm:gap-[20px] gap-[10px]">
        <i className="w-[70px] h-[70px] flex-center rounded-full bg-icon-bg">
          <Icon name="Crown" width={36} height={34} />
        </i>
        <h1 className="sm:text-[24px] text-[18px] text-heading-text font-bold">most popular</h1>
      </div>
      <div className="w-[100%] flex-center sm:flex-row flex-col gap-[20px] sm:gap-[40px]">
        {posts.map((post) => (
          <PopularCard key={post.index} post={post} />
        ))}
      </div>
    </div>
  )
}
