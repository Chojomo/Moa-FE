import { useMutation } from '@tanstack/react-query'
import { postThumbnail } from '@/lib/api/diary'

export default function usePostThumbnail() {
  const { mutate } = useMutation({
    mutationFn: postThumbnail,
    onSuccess: (data) => {},
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('이미지 업로드 실패:', error.message)
      } else {
        console.error('이미지 업로드 실패:', error)
      }
    },
  })

  return { mutate }
}
