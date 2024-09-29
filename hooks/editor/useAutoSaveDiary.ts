import { useMutation } from '@tanstack/react-query'
import { putAutoSave } from '@/lib/api/diary'

type UseAutoSaveDiaryProps = {
  title: string
  content: string
  thumbnail: string
  isDiaryPublic: boolean
}

export default function useAutoSaveDiary({
  title,
  content,
  thumbnail,
  isDiaryPublic,
}: UseAutoSaveDiaryProps) {
  const { mutate } = useMutation({
    mutationFn: () =>
      putAutoSave({
        diaryTitle: title,
        diaryContentse: content,
        thumbnail: '',
        isDiaryPublic: false,
      }),
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
