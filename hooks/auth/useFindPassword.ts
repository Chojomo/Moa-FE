import { useMutation } from '@tanstack/react-query'
import { findPassword } from '@/lib/api/auth'

export default function useFindPassword() {
  const { mutateAsync } = useMutation({
    mutationFn: findPassword,
    onSuccess: (data) => {
      console.log('임시 비밀번호 발송 성공:', data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('임시 비밀번호 발송 실패:', error.message)
      } else {
        console.error('임시 비밀번호 발송 에러:', error)
      }
    },
  })

  return { mutateAsync }
}
