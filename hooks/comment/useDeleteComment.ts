import { useMutation } from '@tanstack/react-query'
import { deletleComment } from '@/lib/api/comment'

export default function useDeleteComment() {
  const { mutateAsync } = useMutation({
    mutationFn: deletleComment,
    onSuccess: (data) => {
      console.log('삭제 성공:', data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('댓글 삭제 실패:', error.message)
      } else {
        console.error('댓글 삭제 에러:', error)
      }
    },
  })

  return { mutateAsync }
}
