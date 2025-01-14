'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, SetStateAction } from 'react'
import Matter from 'matter-js'
import { Fruits } from '@/helper/constants/suikaGame/fruits'
import {
  clamp,
  getWall,
  getFruit,
  getWidth,
  getHeight,
  getRandomFruit,
  getGuideLine,
  getGameOverGuideLine,
} from '@/helper/suikaGame'

const { Runner, Engine, Render, World, Bodies, Mouse, Events, MouseConstraint } = Matter
const FRAME = 1000 / 60

type CanvasProps = {
  nextFruit: Fruits
  setNextFruit: React.Dispatch<SetStateAction<Fruits>>
}

export default function Canvas({ nextFruit, setNextFruit }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const runner = Runner.create()
  const engine = Engine.create({
    gravity: { y: 2.0 },
  })

  let render: Matter.Render | null = null
  let fruit: Matter.Body | null = null
  const fixedItemTimeOut: NodeJS.Timeout | null = null

  const getImage = (label: Fruits) => `/images/fruits/${label}.png`

  const createFruit = () => {
    if (fruit) return undefined
    if (!nextFruit) return undefined

    const feature = getFruit(nextFruit)
    if (!feature) return undefined
    const { label, radius = 1, mass = 1 }: { label: Fruits; radius: number; mass: number } = feature

    fruit = Bodies.circle(getWidth() / 2, 50, radius, {
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
    World.add(engine.world, fruit)

    const newFruit = getRandomFruit()?.label as Fruits
    setNextFruit(newFruit)

    return undefined
  }

  const setPosition = (event: any) => {
    if (!fruit) return undefined

    const WIDTH = getWidth()
    const GuideLine = getGuideLine()
    const { circleRadius } = fruit

    const minX = circleRadius || 0
    const maxX = circleRadius ? WIDTH - circleRadius : WIDTH

    console.log(fruit.position.y)

    Matter.Body.setPosition(fruit, {
      x: clamp(event.mouse.position.x, minX, maxX),
      y: fruit.position.y,
    })

    Matter.Body.setPosition(GuideLine, {
      x: clamp(event.mouse.position.x, minX, maxX),
      y: GuideLine.position.y,
    })

    return undefined
  }

  const initEvents = () => {
    const canvas = canvasRef.current

    if (!render || !canvas) return undefined

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 1,
        length: 0,
        render: {
          visible: false,
        },
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        bodyA: undefined,
        bodyB: undefined,
        id: Date.now(),
        label: 'MouseConstraint',
      },
    })

    const onStartdrag = (event: any) => {
      if (!fruit) return undefined

      setPosition(event)
      return undefined
    }

    const onMousemove = (event: any) => {
      setPosition(event)
    }

    const onEnddrag = (event: any) => {
      console.log('zz')
      // 원의 고정 해제
      if (!fruit) return undefined
      setPosition(event)

      // const popSound = new Audio(require('../../resource/pop.mp3'))
      // popSound.play()
      const label = fruit?.label as Fruits
      const feature = getFruit(label)
      const radius = feature?.radius || 1
      const mass = feature?.mass || 1

      const newItem = Matter.Bodies.circle(fruit.position.x, fruit.position.y, radius, {
        isStatic: false,
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

      // prevPosition.x = fruit.position.x

      // GuideLine.render.fillStyle = '#ffffff00'
      // World.remove(engine.world, fruit)
      // World.remove(engine.world, GameOverLine)
      // fruit = null
      // World.add(engine.world, newItem)

      // fixedItemTimeOut = setTimeout(() => {
      //   GuideLine.render.fillStyle = GuideLineColor
      //   World.add(engine.world, GameOverLine)
      //   createFixedItem(props)
      // }, 750)

      return undefined
    }

    Events.on(mouseConstraint, 'mousemove', onMousemove)
    Events.on(mouseConstraint, 'startdrag', onStartdrag)
    Events.on(mouseConstraint, 'enddrag', onEnddrag)

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

    const GuideLine = getGuideLine()
    const GameOverLine = getGameOverGuideLine()

    render = Render.create({ element: canvas, engine, options })

    const walls = Object.values(getWall())
    World.add(engine.world, [...walls, GuideLine, GameOverLine])

    createFruit()

    return undefined
  }

  const run = () => {
    if (!render) return
    // animate(0)
    // Runner.run(engine)
    Runner.run(runner, engine)
    Render.run(render)
  }

  useEffect(() => {
    init()
    run()
    initEvents()
  }, [])

  return (
    <div ref={canvasRef} id="canvas-container" className="w-full h-full select-none flex-center" />
  )
}
