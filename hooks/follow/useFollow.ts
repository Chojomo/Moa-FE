import { postFollow } from '@/lib/api/follow'
import { useMutation } from '@tanstack/react-query'

export default function usePostFollow() {
  const { mutateAsync } = useMutation({
    mutationFn: postFollow,
    onSuccess: (data) => {
      console.log('팔로우 성공:', data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('팔로우 실패:', error.message)
      } else {
        console.error('팔로우 에러:', error)
      }
    },
  })

  return { mutateAsync }
}
