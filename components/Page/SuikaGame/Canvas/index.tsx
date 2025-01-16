'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, SetStateAction } from 'react'
import Matter from 'matter-js'
import { Fruits } from '@/helper/constants/suikaGame/fruits'
import {
  clamp,
  getWall,
  getImage,
  getFruit,
  getWidth,
  getHeight,
  setPositionX,
  getRandomFruit,
  getGuideLine,
  getFruitYSection,
  getGameOverGuideLine,
} from '@/helper/suikaGame'

const { Runner, Engine, Render, World, Body, Bodies, Mouse, Events, MouseConstraint } = Matter

type CanvasProps = {
  nextFruit: Fruits
  setNextFruit: React.Dispatch<SetStateAction<Fruits>>
}

export default function Canvas({ nextFruit, setNextFruit }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const nextItemRef = useRef<Fruits>(nextFruit)
  const prevPosition = useRef<{ x: number; y: number }>({ x: getWidth() / 2, y: 50 })
  const runner = Runner.create()
  const engine = Engine.create({
    gravity: { x: 0, y: 1 },
  })

  let render: Matter.Render | null = null
  let fruit: Matter.Body | null = null
  let GuideLine: any = null
  let GameOverLine: any = null
  let FruitYSection: any = null

  const popSound = new Audio('/sounds/pop.mp3')

  const createFruit = () => {
    if (fruit) return undefined

    const nextItem = nextItemRef.current
    if (!nextItem) return undefined

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
      friction: 0,
      frictionAir: 0,
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
    const { circleRadius } = fruit

    const minX = circleRadius || 0
    const maxX = circleRadius ? WIDTH - circleRadius : WIDTH

    const clampedX = clamp(event.mouse.position.x, minX, maxX)

    setPositionX([fruit, GuideLine, FruitYSection], clampedX)
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
      console.log('zz')
      if (!fruit) return undefined
      setPosition(event)

      const label = fruit?.label as Fruits
      const fruitFeature = getFruit(label)

      if (!fruitFeature) return undefined

      popSound.play()

      Body.setStatic(fruit, false)

      prevPosition.current.x = fruit.position.x
      const nextItem = nextItemRef.current
      const newFruitFeature = getFruit(nextItem)

      if (newFruitFeature) {
        FruitYSection.render.lineWidth = newFruitFeature.radius * 2
      }

      fruit = null

      timerRef.current = setTimeout(() => {
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
    }

    const item = getFruit(nextFruit)
    FruitYSection = getFruitYSection(item?.radius)

    GameOverLine = getGameOverGuideLine()

    render = Render.create({ element: canvas, engine, options })

    GuideLine = getGuideLine()
    const { Left, Right, Ground } = getWall()
    World.add(engine.world, [Left, Right, GuideLine, FruitYSection, GameOverLine])
    World.add(engine.world, Ground)

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

    animate(0)
    Runner.run(runner, engine)
    Render.run(render)
  }

  useEffect(() => {
    // Dev.
    // World.clear(engine.world, false)

    init()
    run()
    initEvents()
  }, [])

  return (
    <div ref={canvasRef} id="canvas-container" className="w-full h-full select-none flex-center" />
  )
}
