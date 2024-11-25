import { useMutation } from '@tanstack/react-query'
import { postLike } from '@/lib/api/like'

export default function usePostLike() {
  const { mutateAsync } = useMutation({
    mutationFn: postLike,
    onSuccess: (data) => {
      console.log('게시 성공:', data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('다이어리 좋아요 실패:', error.message)
      } else {
        console.error('다이어리 좋아요 에러:', error)
      }
    },
  })

  return { mutateAsync }
}
