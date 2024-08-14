'use client'

import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Icon } from '../Icon'
import { ArrowTip } from '../Tooltip'

type ArrowProps = {
  selector: string
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function ScrollArrow({ selector, currentPage, setCurrentPage }: ArrowProps) {
  const [arrow, setArrow] = useState<string>('Next')

  useEffect(() => {
    const scroller = document.querySelector(selector) as HTMLElement | null

    if (!scroller) {
      return
    }

    if (currentPage === 1) {
      scroller.scrollTop = 0
      setArrow('Next')
    } else if (currentPage === 2) {
      scroller.scrollTop = window.innerHeight
      setArrow('Prev')
    }
  }, [currentPage, selector])

  const handleClick = () => {
    const scroller = document.querySelector(selector) as HTMLElement | null

    if (!scroller) {
      return
    }

    if (currentPage === 1) {
      scroller.scrollTop = window.innerHeight
      setCurrentPage(2)
      setArrow('Prev')
    } else {
      scroller.scrollTop = 0
      setCurrentPage(1)
      setArrow('Next')
    }
  }

  return (
    <div className="z-30 fixed left-1/2 bottom-[10px] transform -translate-x-1/2">
      <ArrowTip>더 탐색하기</ArrowTip>
      <button
        type="button"
        aria-label="next"
        className="relative animate-float p-[20px]"
        onClick={handleClick}
      >
        <Icon name={arrow} width={53} height={26} />
      </button>
    </div>
  )
}
