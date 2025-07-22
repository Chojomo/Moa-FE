'use client'

import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import { isTouchDevice } from '@/utils'

const messageSchema = z.object({
  message: z.string().min(1, '메시지를 입력해주세요.'),
})

type MessageForm = z.infer<typeof messageSchema>

type ChatRoomInputProps = {
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  onSubmit: (message: string) => void
}

export default function ChatRoomInput({ onSubmit }: ChatRoomInputProps) {
  const isMobile = isTouchDevice()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
  })

  const handleValid = ({ message }: MessageForm) => {
    onSubmit(message)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleValid)}
      className={`${isMobile ? 'w-full' : 'w-full max-w-[500px]'} h-[64px] flex-center bg-background overflow-hidden`}
    >
      <div className="relative w-full h-full flex-center">
        <input
          id="message"
          type="text"
          aria-label="채팅 메시지 입력"
          placeholder="메시지 입력"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          {...register('message')}
          className="input-reset w-[96%] h-[75%] autofull-text border border-border rounded-full pl-[20px] pr-[64px] text-[1rem] sm:text-[1.2rem]"
        />
        <Button
          type="submit"
          ariaLabel="메시지 전송 버튼"
          className="absolute right-4 bg-main-blue p-2 rounded-full hover:bg-[#2a6ed3]"
        >
          <Icon name="ArrowUp" width={20} height={20} className="text-white" />
        </Button>
      </div>
      {errors.message && (
        <p className="absolute bottom-[70px] text-xs text-red-500 px-4">{errors.message.message}</p>
      )}
    </form>
  )
}
