'use client'

import { useState, useEffect } from 'react'
import { Icon } from '../Icon'
import { ArrowTip } from '../Tooltip'

export default function Arrow() {
  const [arrow, setArrow] = useState<string>('Next')

  useEffect(() => {
    const ele = document.querySelector('#scroller') as HTMLElement | null

    const handleScroll = () => {
      if (ele) {
        const { scrollTop, clientHeight } = ele

        if (scrollTop < clientHeight) {
          setArrow('Next')
        } else {
          setArrow('Prev')
        }
      }
    }

    if (ele) {
      ele.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (ele) {
        ele.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleClick = () => {
    const ele = document.querySelector('#scroller') as HTMLElement | null

    if (ele) {
      const { clientHeight, scrollTop } = ele
      if (scrollTop < clientHeight) {
        ele.scrollTop = clientHeight
      } else {
        ele.scrollTop = 0
      }
    }
  }

  return (
    <div className="fixed left-1/2 bottom-[10px] transform -translate-x-1/2">
      <ArrowTip>더 탐색하기</ArrowTip>
      <button
        type="button"
        aria-label="next"
        className="relative animate-float p-[20px] z-30"
        onClick={handleClick}
      >
        <Icon name={arrow} width={53} height={26} />
      </button>
    </div>
  )
}
