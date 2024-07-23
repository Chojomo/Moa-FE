'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function SurveyImage() {
  const { resolvedTheme } = useTheme()
  const light = '/images/survey-light.png'
  const dark = '/images/survey-dark.png'

  return (
    <Image
      className="max-w-[300px] w-auto max-h-[330px] h-[50%] z-0"
      width={0}
      height={0}
      src={resolvedTheme === 'light' ? light : dark}
      alt="설문 이미지"
      sizes="100vw"
    />
  )
}
