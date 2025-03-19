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
  return (
    <div className="flex-1 px-[15px] py-[30px] flex flex-col gap-[30px] sm:gap-[40px] pb-[84px] overflow-y-auto">
      {messages.map((message) => (
        <ChatItem key={message.index} message={message} />
      ))}
    </div>
  )
}
