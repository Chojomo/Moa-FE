import Image from 'next/image'
import IntroTip from '@/components/Tooltip/IntroTip'
import { shapes } from '@/helper/constants/shapes'
import Button from '@/components/Button'
import Marquee from './Marquee'
import IntroImage from './IntroImage'

export default function Intro() {
  const animation = [
    'animate-float1',
    'animate-float2',
    'animate-float3',
    'animate-float4',
    'animate-float5',
    'animate-float6',
  ]

  return (
    <>
      <div className="relative flex lg:flex-col lg:items-end lg:justify-center justify-between items-center flex-1 w-[100%] h-[100%] z-10 lg:px-[0%] px-[10%]">
        {shapes.left.map(({ color, src, alt }, index: number) => (
          <Image
            key={color}
            className={`lg:w-[51%] md:w-[25%] w-[30%] relative ${color === 'green' ? 'lg:right-[90px]' : 'lg:left-[40px] lg:top-[0px] top-[30px]'} ${animation[index]}`}
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
        <IntroImage />
        <Button
          type="button"
          ariaLabel="start button"
          className="z-10 bg-accent-normal text-[#fff] font-bold px-[63px] py-[15px] rounded-[50px] shadow-lg transform hover:scale-[1.1] transition-transform duration-200"
        >
          Gather it!
        </Button>
      </div>
      <div className="flex lg:flex-col lg:items-start lg:justify-center justify-between items-center flex-1 w-[100%] h-[100%] z-10 lg:px-[0%] px-[10%]">
        {shapes.right.map(({ color, src, alt }, index: number) => (
          <Image
            key={color}
            className={`lg:w-[51%] md:w-[25%] w-[30%] animate-float relative ${color === 'red' ? 'lg:left-[90px]' : 'lg:right-[40px] lg:bottom-[0px] bottom-[40px]'} ${animation[index + 3]}`}
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
