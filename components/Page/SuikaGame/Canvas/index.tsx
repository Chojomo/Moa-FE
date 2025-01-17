'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect } from 'react'
import Matter, { Composite } from 'matter-js'

import { isTouchDevice } from '@/utils'
import { Items } from '@/helper/constants/suikaGame/items'

// import * as SuikaGame from '@/features/suikaGame'

import {
  clamp,
  getWall,
  getImage,
  getWidth,
  getHeight,
  getItem,
  getNextItem,
  getRandomItem,
  setPositionX,
  getGuideLine,
  getFruitYSection,
  getGameOverGuideLine,
} from '@/features/suikaGame'

const { Runner, Engine, Render, World, Bodies, Mouse, Events, Sleeping, MouseConstraint } = Matter

export default function Canvas() {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const nextItemRef = useRef<Items>(getRandomItem()?.label as Items)
  const prevPosition = useRef<{ x: number; y: number }>({ x: getWidth() / 2, y: 50 })

  const runner = Runner.create()
  const engine = Engine.create({
    gravity: { x: 0, y: 0.5 },
  })

  const isMobile = isTouchDevice()

  let render: Matter.Render | null = null

  let item: Matter.Body | null = null
  let GuideLine: Matter.Body | null = null
  let GameOverLine: Matter.Body | null | undefined = null
  let FruitYSection: Matter.Body | null | undefined = null

  const mergingFruitIds = new Set<number>()

  let requestAnimation: number | null = null
  let lastTime = 0
  const frameInterval = 1000 / 60

  const popSound = new Audio('/sounds/pop.mp3')
  const popSound2 = new Audio('/sounds/pop2.mp3')

  const createItem = () => {
    if (item) return undefined

    const nextItem = nextItemRef.current
    if (!nextItem) return undefined

    const fruitFeature = getItem(nextItem)
    if (!fruitFeature) return undefined

    const {
      label,
      radius = 1,
      mass = 1,
    }: { label: Items; radius: number; mass: number } = fruitFeature

    item = Bodies.circle(getWidth() / 2, 50, radius, {
      isSleeping: true,
      label,
      restitution: 0.3,
      mass,
      render: {
        sprite: {
          texture: getImage(label),
          xScale: (radius * 2) / 250,
          yScale: (radius * 2) / 250,
        },
      },
    })

    World.add(engine.world, item)

    const newFruit = getRandomItem()?.label as Items
    nextItemRef.current = newFruit

    return undefined
  }

  const setPosition = (event: any) => {
    if (!item || !GuideLine || !FruitYSection) return undefined

    const WIDTH = getWidth()
    const { circleRadius } = item

    const minX = circleRadius || 0
    const maxX = circleRadius ? WIDTH - circleRadius : WIDTH

    const clampedX = clamp(event.mouse.position.x, minX + 1, maxX - 1)

    setPositionX([item, GuideLine, FruitYSection], clampedX)
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

    const onMove = (event: any) => {
      if (!item) return undefined

      setPosition(event)
      return undefined
    }

    const onMoveEnd = (event: any) => {
      if (!item || !FruitYSection) return undefined
      setPosition(event)

      const label = item?.label as Items
      const fruitFeature = getItem(label)

      if (!fruitFeature) return undefined

      popSound.play()

      Sleeping.set(item, false)

      prevPosition.current.x = item.position.x
      const nextItem = nextItemRef.current
      const newFruitFeature = getItem(nextItem)

      if (newFruitFeature) {
        FruitYSection.render.lineWidth = newFruitFeature.radius * 2
      }

      item = null

      timerRef.current = setTimeout(() => {
        createItem()
      }, 200)

      return undefined
    }

    const onCollisionStart = (event: any) => {
      const { pairs } = event

      pairs.forEach((pair: any) => {
        if (!GameOverLine) return undefined
        const { bodyA } = pair
        const { bodyB } = pair

        if (bodyA.label === GameOverLine.label || bodyB.label === GameOverLine.label) {
          // handleGameOver(props)
          return undefined
        }

        const midX = (bodyA.position.x + bodyB.position.x) / 2
        const midY = (bodyA.position.y + bodyB.position.y) / 2

        const labelA = bodyA.label as Items
        const labelB = bodyB.label as Items

        if (bodyA.isSensor || bodyB.isSensor) return undefined
        if (labelA === Items.GOLDWATERMELON && labelB === Items.GOLDWATERMELON) return undefined

        if (mergingFruitIds.has(bodyA.id) || mergingFruitIds.has(bodyB.id)) {
          return undefined
        }

        if (labelA === labelB) {
          mergingFruitIds.add(bodyA.id)
          mergingFruitIds.add(bodyB.id)

          popSound2.play()

          const bodiesInWorld = Composite.allBodies(engine.world)
          const isBodyARemoved = !bodiesInWorld.includes(bodyA)
          const isBodyBRemoved = !bodiesInWorld.includes(bodyB)

          if (isBodyARemoved || isBodyBRemoved) {
            mergingFruitIds.delete(bodyA.id)
            mergingFruitIds.delete(bodyB.id)
            return undefined
          }

          World.remove(engine.world, bodyA)
          World.remove(engine.world, bodyB)

          const fruitFeature = getNextItem(labelA)
          if (!fruitFeature) return undefined

          const {
            label,
            radius = 1,
            mass = 1,
            score = 0,
          }: { label: Items; radius: number; mass: number; score: number } = fruitFeature

          const newFruit = Bodies.circle(midX, midY, radius, {
            isStatic: false,
            label,
            restitution: 0.3,
            mass,
            render: {
              sprite: {
                texture: getImage(label),
                xScale: (radius * 2) / 250,
                yScale: (radius * 2) / 250,
              },
            },
          })

          World.add(engine.world, newFruit)
        }
        return undefined
      })
    }

    Events.on(mouseConstraint, 'mousemove', onMove)
    Events.on(engine, 'collisionStart', onCollisionStart)

    if (isMobile) {
      // Events.on(mouseConstraint, 'touchmove', onMove)
      Events.on(mouseConstraint, 'startdrag', onMove)
      Events.on(mouseConstraint, 'enddrag', onMoveEnd)
    } else {
      Events.on(mouseConstraint, 'mouseup', onMoveEnd)
    }

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

    const initItem = getItem(nextItemRef.current)
    FruitYSection = getFruitYSection(initItem?.radius)

    GameOverLine = getGameOverGuideLine()

    render = Render.create({ element: canvas, engine, options })

    GuideLine = getGuideLine()
    const { Left, Right, Ground } = getWall()

    if (!FruitYSection || !GuideLine || !GameOverLine) return undefined

    World.add(engine.world, [Left, Right, GuideLine, FruitYSection, GameOverLine])
    World.add(engine.world, Ground)

    createItem()

    return undefined
  }

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
