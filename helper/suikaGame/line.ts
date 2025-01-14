import Matter from 'matter-js'
import { getWidth, getHeight } from './calcSize'

// const LINE_WIDTH = getWidth() * 10
const LINE_HEIGHT = 8

export const getGameOverLine = () => {
  return Matter.Bodies.rectangle(
    getWidth() / 2,
    getHeight() / 6.5 - 30,
    getWidth() * 10,
    LINE_HEIGHT,
    {
      isStatic: true,
      isSensor: true,
      collisionFilter: { group: -1 },
      render: { fillStyle: '#5100FF' },
      label: 'GAME_OVER_LINE',
    }
  )
}

export const getGameOverGuideLine = () => {
  return Matter.Bodies.rectangle(getWidth() / 2, getHeight() / 6.5, getWidth() * 10, LINE_HEIGHT, {
    isStatic: true,
    isSensor: true,
    collisionFilter: { group: -1 },
    render: { fillStyle: '#5100FF' },
    label: 'GAME_OVER_GUIDE_LINE',
  })
}

export const getGuideLine = () => {
  return Matter.Bodies.rectangle(getWidth() / 2, getHeight() / 2 + 40, 5, getHeight(), {
    isStatic: true,
    isSensor: true,
    collisionFilter: { group: -1 },
    render: { fillStyle: '#5100FF' },
    label: 'GUIDE_LINE',
  })
}
