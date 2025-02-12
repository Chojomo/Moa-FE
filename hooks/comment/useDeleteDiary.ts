import { useMutation } from '@tanstack/react-query'
import { deletleDiary } from '@/lib/api/diary'

export default function useDeleteDiary() {
  const { mutateAsync } = useMutation({
    mutationFn: deletleDiary,
    onSuccess: (data) => {
      console.log('삭제 성공:', data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('다이어리 삭제 실패:', error.message)
      } else {
        console.error('다이어리 삭제 에러:', error)
      }
    },
  })

  return { mutateAsync }
}
