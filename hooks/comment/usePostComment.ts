import { useMutation } from '@tanstack/react-query'
import { postComment } from '@/lib/api/comment'

export default function usePostComment() {
  const { mutateAsync } = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      console.log('게시 성공:', data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('댓글 게시 실패:', error.message)
      } else {
        console.error('댓글 게시 에러:', error)
      }
    },
  })

  return { mutateAsync }
}
