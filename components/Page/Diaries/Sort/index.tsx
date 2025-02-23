'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Sort() {
  const pathname = usePathname()
  console.log(pathname.split('/').at(-1))
  const [sort, setSort] = useState(pathname.split('/').at(-1))

  const buttons = [
    { type: 'publishedAt', text: '최신' },
    { type: 'viewCount', text: '조회' },
    { type: 'likeCount', text: '인기' },
    { type: 'commentCount', text: '댓글' },
  ]

  return (
    <div className="w-full h-[50px] flex-center my-[45px]">
      <div className="relative bg-sort-bg w-[320px] h-[50px] rounded-full flex justify-between px-2 text-black font-semibold">
        {buttons.map(({ type, text }) => (
          <Link
            key={type}
            href={`/diaries/${type}`}
            className={`flex-1 flex-center z-10 ${sort !== type ? 'text-white transition-all duration-700 delay-100' : ''}`}
            onClick={() => setSort(type)}
          >
            {text}
          </Link>
        ))}
        <div
          className="absolute top-[5px] bg-white w-[74px] h-[40px] rounded-full transition-all duration-700"
          style={{
            left: (() => {
              if (sort === 'publishedAt') return '9px'
              if (sort === 'viewCount') return '86px'
              if (sort === 'likeCount') return '161px'
              return '238px'
            })(),
          }}
        />
      </div>
    </div>
  )
}
