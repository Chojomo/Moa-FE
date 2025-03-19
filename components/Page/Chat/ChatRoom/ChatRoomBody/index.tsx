import { useEffect, useRef } from 'react'
import ChatItem from '../ChatItem'

type Message = {
  index: number
  userId: string
  username: string
  avatar: string
  message: string
  timestamp: string
}

type ChatRoomBodyProps = {
  messages: Message[]
}

export default function ChatRoomBody({ messages }: ChatRoomBodyProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [])

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 px-[15px] py-[30px] flex flex-col gap-[30px] sm:gap-[40px] mb-[84px] overflow-y-auto scrollbar-hide chat-scroll "
    >
      {messages.map((message) => (
        <ChatItem key={message.index} message={message} />
      ))}
    </div>
  )
}
