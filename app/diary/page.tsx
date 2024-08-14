'use client'

import { useState } from 'react'
import Pages from '@/components/Page/Diary'
import ScrollArrow from '@/components/Arrow/ScrollArrow'

export default function Diary() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <div
      id="diary-scroller"
      className="relative bg-background w-[100vw] h-[100vh] overflow-hidden scroll-smooth"
    >
      <div className="h-[200vh]">
        {Pages.map(({ name, Component }) => (
          <Component key={name} setCurrentPage={setCurrentPage} />
        ))}
        <ScrollArrow
          selector="#diary-scroller"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}
