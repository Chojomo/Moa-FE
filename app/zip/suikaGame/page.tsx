'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Intro, Canvas } from '@/components/Page/SuikaGame'
import { Items } from '@/helper/constants/suikaGame/items'
import { getImage, getRandomItem } from '@/features/suikaGame'
import GameModal from '@/components/Page/SuikaGame/Modal'
import Button from '@/components/Button'

export default function SG() {
  const [score, setScore] = useState<number>(0)
  const [isStart, setIsStart] = useState<boolean>(true)
  const [isRestart, setIsRestart] = useState<boolean>(false)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const [nextItem, setNextItem] = useState<Items>(getRandomItem()?.label as Items)

  const handleRestart = () => {
    setIsModalOpen(false)
    setIsGameOver(false)
    setIsRestart(true)
  }

  return (
    <div className="w-[100vw] h-[100vh] flex-center overflow-hidden pt-[74px]">
      <div
        className={`w-full h-full relative top-0 flex-center flex-col  gap-[8px] ${isStart ? 'visible' : 'invisible'}`}
      >
        {isGameOver && (
          <>
            <p className="text-heading-text">게임 오버</p>
            <Button type="button" ariaLabel="다시 시작하기 버튼">
              다시하기
            </Button>
          </>
        )}
        <div className="w-full h-full flex-center flex-col overflow-hidden gap-[20px] canvas-border">
          {/* header */}
          <div className="max-w-[270px] w-[100%] h-[75px] flex justify-between items-end">
            <p className="text-[2rem] text-background font-black pl-[10px] stroke">{score}</p>
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="font-bold">Next</p>
              <Image
                src={getImage(nextItem)}
                alt="다음 아이템"
                width={35}
                height={35}
                quality={75}
                loading="lazy"
                draggable="false"
              />
            </div>
          </div>
          <Canvas
            setNextItem={setNextItem}
            setScore={setScore}
            setIsGameOver={setIsGameOver}
            setIsModalOpen={setIsModalOpen}
            isRestart={isRestart}
            setIsRestart={setIsRestart}
          />
        </div>
      </div>
      <Intro isVisible={!isStart} handleGameStart={() => setIsStart(true)} />
      <GameModal
        isOpen={isModalOpen}
        score={score}
        handleClose={() => setIsModalOpen(false)}
        handleRestart={handleRestart}
      />
    </div>
  )
}
