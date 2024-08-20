'use client'

import { posts } from '@/helper/constants/posts'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import Post from './Post'

type DetailProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function Detail({ setCurrentPage }: DetailProps) {
  const [sort, setSort] = useState<string>('latest')
  const [sortIsOpen, setSortIsOpen] = useState<boolean>(false)
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

  const handleClick = (sortKey: string) => {
    setSort(sortKey)
    setSortIsOpen(false)
  }

  const buttons = [
    { sort: 'latest', label: 'sort-latest', innerText: '최신순' },
    { sort: 'popular', label: 'sort-popular', innerText: '인기순' },
    { sort: 'comments', label: 'sort-comments', innerText: '댓글순' },
  ]

  return (
    <div
      id="detail"
      className="w-[100vw] h-[100vh] flex flex-col overflow-scroll sm:p-[10%] px-[10%] py-[30%] sm:gap-[0px] gap-[40px]"
    >
      <div
        className={`self-end ${sortIsOpen ? 'w-[400px] gap-[35px]' : 'w-[150px] gap-[10px]'} h-[50px] flex-center rounded-full border border-border text-accent font-bold`}
      >
        <Button
          type="button"
          ariaLabel="sort button"
          className="p-[10px]"
          onClick={() => setSortIsOpen(!sortIsOpen)}
        >
          <Icon name={`${sortIsOpen ? 'SortClose' : 'SortOpen'}`} width={8} height={14} />
        </Button>
        {buttons.map(
          (button) =>
            (sortIsOpen || sort === button.sort) && (
              <Button
                key={button.sort}
                type="button"
                ariaLabel={button.label}
                className="px-[10px] py-[20px]"
                onClick={() => handleClick(button.sort)}
              >
                {button.innerText}
              </Button>
            )
        )}
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
