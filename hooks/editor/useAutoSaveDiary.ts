import { useMutation } from '@tanstack/react-query'
import { putAutoSave } from '@/lib/api/diary'

export default function useAutoSaveDiary() {
  const { mutate } = useMutation({
    mutationFn: putAutoSave,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('다이어리 자동 저장 실패:', error.message)
      } else {
        console.error('다이어리 자동 저장:', error)
      }
    },
  })

  return { mutate }
}
