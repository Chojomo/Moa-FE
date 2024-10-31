'use client'

import { useState } from 'react'
import Button from '@/components/Button'

export default function Sort() {
  const [sort, setSort] = useState<string>('popular')

  const buttons = [
    { type: 'latest', text: '최신' },
    { type: 'popular', text: '인기' },
    { type: 'comments', text: '댓글' },
  ]

  return (
    <div className="w-full h-[50px] flex-center my-[45px]">
      <div className="relative bg-sort-bg w-[250px] h-[50px] rounded-full flex justify-between px-2 text-black font-semibold">
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
          className={`absolute top-[5px] bg-white w-[78px] h-[40px] rounded-full transition-all duration-700`}
          style={{ left: `${sort === 'latest' ? 7 : sort === 'popular' ? 86 : 164}px` }}
        />
      </div>
    </div>
  )
}
