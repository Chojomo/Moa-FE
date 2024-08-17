'use client'

import { posts } from '@/helper/constants/posts'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import Button from '@/components/Button'
import Post from './Post'

type DetailProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function Detail({ setCurrentPage }: DetailProps) {
  const [sort, setSort] = useState<string>('latest')
  const [isTop, setIsTop] = useState<boolean>(false)
  const COOLDOWN = 800

  useEffect(() => {
    const container = document.querySelector('#detail')

    if (!container) {
      return undefined
    }

    const handleWheel: EventListener = (event) => {
      const e = event as WheelEvent
      const { scrollTop } = container as HTMLElement

      if (scrollTop <= 0) {
        if (isTop && e.deltaY < 0) {
          setCurrentPage(1)

          setTimeout(() => {
            container.scrollTop = 0
          }, COOLDOWN)
        } else {
          setIsTop(true)
        }
      } else {
        setIsTop(false)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [isTop, setCurrentPage])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value)
  }

  return (
    <div
      id="detail"
      className="w-[100vw] h-[100vh] flex flex-col overflow-scroll sm:p-[10%] px-[10%] py-[30%] sm:gap-[0px] gap-[40px]"
    >
      <div>
        <Button type="button" ariaLabel="sort-latest">
          최신순
        </Button>
        <Button type="button" ariaLabel="sort-popular">
          최신순
        </Button>
        <Button type="button" ariaLabel="sort-comments">
          최신순
        </Button>
      </div>
      <label htmlFor="sort" className="sr-only">
        정렬 기준
      </label>
      {posts.map((post) => (
        <Post key={post.index} post={post} />
      ))}
    </div>
  )
}
