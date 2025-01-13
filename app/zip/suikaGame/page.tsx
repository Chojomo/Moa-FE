'use client'

import { useEffect, useState, useRef } from 'react'
import { Intro } from '@/components/Page/SuikaGame'
import Matter from 'matter-js'

export default function SG() {
  const [isStart, setIsStart] = useState<boolean>(false)

  return (
    <div className="w-[100vw] h-[100vh] flex-center overflow-hidden ">
      {/* <div className="w-[100vw] h-[100vh] flex-center overflow-hidden bg-gradient-to-b"> */}
      <div
        className={`w-full h-full relative top-0 flex-center flex-col  gap-[8px] ${isStart ? 'visible' : 'invisible'}`}
      >
        <div className="w-full h-full flex-center flex-col overflow-hidden gap-[0.2em] canvas-border">
          {/* header */}
          <div />
          <div id="canvasWrap" className="select-none" />
        </div>
      </div>
      {/* intro */}
      <Intro isVisible={!isStart} handleGameStart={() => setIsStart(true)} />
      {/* game over modal */}
    </div>
  )
}
