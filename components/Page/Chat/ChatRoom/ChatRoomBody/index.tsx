import { useEffect, useRef } from 'react'
import ChatItem from '../ChatItem'

type Message = {
  _id?: string
  userId?: string
  nickname: string
  message: string
  roomId: string
  timestamp: string
  __v?: number
}

type ChatRoomBodyProps = {
  messages: Message[]
}

export default function ChatRoomBody({ messages }: ChatRoomBodyProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  console.log(messages)

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
      className="flex-1 px-[15px] py-[30px] flex flex-col gap-[30px] overflow-y-auto scrollbar-hide chat-scroll"
    >
      {messages.map((message, i) => (
        <ChatItem key={`${message.timestamp}-${i}`} message={message} />
      ))}
    </div>
  )
}
