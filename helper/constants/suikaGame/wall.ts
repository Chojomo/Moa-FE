import Matter from 'matter-js'
import { getWidth, getHeight } from '@/helper/suikaGame/calcSize'

const { Bodies } = Matter

const WALL_WIDTH = getWidth() * 10
const WALL_HEIGHT = getHeight() * 10
export const WALL_BACK = Bodies.rectangle(
  getWidth(),
  getHeight(),
  getWidth() * 2,
  getHeight() * 2,
  { label: 'WALL_BACK', isStatic: true, isSensor: true, render: { fillStyle: 'none' } }
)
export const WALL_BOTTOM = Bodies.rectangle(
  getWidth() / 2,
  (WALL_HEIGHT + getHeight() * 2) / 2,
  WALL_WIDTH,
  WALL_HEIGHT,
  { label: 'WALL_BOTTOM', isStatic: true, friction: 1, render: { fillStyle: 'none' } }
)
export const WALL_LEFT = Bodies.rectangle(
  -WALL_WIDTH / 2,
  getHeight() / 2,
  WALL_WIDTH,
  WALL_HEIGHT,
  { label: 'WALL_LEFT', isStatic: true, friction: 1, render: { fillStyle: 'none' } }
)
export const WALL_RIGHT = Bodies.rectangle(
  WALL_WIDTH / 2 + getWidth(),
  getHeight() / 2,
  WALL_WIDTH,
  WALL_HEIGHT,
  { label: 'WALL_RIGHT', isStatic: true, friction: 1, render: { fillStyle: 'none' } }
)

export const Wall = [WALL_BACK, WALL_BOTTOM, WALL_LEFT, WALL_RIGHT]
