'use client'

import { useFadeIn } from '@/hooks/useInViewFade'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Left() {
  const { resolvedTheme } = useTheme()
  const { isVisible, elementRef } = useFadeIn<HTMLImageElement>(0.1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="absolute md:relative md:w-1/2 h-full flex-center">
      <Image
        ref={elementRef}
        src={
          resolvedTheme === 'light'
            ? '/images/home/tech-life-light.png'
            : '/images/home/tech-life-dark.png'
        }
        alt="원 안에서 노트북을 보는 사람"
        width={0}
        height={0}
        sizes="100vw"
        quality={75}
        loading="lazy"
        draggable="false"
        className={`max-w-[450px] w-3/4 h-auto opacity-20  md:opacity-90 ${
          !isMobile && isVisible ? 'animate-fadeUp' : ''
        }`}
      />
    </section>
  )
}
