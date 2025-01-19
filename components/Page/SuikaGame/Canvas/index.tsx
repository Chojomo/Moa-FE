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
  getGameOverGuideLine,
} from '@/features/suikaGame'

const { Runner, Engine, Render, World, Bodies, Body, Mouse, Events, Sleeping, MouseConstraint } =
  Matter

export default function Canvas() {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const isMobile = isTouchDevice()

  const runner = Runner.create()
  const engine = Engine.create({
    gravity: { x: 0, y: 0.5 },
  })

  let render: Matter.Render | null = null
  let item: Matter.Body | null = null
  // let nextItem: Matter.Body | null = null

  let timer: NodeJS.Timeout | null = null
  let currentItemLabel: keyof typeof Items | null = null
  let nextItemLabel = getRandomItem()?.label as Items

  let GameOverLine: Matter.Body | null | undefined = null

  const mergingItemIds = new Set<number>()

  let lastTime = 0
  const frameInterval = 1000 / 60

  const popSound = new Audio('/sounds/pop.mp3')
  const popSound2 = new Audio('/sounds/pop2.mp3')

  const createItem = () => {
    if (item || !nextItemLabel) return undefined

    const nextItemFeature = getItem(nextItemLabel)
    if (!nextItemFeature) return undefined

    const {
      label,
      radius = 1,
      mass = 1,
    }: { label: Items; radius: number; mass: number } = nextItemFeature

    item = Bodies.circle(getWidth() / 2, 50, radius, {
      isStatic: true,
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
    currentItemLabel = label

    const newItemLabel = getRandomItem()?.label as Items
    nextItemLabel = newItemLabel

    return undefined
  }

  const setPosition = (event: any) => {
    if (!item) return undefined

    const WIDTH = getWidth()
    const { circleRadius } = item

    const minX = circleRadius || 0
    const maxX = circleRadius ? WIDTH - circleRadius : WIDTH

    const clampedX = clamp(event.mouse.position.x, minX + 1, maxX - 1)

    setPositionX([item], clampedX)
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
      if (!item) return undefined
      setPosition(event)

      popSound.play()

      const {
        label,
        mass,
        position,
      }: {
        label: Items | string
        mass: number
        position: { x: number; y: number }
      } = item
      const radius = item.circleRadius as number

      const newItem = Bodies.circle(position.x, position.y, radius, {
        label,
        restitution: 0.3,
        mass,
        render: {
          sprite: {
            texture: getImage(label as Items),
            xScale: (radius * 2) / 250,
            yScale: (radius * 2) / 250,
          },
        },
      })

      World.remove(engine.world, item)
      item = null

      World.add(engine.world, newItem)

      timer = setTimeout(() => {
        createItem()
      }, 200)

      return undefined
    }

    const onCollisionStart = (event: any) => {
      const { pairs } = event

      pairs.forEach((pair: any) => {
        if (!GameOverLine) return undefined
        const { bodyA, bodyB } = pair

        if (bodyA.label === GameOverLine.label || bodyB.label === GameOverLine.label) {
          return undefined
        }

        const midX = (bodyA.position.x + bodyB.position.x) / 2
        const midY = (bodyA.position.y + bodyB.position.y) / 2

        const { id: idA, label: labelA, isSensor: isSensorA } = bodyA
        const { id: idB, label: labelB, isSensor: isSensorB } = bodyB

        if (isSensorA || isSensorB) return undefined
        if (labelA === Items.GOLDWATERMELON && labelB === Items.GOLDWATERMELON) return undefined

        if (mergingItemIds.has(idA) || mergingItemIds.has(idB)) {
          return undefined
        }

        if (labelA === labelB) {
          mergingItemIds.add(idA)
          mergingItemIds.add(idB)

          popSound2.play()

          // Body가 존재하지 않으면 실행 안 되게
          const bodiesInWorld = Composite.allBodies(engine.world)
          const isBodyARemoved = !bodiesInWorld.includes(bodyA)
          const isBodyBRemoved = !bodiesInWorld.includes(bodyB)

          if (isBodyARemoved || isBodyBRemoved) {
            mergingItemIds.delete(idA)
            mergingItemIds.delete(idB)
            return undefined
          }

          World.remove(engine.world, bodyA)
          World.remove(engine.world, bodyB)

          const newItem = getNextItem(labelA)
          if (!newItem) return undefined

          const {
            label,
            radius = 1,
            mass = 1,
            score = 0,
          }: { label: Items; radius: number; mass: number; score: number } = newItem

          const body = Bodies.circle(midX, midY, radius, {
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

          World.add(engine.world, body)
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

    GameOverLine = getGameOverGuideLine()

    render = Render.create({ element: canvas, engine, options })
    const { Left, Right, Ground } = getWall()

    if (!GameOverLine) return undefined

    World.add(engine.world, [Left, Right, GameOverLine])
    World.add(engine.world, Ground)

    createItem()

    return undefined
  }

  const animate = (currentTime: number) => {
    requestAnimationFrame(animate)

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
