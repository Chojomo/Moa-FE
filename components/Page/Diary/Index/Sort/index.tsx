'use client'

import { Dispatch, SetStateAction } from 'react'
import Button from '@/components/Button'

type SortProps = {
  sort: string
  setSort: Dispatch<SetStateAction<string>>
}

export default function Sort({ sort, setSort }: SortProps) {
  const buttons = [
    { type: 'publishedAt', text: '최신' },
    { type: 'viewCounts', text: '조회' },
    { type: 'totalLikes', text: '인기' },
    { type: 'totalcomments', text: '댓글' },
  ]

  return (
    <div className="w-full h-[50px] flex-center my-[45px]">
      <div className="relative bg-sort-bg w-[320px] h-[50px] rounded-full flex justify-between px-2 text-black font-semibold">
        {buttons.map(({ type, text }) => (
          <Button
            key={type}
            type="button"
            ariaLabel={`sort ${type} button`}
            className={`flex-1 z-10 ${sort !== type ? 'text-white transition-all duration-700 delay-100' : ''}`}
            onClick={() => setSort(type)}
          >
            {text}
          </Button>
        ))}
        <div
          className="absolute top-[5px] bg-white w-[78px] h-[40px] rounded-full transition-all duration-700"
          style={{
            left: (() => {
              if (sort === 'publishedAt') return '7px'
              if (sort === 'viewCounts') return '86px'
              if (sort === 'totalLikes') return '164px'
              return '235px'
            })(),
          }}
        />
      </div>
    </div>
  )
}
