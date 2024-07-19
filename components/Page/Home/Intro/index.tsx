import Image from 'next/image'
import IntroTip from '@/components/Tooltip/IntroTip'
import { shapes } from '@/helper/constants/shapes'
import Button from '@/components/Button'
import Marquee from './Marquee'

export default function Intro() {
  const animation = ['animate-floatTop', 'animate-float', 'animate-floatBottom']

  const getAnimation = () => {
    const index = Math.floor(Math.random() * animation.length)
    return animation[index]
  }

  return (
    <>
      <div className="flex flex-col justify-center items-end flex-1 w-[150px] h-[100%] z-10">
        {shapes.left.map(({ color, src, alt }) => (
          <Image
            key={color}
            className={`w-[60%] relative ${color === 'green' ? 'right-[90px]' : 'left-[40px]'} ${getAnimation()}`}
            width={0}
            height={0}
            src={src}
            alt={alt}
            sizes="100vw"
          />
        ))}
      </div>
      <div className="flex-1 flex-center flex-col">
        <IntroTip>좋아하고, 하고 싶은 모든 것을 모아 봐!</IntroTip>
        <Image
          className="w-[260px] h-[263px] z-10 mb-[70px]"
          width={0}
          height={0}
          src="/images/intro.png"
          alt="소개 이미지"
          sizes="100vw"
        />
        <Button
          type="button"
          ariaLabel="start button"
          className="z-10 bg-accent-normal text-[#fff] font-bold px-[50px] py-[10px] rounded-[50px] shadow-tooltip"
        >
          Gather it!
        </Button>
      </div>
      <div className="flex flex-col justify-center items-start flex-1 w-[150px] h-[100%] z-10">
        {shapes.right.map(({ color, src, alt }) => (
          <Image
            key={color}
            className={`w-[60%] animate-float relative ${color === 'red' ? 'left-[90px]' : 'right-[40px]'} ${getAnimation()}`}
            width={0}
            height={0}
            src={src}
            alt={alt}
            sizes="100vw"
          />
        ))}
      </div>
      <Marquee />
    </>
  )
}
