'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function IntroImage() {
  const { resolvedTheme } = useTheme()
  const light = '/images/intro-light.png'
  const dark = '/images/intro-dark.png'

  return (
    <Image
      className="w-[260px] h-[263px] z-10 mb-[60px]"
      width={0}
      height={0}
      src={resolvedTheme === 'light' ? light : dark}
      alt="소개 이미지"
      sizes="100vw"
    />
  )
}
