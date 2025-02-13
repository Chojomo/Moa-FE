'use client'

import { useState, useEffect } from 'react'

type ArrowTipProps = {
  children?: React.ReactNode
}

export default function ArrowTip({ children }: ArrowTipProps) {
  const [isFading, setIsFading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 3000)

    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 4000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  const handleClick = () => {
    setIsFading(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 1000)
  }

  if (!isVisible) return null

  const baseStyle = `absolute bottom-[80px] left-[7px] rounded-[4px] text-[12px] text-[#fff] bg-[#333333f1] animate-floatL1 px-[12px] py-[10px]`

  const fadeOutStyle = {
    transition: 'opacity 1s ease-in-out',
    opacity: isFading ? 0 : 1,
  }

  return (
    <button
      className={`${baseStyle} tooltip tooltip-arrow`}
      style={fadeOutStyle}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
