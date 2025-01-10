import { useMutation } from '@tanstack/react-query'
import { patchReply } from '@/lib/api/comment'

export default function usePatchReply() {
  const { mutateAsync } = useMutation({
    mutationFn: patchReply,
    onSuccess: (data) => {
      console.log('수정 성공:', data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('댓글 수정 게시 실패:', error.message)
      } else {
        console.error('댓글 수정 에러:', error)
      }
    },
  })

  return { mutateAsync }
}
