'use client'

import { useState } from 'react'
import { HUD, Intro, Canvas } from '@/components/Page/SuikaGame'
import { Items } from '@/helper/constants/suikaGame/items'
import { getRandomItem } from '@/features/suikaGame'
import GameModal from '@/components/Page/SuikaGame/Modal'

export default function SG() {
  const [score, setScore] = useState<number>(0)
  const [isStart, setIsStart] = useState<boolean>(true)
  const [isRestart, setIsRestart] = useState<boolean>(false)
  const [isGameOver, setIsGameOver] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const [nextItem, setNextItem] = useState<Items>(getRandomItem()?.label as Items)

  return (
    <div className="w-[100dvw] h-[100dvh] flex-center overflow-hidden pt-[74px]">
      <div
        className={`w-full h-full relative top-0 flex-center flex-col  gap-[8px] ${isStart ? 'visible' : 'invisible'}`}
      >
        <div className="w-full h-full bg-[#FFDCC8] flex-center flex-col overflow-hidden gap-[20px] canvas-border">
          <HUD score={score} nextItem={nextItem} />
          <Canvas
            setNextItem={setNextItem}
            score={score}
            setScore={setScore}
            setIsGameOver={setIsGameOver}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isRestart={isRestart}
            setIsRestart={setIsRestart}
          />
        </div>
      </div>
      <Intro isVisible={!isStart} handleGameStart={() => setIsStart(true)} />
    </div>
  )
}
