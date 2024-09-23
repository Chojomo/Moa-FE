'use client'

import { useFadeIn } from '@/hooks/useInViewFade'
import Survey from './Survey'

export default function Right() {
  const { isVisible, elementRef } = useFadeIn<HTMLDivElement>(0.1)

  return (
    <section className="md:w-1/2 h-full flex flex-col items-start justify-center gap-[70px] md:pr-[13%] pr-[6%] py-[13%] md:py-[6%]">
      <article className={`text-start ${isVisible ? 'animate-fadeUp' : ''}`} ref={elementRef}>
        <h2 className="text-heading-text text-[34px] font-bold md:mb-[25px] mb-[20px]">About</h2>
        <div className="text-body-text md:text-[16px] test-[12px] leading-[2]">
          <p>
            안녕하세요 🙋🏻 🙋🏻‍♀️ <span className="inline-block animate-shake mx-[10px]">👋🏻</span>
          </p>
          <p className="md:mb-[35px] mb-[20px]">
            <span className="bg-[#7e7e7e3f] text-[#eb5757] font-semibold px-[10px] py-[5px] rounded">
              MOA
            </span>{' '}
            는 평소 개발하고 싶었던 기능과
            <br />
            학습을 위해 구현한 기능을
            <br /> 모아둔 사이트입니다.
          </p>
          <p>
            본 사이트의 의견이나 응원의 메시지가 있다면,
            <br />
            아래의 폼을 통해 남겨 주세요! 😊
          </p>
        </div>
      </article>
      <Survey />
    </section>
  )
}
