import { isTouchDevice } from '@/utils'

export const getHeight = () => {
  const canvas = document.getElementById('canvas-container') as HTMLElement

  if (!canvas) return 0

  const { clientWidth, clientHeight } = canvas

  if (isTouchDevice()) {
    return canvas.clientHeight
  }
  const maxHeight = Math.min(clientHeight - 80, 600)
  const screenHeight = clientHeight
  const screenWidth = clientWidth - 8
  const maxWidth = (screenHeight * 4) / 7 - 8

  if (maxWidth > screenWidth) {
    return Math.min(maxHeight, (screenWidth * 7) / 4)
  }

  return Math.min(maxHeight, screenHeight)
}

export const getWidth = () => {
  const canvas = document.querySelector('#canvas-container') as HTMLElement

  if (!canvas) return 0

  if (isTouchDevice()) {
    return canvas.clientWidth
  }

  return (getHeight() * 4) / 7
}
