import { useMutation } from '@tanstack/react-query'
import { initializePost } from '@/lib/api/diary'

export default function useInitDiary() {
  const { mutate } = useMutation({
    mutationFn: initializePost,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('다이어리 초기화 실패:', error.message)
      } else {
        console.error('다이어리 초기화:', error)
      }
    },
  })

  return { mutate }
}
