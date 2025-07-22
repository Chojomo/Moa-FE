'use client'

import { useWebSocketStore } from '@/store/useSocket'

type Message = {
  _id?: string
  userId?: string
  nickname: string
  message: string
  roomId: string
  timestamp: string
  __v?: number
}
type ChatItemProps = {
  message: Message
}

export default function ChatItem({ message }: ChatItemProps) {
  const { userId } = useWebSocketStore()
  const isSelf = message.userId === userId

  const formatTimestamp = (iso: string): string => {
    const date = new Date(iso)

    const year = String(date.getFullYear()).slice(2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  return (
    <div className={`flex items-start justify-start gap-[15px] ${isSelf && 'flex-row-reverse'}`}>
      <div className="flex flex-col gap-2">
        {!isSelf && (
          <p className="text-main-blue text-[1.1rem] font-semibold">{message.nickname}</p>
        )}
        <div className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}>
          <div className="bg-[#EAEBEE] dark:bg-[#2a2a2a] px-[10px] py-[10px]  sm:px-[15px] sm:py-[10px] rounded text-body-text">
            {message.message}
          </div>
          <p className="text-[0.7rem] self-end text-[#A1A4A9]">
            {formatTimestamp(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  )
}
