'use client'

import { useRef, useEffect, SetStateAction } from 'react'
import Matter from 'matter-js'
import { Wall } from '@/helper/constants/suikaGame/wall'
import { Fruits } from '@/helper/constants/suikaGame/fruits'
import { getWidth, getHeight } from '@/helper/suikaGame/calcSize'
import { GameOverGuideLine, GuideLine } from '@/helper/suikaGame/line'
import { getFruitFeature, getRandomFruitFeature } from '@/helper/suikaGame/getFruitFeature'

const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter
const FRAME = 1000 / 60

type CanvasProps = {
  nextItem: Fruits
  setNextItem: React.Dispatch<SetStateAction<Fruits>>
}

export default function Canvas({ nextItem, setNextItem }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const engine = Engine.create({
    gravity: { y: 2.0 },
  })

  let render: Matter.Render | null = null
  let nextFruit: Fruits | null = null
  let fixedItem: Matter.Body | null = null
  const prevPosition = { x: getWidth() / 2, y: 50 }
  const fixedItemTimeOut: NodeJS.Timeout | null = null

  const getImage = (fruit: Fruits) => `/images/fruits/${fruit}.png`

  // const requestAnimation: number | null = null
  // const lastTime = 0
  // let nextFruit: Fruit | null = null
  // const prevMergingFruitIds: number[] = []

  const createFixedItem = () => {
    if (fixedItem) return undefined
    if (!nextFruit) return undefined

    const feature = getFruitFeature(nextFruit)
    const label = feature?.label as Fruits
    const radius = feature?.radius || 1
    const mass = feature?.mass || 1

    fixedItem = Bodies.circle(getWidth() / 2, 50, radius, {
      isStatic: true,
      isSensor: true,
      label,
      restitution: 0,
      mass,
      friction: 1,
      render: {
        sprite: {
          texture: getImage(label),
          xScale: (radius * 2) / 250,
          yScale: (radius * 2) / 250,
        },
      },
    })
    World.add(engine.world, fixedItem)

    const newNextItem = getRandomFruitFeature()?.label as Fruits
    nextFruit = newNextItem
    setNextItem(newNextItem)

    return undefined
  }

  const init = () => {
    const canvas = canvasRef.current

    if (!canvas) return undefined

    while (canvas.hasChildNodes() && canvas.firstChild) {
      canvas.removeChild(canvas.firstChild)
    }

    const options = {
      width: getWidth(),
      height: getHeight(),
      wireframes: false,
      background: '#ffffff40',
      borderRadius: '16px',
    }

    render = Render.create({ element: canvas, engine, options })
    World.add(engine.world, [...Wall])
    World.add(engine.world, [GameOverGuideLine, GuideLine])
    nextFruit = nextItem
    createFixedItem()

    return undefined
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div ref={canvasRef} id="canvas-container" className="w-full h-full select-none flex-center" />
  )
}
