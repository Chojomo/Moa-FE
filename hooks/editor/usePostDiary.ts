import { useMutation } from '@tanstack/react-query'
import { postDiary } from '@/lib/api/diary'

export default function usePostDiary() {
  const { mutateAsync } = useMutation({
    mutationFn: postDiary,
    onSuccess: (data) => {
      console.log('게시 성공:', data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('다이어리 게시 실패:', error.message)
      } else {
        console.error('다이어리 게시 에러:', error)
      }
    },
  })

  return { mutateAsync }
}
