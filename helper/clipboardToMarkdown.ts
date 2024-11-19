import { calcImageSize } from './calcImageSize'

export const clipboardToMarkdown = async (): Promise<string | null> => {
  try {
    const clipboardItems = await navigator.clipboard.read()
    const imageItem = clipboardItems.find(
      (item) => item.types.includes('image/png') || item.types.includes('image/jpeg')
    )

    if (imageItem) {
      const blob = await imageItem.getType(imageItem.types[0])
      const file = new File([blob], 'pasted-image.png', { type: blob.type })

      if (file.type === 'text/html') {
        const htmlText = await blob.text()

        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlText, 'text/html')
        const image = doc.querySelector('img')

        if (image?.src) {
          const { src: url } = image
          const { width, height } = await calcImageSize(url)

          // 마크다운에 한 줄 공백 추가
          const markdown = `\n \n ![Image](${url})<!--rehype:style=width: ${width}px; height: ${height};-->`

          return markdown
        }
      }
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
