import { useCallback, Dispatch, SetStateAction, FormEvent } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import { isTouchDevice } from '@/utils'

type ChatRoomInputProps = {
  message: string
  setMessage: Dispatch<SetStateAction<string>>
}

export default function ChatRoomInput({ message, setMessage }: ChatRoomInputProps) {
  const isMobile = isTouchDevice()
  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMessage(value)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (message.trim() !== '') {
      setMessage('')
    }
  }

  return (
    <form
      className={`${isMobile ? 'w-full' : 'w-full max-w-[500px]'} h-[64px] fixed bottom-0 flex-center bg-background overflow-hidden`}
      onSubmit={handleSubmit}
    >
      <div className="relative w-full h-full flex-center">
        <input
          id="message"
          type="text"
          name="message"
          aria-label="채팅 메시지 입력"
          placeholder="메시지 입력"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          value={message}
          onChange={handleMessageChange}
          className="input-reset w-[96%] h-[75%] autofull-text border border-border rounded-full pl-[20px] pr-[64px] text-[1rem] sm:text-[1.2rem]"
        />
        <Button
          type="button"
          ariaLabel="메시지 전송 버튼"
          className="absolute right-4 bg-main-blue p-2 rounded-full hover:bg-[#2a6ed3]"
        >
          <Icon name="ArrowUp" width={20} height={20} className="text-white" />
        </Button>
      </div>
    </form>
  )
}
