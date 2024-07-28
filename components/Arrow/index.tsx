'use client'

import { useState, useEffect, useRef } from 'react'
import { Icon } from '../Icon'
import { ArrowTip } from '../Tooltip'

export default function Arrow() {
  const lastY = useRef<number>(0)
  const isWheeling = useRef<boolean>(false)
  const [arrow, setArrow] = useState<string>('Next')

  const COOLDOWN = 800

  useEffect(() => {
    const ele = document.querySelector('#scroller') as HTMLElement | null

    if (!ele) {
      return undefined
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isWheeling.current) {
        return
      }

      isWheeling.current = true

      const { clientHeight, scrollTop } = ele
      const direction = e.deltaY > 0 ? 1 : -1
      lastY.current = scrollTop

      if (direction > 0) {
        ele.scrollTop = clientHeight
        setArrow('Prev')
      } else {
        ele.scrollTop = 0
        setArrow('Next')
      }

      setTimeout(() => {
        isWheeling.current = false
      }, COOLDOWN)
    }

    ele.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      ele.removeEventListener('wheel', handleWheel as EventListener)
    }
  }, [])

  const handleClick = () => {
    const ele = document.querySelector('#scroller') as HTMLElement | null

    if (ele) {
      const { clientHeight, scrollTop } = ele
      if (scrollTop < clientHeight) {
        ele.scrollTop = clientHeight
        setArrow('Prev')
      } else {
        ele.scrollTop = 0
        setArrow('Next')
      }
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
