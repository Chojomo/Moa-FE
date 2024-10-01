import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '@/lib/api/diary'

type Data = {
  imageUrl: string
}

export default function useUploadImage() {
  let externalOnSuccess: ((data: Data) => void) | undefined

  const { mutate } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      if (externalOnSuccess) {
        externalOnSuccess(data.data)
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('이미지 업로드 실패:', error.message)
      } else {
        console.error('이미지 업로드 실패:', error)
      }
    },
  })

  const setOnSuccess = (callback: (data: Data) => void) => {
    externalOnSuccess = callback
  }

  return { mutate, setOnSuccess }
}
