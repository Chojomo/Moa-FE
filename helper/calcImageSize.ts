type ImageSize = { width: number; height: number }

export const calcImageSize = (url: string): Promise<ImageSize> => {
  return new Promise((resolve, _) => {
    const image = new Image()
    image.src = url

    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
    }
  })
}
