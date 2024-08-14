'use client'

import { useEffect, useState, Dispatch, SetStateAction } from 'react'

type DetailProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function Detail({ setCurrentPage }: DetailProps) {
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

  return (
    <div id="detail" className="w-[100vw] h-[100vh] flex flex-col overflow-scroll">
      <p>Detail</p>
      <p>Detail</p>
      <p>Detail</p>
    </div>
  )
}
