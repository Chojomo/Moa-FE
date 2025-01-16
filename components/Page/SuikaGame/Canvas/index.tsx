'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, SetStateAction } from 'react'
import Matter, { Composite } from 'matter-js'
import { Fruits } from '@/helper/constants/suikaGame/fruits'
import {
  clamp,
  getWall,
  getImage,
  getFruit,
  getWidth,
  getHeight,
  getNextFruit,
  setPositionX,
  getRandomFruit,
  getGuideLine,
  getFruitYSection,
  getGameOverGuideLine,
} from '@/helper/suikaGame'
import { isTouchDevice } from '@/utils'

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
    gravity: { x: 0, y: 2 },
  })

  const isMobile = isTouchDevice()

  let render: Matter.Render | null = null
  let fruit: Matter.Body | null = null
  let GuideLine: any = null
  let GameOverLine: any = null
  let FruitYSection: any = null
  const mergingFruitIds = new Set<number>()

  let requestAnimation: number | null = null
  let lastTime = 0
  const frameInterval = 1000 / 60

  const popSound = new Audio('/sounds/pop.mp3')
  const popSound2 = new Audio('/sounds/pop2.mp3')

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
      mass,
      inertia: 1e3,
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0.01,
      restitution: 0.1,
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

    const clampedX = clamp(event.mouse.position.x, minX + 1, maxX - 1)

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

    const onMove = (event: any) => {
      if (!fruit) return undefined

      setPosition(event)
      return undefined
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

    const onCollisionStart = (event: any) => {
      const { pairs } = event
      pairs.forEach((pair: any) => {
        const { bodyA } = pair
        const { bodyB } = pair

        if (bodyA.label === GameOverLine.label || bodyB.label === GameOverLine.label) {
          // handleGameOver(props)
          return undefined
        }

        const midX = (bodyA.position.x + bodyB.position.x) / 2
        const midY = (bodyA.position.y + bodyB.position.y) / 2

        const labelA = bodyA.label as Fruits
        const labelB = bodyB.label as Fruits

        if (bodyA.isSensor || bodyB.isSensor) return undefined
        if (labelA === Fruits.GOLDWATERMELON && labelB === Fruits.GOLDWATERMELON) return undefined

        if (mergingFruitIds.has(bodyA.id) || mergingFruitIds.has(bodyB.id)) {
          return undefined
        }

        if (labelA === labelB) {
          mergingFruitIds.add(bodyA.id)
          mergingFruitIds.add(bodyB.id)
          console.log(`label : ${labelA}, ${labelB}`)

          popSound2.play()

          const bodiesInWorld = Composite.allBodies(engine.world)
          const isBodyARemoved = !bodiesInWorld.includes(bodyA)
          const isBodyBRemoved = !bodiesInWorld.includes(bodyB)

          if (isBodyARemoved || isBodyBRemoved) {
            mergingFruitIds.delete(bodyA.id)
            mergingFruitIds.delete(bodyB.id)
            return undefined
          }

          console.log(getNextFruit(labelA))

          World.remove(engine.world, bodyA)
          World.remove(engine.world, bodyB)

          const fruitFeature = getNextFruit(labelA)
          if (!fruitFeature) return undefined

          const {
            label,
            radius = 1,
            mass = 1,
            score = 0,
          }: { label: Fruits; radius: number; mass: number; score: number } = fruitFeature

          const newFruit = Bodies.circle(midX, midY, radius, {
            isStatic: false,
            label,
            mass,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.01,
            inertia: 1e3,
            restitution: 0.1,
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
      Events.on(mouseConstraint, 'enddrag', onEnddrag)
    } else {
      Events.on(mouseConstraint, 'mouseup', onEnddrag)
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
