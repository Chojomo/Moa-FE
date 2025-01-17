import Matter from 'matter-js'

const { Body } = Matter

export const setPositionX = (bodies: Matter.Body[], clampedX: number) => {
  bodies.forEach((body) => {
    Body.setPosition(body, {
      x: clampedX,
      y: body.position.y,
    })
  })
}
