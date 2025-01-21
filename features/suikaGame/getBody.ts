import Matter from 'matter-js'
import { getWidth, getHeight } from './calcSize'

const { Bodies } = Matter
const LINE_HEIGHT = 8

const getWall = () => {
  const WIDTH = getWidth()
  const HEIGHT = getHeight()

  const Left = Bodies.rectangle(0, HEIGHT / 2, 15, HEIGHT, {
    label: 'WALL_LEFT',
    isStatic: true,
    render: { fillStyle: '#EFBABA' },
  })

  const Right = Bodies.rectangle(WIDTH, HEIGHT / 2, 15, HEIGHT, {
    label: 'WALL_RIGHT',
    isStatic: true,
    render: { fillStyle: '#EFBABA' },
  })

  const Ground = Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 15, {
    label: 'WALL_BOTTOM',
    isStatic: true,
    render: { fillStyle: '#EFBABA' },
  })
  return { Left, Right, Ground }
}

const getGameOverLine = () => {
  return Matter.Bodies.rectangle(
    getWidth() / 2,
    getHeight() / 6.5 - 16,
    getWidth() * 10,
    LINE_HEIGHT,
    {
      label: 'GAME_OVER_LINE',
      isStatic: true,
      isSensor: true,
      collisionFilter: { group: -1 },
      render: { visible: false },
    }
  )
}

const getGameOverGuideLine = () => {
  return Matter.Bodies.rectangle(getWidth() / 2, getHeight() / 6.5, getWidth() * 10, LINE_HEIGHT, {
    label: 'GAME_OVER_GUIDE_LINE',
    isStatic: true,
    isSensor: true,
    collisionFilter: { group: -1 },
    render: { fillStyle: '#EFBABA' },
  })
}

const getGuideLine = () => {
  return Matter.Bodies.rectangle(getWidth() / 2, getHeight() / 2 + 90, 5, getHeight(), {
    label: 'GUIDE_LINE',
    isStatic: true,
    isSensor: true,
    collisionFilter: { group: -1 },
    render: { fillStyle: '#5100FF' },
  })
}

const getBodyYSection = (radius: number | undefined) => {
  if (radius) {
    return Matter.Bodies.rectangle(getWidth() / 2, getHeight() / 2 + 90, 1, getHeight(), {
      label: 'GUIDE_LINE',
      isStatic: true,
      isSensor: true,
      collisionFilter: { group: -1 },
      render: { lineWidth: radius * 2 },
    })
  }

  return undefined
}

export { getWall, getGameOverLine, getGameOverGuideLine, getGuideLine, getBodyYSection }
