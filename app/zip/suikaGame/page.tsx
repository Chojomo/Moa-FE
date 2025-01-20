'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Intro, Canvas } from '@/components/Page/SuikaGame'
import Matter from 'matter-js'
import { Items } from '@/helper/constants/suikaGame/items'
import { getImage, getRandomItem } from '@/features/suikaGame'
import GameModal from '@/components/Page/SuikaGame/Modal'

export default function SG() {
  const [isStart, setIsStart] = useState<boolean>(true)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [nextItem, setNextItem] = useState<Items>(getRandomItem()?.label as Items)

  const handleClose = () => {
    console.log('Rmx')
    // restart
    // setIsGameOver(false)
  }

  return (
    <div className="w-[100vw] h-[100vh] flex-center overflow-hidden pt-[74px]">
      {/* <div className="w-[100vw] h-[100vh] flex-center overflow-hidden bg-gradient-to-b"> */}
      <div
        className={`w-full h-full relative top-0 flex-center flex-col  gap-[8px] ${isStart ? 'visible' : 'invisible'}`}
      >
        {isGameOver && <p className="text-heading-text">게임 오버</p>}
        <div className="w-full h-full pt-[20px] flex-center flex-col overflow-hidden gap-[0.2em] canvas-border">
          {/* header */}
          <div className="flex-center gap-[50px]">
            <Image
              src={getImage(nextItem)}
              alt="다음 과일"
              width={40}
              height={40}
              quality={75}
              loading="lazy"
              draggable="false"
            />
            <p>Score: {score}</p>
          </div>
          <Canvas setNextItem={setNextItem} setScore={setScore} setIsGameOver={setIsGameOver} />
        </div>
      </div>
      {/* intro */}
      <Intro isVisible={!isStart} handleGameStart={() => setIsStart(true)} />
      <GameModal isOpen={isGameOver} handleClose={handleClose} />
      {/*  modal */}
    </div>
  )
}
