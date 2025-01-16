import Matter from 'matter-js'
import { getWidth, getHeight } from '@/helper/suikaGame/calcSize'

const { Bodies } = Matter

export const getWall = () => {
  const WIDTH = getWidth()
  const HEIGHT = getHeight()

  const Left = Bodies.rectangle(0, HEIGHT / 2, 1, HEIGHT, {
    label: 'WALL_LEFT',
    isStatic: true,
    friction: 0,
    frictionStatic: 0,
    render: { fillStyle: '#ff0000' },
  })

  const Right = Bodies.rectangle(WIDTH, HEIGHT / 2, 1, HEIGHT, {
    label: 'WALL_RIGHT',
    isStatic: true,
    friction: 0,
    frictionStatic: 0,
    render: { fillStyle: '#ff0000' },
  })

  const Ground = Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 1, {
    label: 'WALL_BOTTOM',
    isStatic: true,
    friction: 1,
    render: { fillStyle: '#ff0000' },
  })
  return { Left, Right, Ground }
}
