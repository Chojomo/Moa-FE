'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, Dispatch, SetStateAction } from 'react'
import Matter, { Composite } from 'matter-js'

import { isTouchDevice } from '@/utils'
import { Items } from '@/helper/constants/suikaGame/items'

import {
  clamp,
  getWall,
  getGround,
  getImage,
  getWidth,
  getHeight,
  getItem,
  getNextItem,
  getRandomItem,
  setPositionX,
  getGameOverLine,
} from '@/features/suikaGame'
import GameModal from '../Modal'

// import * as SuikaGame from '@/features/suikaGame'

type CanvasProps = {
  setNextItem: Dispatch<SetStateAction<Items>>
  score: number
  setScore: Dispatch<SetStateAction<number>>
  setIsGameOver: Dispatch<SetStateAction<boolean>>
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function Canvas({
  setNextItem,
  score,
  setScore,
  setIsGameOver,
  isModalOpen,
  setIsModalOpen,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const isMobile = isTouchDevice()

  const { Runner, Engine, Render, World, Bodies, Mouse, Events, MouseConstraint } = Matter

  const runner = Runner.create()
  const engine = Engine.create({
    gravity: { x: 0, y: 0.5 },
  })

  let render: Matter.Render | null = null
  let item: Matter.Body | null = null
  let nextItemLabel = getRandomItem()?.label as Items
  let disableAction: boolean = false

  let GameOverLine: Matter.Body | null | undefined = null

  const mergingItemIds = new Set<number>()
  const mergedItemIds = new Set<number>()

  let lastTime = 0
  let requestAnimation: number | null = null
  const frameInterval = 1000 / 60

  const popSound = new Audio('/sounds/pop.mp3')
  const popSound2 = new Audio('/sounds/pop2.mp3')

  const handleRestart = () => {
    setIsModalOpen(false)
    setIsGameOver(false)
    setScore(0)

    item = null
    Engine.clear(engine)
    World.clear(engine.world, false)

    init()
    run()
    initEvents()
  }

  const createItem = () => {
    if (item || !nextItemLabel) return undefined

    const nextItemFeature = getItem(nextItemLabel)
    if (!nextItemFeature) return undefined

    const {
      label,
      radius = 1,
      mass = 1,
    }: { label: Items; radius: number; mass: number } = nextItemFeature

    item = Bodies.circle(getWidth() / 2, 40, radius, {
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

    const newItemLabel = getRandomItem()?.label as Items
    nextItemLabel = newItemLabel
    setNextItem(newItemLabel)

    return undefined
  }

  const setPosition = (event: any) => {
    if (!item) return undefined

    const WIDTH = getWidth()
    const { circleRadius } = item

    const minX = circleRadius || 0
    const maxX = circleRadius ? WIDTH - circleRadius : WIDTH

    const clampedX = clamp(event.mouse.position.x, minX + 8, maxX - 8)

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
      if (!item || disableAction) return undefined
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

      if (GameOverLine) {
        item = null
        World.remove(engine.world, GameOverLine)
      }

      World.add(engine.world, newItem)
      disableAction = true

      setTimeout(() => {
        createItem()
        if (GameOverLine) {
          World.add(engine.world, GameOverLine)
          disableAction = false
        }
      }, 400)

      return undefined
    }

    const handleGameOver = () => {
      setIsGameOver(true)
      setIsModalOpen(true)

      if (requestAnimation) {
        cancelAnimationFrame(requestAnimation)
      }
    }

    const onCollisionStart = (event: any) => {
      const { pairs } = event

      pairs.forEach((pair: any) => {
        if (!GameOverLine) return undefined
        const { bodyA, bodyB } = pair

        const { id: idA, label: labelA, isSensor: isSensorA } = bodyA
        const { id: idB, label: labelB, isSensor: isSensorB } = bodyB

        if (labelA === Items.GOLDWATERMELON && labelB === Items.GOLDWATERMELON) return undefined

        if (mergingItemIds.has(idA) || mergingItemIds.has(idB)) {
          return undefined
        }

        if (labelA === labelB) {
          if (isSensorA || isSensorB) return undefined

          const midX = (bodyA.position.x + bodyB.position.x) / 2
          const midY = (bodyA.position.y + bodyB.position.y) / 2
          mergingItemIds.add(idA)
          mergingItemIds.add(idB)

          mergedItemIds.add(idA)
          mergedItemIds.add(idB)

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

          const { score: currentItemScore } = getItem(labelA)

          const {
            label,
            radius = 1,
            mass = 1,
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
          setScore((prev) => prev + currentItemScore)
        }

        if (
          !disableAction &&
          (bodyA.label === 'GAME_OVER_LINE' || bodyB.label === 'GAME_OVER_LINE')
        ) {
          handleGameOver()
        }

        return undefined
      })
    }

    Events.on(mouseConstraint, 'mousemove', onMove)
    Events.on(engine, 'collisionStart', onCollisionStart)
    Events.on(mouseConstraint, 'mouseup', onMoveEnd)

    if (isMobile) {
      Events.on(mouseConstraint, 'startdrag', onMove)
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
    }

    const Ground = getGround()
    const walls = [...Object.values(getWall())]
    GameOverLine = getGameOverLine()

    render = Render.create({ element: canvas, engine, options })

    World.add(engine.world, [...walls])
    World.add(engine.world, Ground)

    setTimeout(createItem, 200)

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div ref={canvasRef} className="relative select-none flex-center" />
      <div
        id="container-box"
        className="absolute w-full h-full flex-center z-0 pointer-events-none"
      />
      <GameModal
        isOpen={isModalOpen}
        score={score}
        handleClose={() => setIsModalOpen(false)}
        handleRestart={handleRestart}
      />
    </>
  )
}
