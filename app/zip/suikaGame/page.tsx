'use client'

import { useEffect, useState, useRef } from 'react'
import { Intro, Canvas } from '@/components/Page/SuikaGame'
import Matter from 'matter-js'
import { Items } from '@/helper/constants/suikaGame/items'

export default function SG() {
  const [isStart, setIsStart] = useState<boolean>(true)
  // const [nextItem, setNextItem] = useState<Items>(getRandomFruit()?.label as Items)

  return (
    <div className="w-[100vw] h-[100vh] flex-center overflow-hidden pt-[54px]">
      {/* <div className="w-[100vw] h-[100vh] flex-center overflow-hidden bg-gradient-to-b"> */}
      <div
        className={`w-full h-full relative top-0 flex-center flex-col  gap-[8px] ${isStart ? 'visible' : 'invisible'}`}
      >
        <div className="w-full h-full pt-[20px] flex-center flex-col overflow-hidden gap-[0.2em] canvas-border">
          {/* header */}
          <Canvas />
        </div>
      </div>
      {/* intro */}
      <Intro isVisible={!isStart} handleGameStart={() => setIsStart(true)} />
      {/*  modal */}
    </div>
  )
}
