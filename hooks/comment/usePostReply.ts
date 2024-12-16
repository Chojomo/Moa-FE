import { useMutation } from '@tanstack/react-query'
import { postReply } from '@/lib/api/comment'

export default function usePostReply() {
  const { mutateAsync } = useMutation({
    mutationFn: postReply,
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
