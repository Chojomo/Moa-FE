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

const { Runner, Engine, Render, World, Body, Bodies, Mouse, Events, MouseConstraint } = Matter
const FRAME = 1000 / 60

type CanvasProps = {
  nextFruit: Fruits
  setNextFruit: React.Dispatch<SetStateAction<Fruits>>
}

export default function Canvas({ nextFruit, setNextFruit }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const prevPosition = useRef<{ x: number; y: number }>({ x: getWidth() / 2, y: 50 })
  const nextItemRef = useRef<Fruits>(nextFruit)

  const runner = Runner.create()
  const engine = Engine.create({
    gravity: { y: 1 },
  })

  let render: Matter.Render | null = null
  let fruit: Matter.Body | null = null

  // const fixedItemTimeOut: NodeJS.Timeout | null = null

  const getImage = (label: Fruits) => `/images/fruits/${label}.png`

  const createFruit = () => {
    if (fruit) return undefined

    const nextItem = nextItemRef.current
    if (!nextItem) return undefined

    console.log(`fruit: ${fruit}`)
    console.log(`nextItem: ${nextItem}`)

    const fruitFeature = getFruit(nextItem)
    if (!fruitFeature) return undefined

    const {
      label,
      radius = 1,
      mass = 1,
    }: { label: Fruits; radius: number; mass: number } = fruitFeature

    fruit = Bodies.circle(getWidth() / 2, 50, radius, {
      isStatic: true,
      isSensor: false,
      label,
      restitution: 0.2,
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
    nextItemRef.current = newFruit
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

    // console.log(fruit.position.y)

    Body.setPosition(fruit, {
      x: clamp(event.mouse.position.x, minX, maxX),
      y: fruit.position.y,
    })

    Body.setPosition(GuideLine, {
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
        id: Date.now(),
        label: 'MouseConstraint',
        length: 0,
        render: {
          visible: false,
        },
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        bodyA: undefined,
        bodyB: undefined,
        stiffness: 1,
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
      console.log(`onEnddrag fruit: ${fruit}`)
      if (!fruit) return undefined
      setPosition(event)

      const label = fruit?.label as Fruits
      const fruitFeature = getFruit(label)

      if (!fruitFeature) return undefined

      const popSound = new Audio('/sounds/pop.mp3')
      popSound.play()

      const { radius = 1, mass = 1 }: { label: Fruits; radius: number; mass: number } = fruitFeature
      Body.setStatic(fruit, false)
      // Body.setStatic(fruit, false)

      // const newItem = Matter.Bodies.circle(fruit.position.x, fruit.position.y, radius, {
      //   isStatic: false,
      //   label,
      //   restitution: 0,
      //   mass,
      //   friction: 1,
      //   render: {
      //     sprite: {
      //       texture: getImage(label),
      //       xScale: (radius * 2) / 250,
      //       yScale: (radius * 2) / 250,
      //     },
      //   },
      // })

      prevPosition.current.x = fruit.position.x

      // const GuideLine = getGuideLine()
      // const GameOverLine = getGameOverGuideLine()

      // GuideLine.render.fillStyle = '#ffffff00'
      // World.remove(engine.world, fruit)
      // World.remove(engine.world, GameOverLine)

      fruit = null
      // World.add(engine.world, newItem)

      timerRef.current = setTimeout(() => {
        // GuideLine.render.fillStyle = '#ffffff30'
        // World.add(engine.world, GameOverLine)
        createFruit()
      }, 200)

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

  let requestAnimation: number | null = null
  let lastTime = 0
  const frameInterval = 1000 / 60

  const animate = (currentTime: number) => {
    requestAnimation = requestAnimationFrame(animate)

    const elapsed = currentTime - lastTime

    if (elapsed > frameInterval) {
      Engine.update(engine, frameInterval)
      lastTime = currentTime - (elapsed % frameInterval)
    }
  }

  const run = () => {
    if (!render) return
    // Runner.run(engine)
    animate(0)
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
