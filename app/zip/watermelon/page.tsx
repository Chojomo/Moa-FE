'use client'

import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

export default function Watermelon() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current

    if (!container || !canvas) {
      return undefined
    }

    const { Engine, Render, World, Bodies } = Matter
    const { clientWidth: width, clientHeight: height } = canvas

    const engine = Engine.create()

    const render = Render.create({
      element: container,
      engine,
      canvas,
      options: {
        wireframes: false,
        width,
        height,
        background: '#F1E0AC',
      },
    })

    const leftWall = Bodies.rectangle(0, height / 2, 1, height, {
      isStatic: true,
      render: { visible: false },
    })

    const rightWall = Bodies.rectangle(width, height / 2, 1, height, {
      isStatic: true,
      render: { visible: false },
    })

    const ground = Bodies.rectangle(width / 2, height, width, 1, {
      isStatic: true,
      render: { visible: false },
    })

    const topLine = Bodies.rectangle(width / 2, 100, width, 5, {
      isStatic: true,
      render: { fillStyle: '#AF7848' },
    })

    World.add(engine.world, [leftWall, rightWall, ground, topLine])
    Matter.Runner.run(engine)
    Render.run(render)
    return () => {
      Matter.Render.stop(render)
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
    }
  }, [])

  return (
    <div className="w-[100vw] h-[100vh] flex-center pt-[74px]">
      <div className="w-full h-full">
        <div
          ref={containerRef}
          style={{ textAlign: 'center' }}
          className="w-full h-full flex-center"
        >
          <canvas ref={canvasRef} className="w-full h-full md:w-[40%] md:h-[85%]" />
        </div>
      </div>
    </div>
  )
}
