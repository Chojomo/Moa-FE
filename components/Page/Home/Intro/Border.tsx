'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function Border() {
  const { resolvedTheme } = useTheme()

  return (
    <>
      <Image
        src={resolvedTheme === 'light' ? '/images/home/wave.png' : '/images/home/wave-white.png'}
        alt="메인 도형 이미지"
        width={0}
        height={0}
        sizes="100vw"
        quality={75}
        loading="lazy"
        draggable="false"
        className={`absolute w-2/4 md:w-[25%] left-0 top-0 rotate-180 ${resolvedTheme === 'light' ? 'opacity-75' : 'opacity-15'}`}
      />
      <Image
        src={resolvedTheme === 'light' ? '/images/home/wave.png' : '/images/home/wave-white.png'}
        alt="메인 도형 이미지"
        width={0}
        height={0}
        sizes="100vw"
        quality={75}
        loading="lazy"
        draggable="false"
        className={`absolute w-2/4 md:w-[25%] right-0 bottom-0 ${resolvedTheme === 'light' ? 'opacity-75' : 'opacity-15'}`}
      />
    </>
  )
}
