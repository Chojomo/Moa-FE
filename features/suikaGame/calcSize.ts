import { isTouchDevice } from '@/utils'

export const getHeight = () => {
  const wapper = document.getElementById('container-box') as HTMLElement

  if (!wapper) return 0

  const { clientWidth, clientHeight } = wapper

  if (isTouchDevice()) {
    return wapper.clientHeight
  }
  const maxHeight = Math.min(clientHeight - 150, 600)
  const screenHeight = clientHeight
  const screenWidth = clientWidth - 8
  const maxWidth = (screenHeight * 4) / 7 - 8

  if (maxWidth > screenWidth) {
    return Math.min(maxHeight, (screenWidth * 7) / 4)
  }

  return Math.min(maxHeight, screenHeight)
}

export const getWidth = () => {
  const wapper = document.getElementById('container-box') as HTMLElement

  if (!wapper) return 0

  if (isTouchDevice()) {
    return wapper.clientWidth
  }

  return (getHeight() * 4) / 7
}
