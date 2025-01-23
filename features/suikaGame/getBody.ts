import Matter from 'matter-js'
import { getWidth, getHeight } from './calcSize'

const { Bodies } = Matter
const LINE_HEIGHT = 8

const COLOR = '#6F4927'

const getWall = () => {
  const WIDTH = getWidth()
  const HEIGHT = getHeight()

  const vertices = [
    { x: 0, y: -30 }, // 앞 왼
    { x: WIDTH, y: -30 }, // 앞 오른
    { x: WIDTH - 35, y: -60 }, // 뒤 오른
    { x: 35, y: -60 }, // 뒤 왼
  ]

  const Top = Bodies.fromVertices(WIDTH / 2, HEIGHT / 6.5 - 16, [vertices], {
    label: 'TOP',
    isStatic: true,
    isSensor: true,
    render: {
      lineWidth: 8,
      strokeStyle: COLOR,
      fillStyle: 'transparent',
    },
  })

  const Left = Bodies.rectangle(0, HEIGHT, 15, HEIGHT * 1.7, {
    label: 'WALL_LEFT',
    isStatic: true,
    render: { fillStyle: COLOR },
  })

  const LeftBack = Bodies.rectangle(35, HEIGHT, 8, HEIGHT * 1.81, {
    label: 'WALL_LEFT_BACK',
    isSensor: true,
    isStatic: true,
    render: { fillStyle: COLOR },
  })

  const Right = Bodies.rectangle(WIDTH, HEIGHT, 15, HEIGHT * 1.7, {
    label: 'WALL_RIGHT',
    isStatic: true,
    render: { fillStyle: COLOR },
  })

  const RightBack = Bodies.rectangle(WIDTH - 35, HEIGHT, 8, HEIGHT * 1.81, {
    label: 'WALL_LEFT_BACK',
    isSensor: true,
    isStatic: true,
    render: { fillStyle: COLOR },
  })

  const bottomVertices = [
    { x: WIDTH * 0.12, y: 0 }, // 앞 왼
    { x: WIDTH * 0.88, y: 0 }, // 앞 오른
    { x: WIDTH, y: 20 }, // 뒤 오른
    { x: 0, y: 20 }, // 뒤 왼쪽
  ]

  const Bottom = Bodies.fromVertices(WIDTH / 2, HEIGHT - 16, [bottomVertices], {
    label: 'BOTTOM',
    isSensor: true,
    isStatic: true,
    render: { fillStyle: COLOR },
  })

  return { Top, Left, LeftBack, Right, RightBack, Bottom }
}

const getGround = () => {
  return Bodies.rectangle(getWidth() / 2, getHeight(), getWidth(), 15, {
    label: 'WALL_BOTTOM',
    isStatic: true,
    render: { fillStyle: COLOR },
  })
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

export { getWall, getGround, getGameOverLine, getGuideLine, getBodyYSection }
