import { Fruits } from '@/helper/constants/fruits'
import Image from 'next/image'
import Button from '@/components/Button'

type IntroProps = {
  isVisible: boolean
  handleGameStart: () => void
}

// /images/pebble/red-pebble2.png

export default function Intro({ isVisible, handleGameStart }: IntroProps) {
  const positionCircularly = (totalElements: number, index: number) => {
    const radius = 150
    const angle = (2 * Math.PI * index) / totalElements

    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)

    return {
      top: `calc(50% + ${y}px - 24px)`,
      left: `calc(50% + ${x}px - 24px)`,
    }
  }

  const fruitItemEls = Object.keys(Fruits)
    .slice(0, Object.keys(Fruits).length - 1)
    .map((fruit, index) => {
      const itemPositions = positionCircularly(11, index)

      return (
        <li
          key={fruit}
          className="absolute w-[48px] h-[48px] bg-center bg-contain bg-no-repeat animate-spinList"
          style={{
            top: itemPositions.top,
            left: itemPositions.left,
          }}
        >
          <Image
            src={`/images/fruits/${fruit}.png`}
            alt={`${fruit} 이미지`}
            quality={75}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            draggable="false"
          />
        </li>
      )
    })

  return (
    <div className="w-full h-full fixed top-0 left-0 flex-center select-none">
      {/* <div className="w-full h-full fixed top-0 left-0 flex-center bg-gradient-to-b select-none"> */}
      <ul className="animate-spin">{fruitItemEls}</ul>
      <div className="absolute w-full h-full flex-center">
        <Button
          type="button"
          ariaLabel="게임 시작 버튼"
          className="p-2 text-[1.1rem] font-semibold"
          onClick={handleGameStart}
        >
          GAME START
        </Button>
      </div>
    </div>
  )
}
