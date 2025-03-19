import Image from 'next/image'

type Message = {
  index: number
  userId: string
  username: string
  avatar: string
  message: string
  timestamp: string
}

type ChatItemProps = {
  message: Message
}

export default function ChatItem({ message }: ChatItemProps) {
  const isSelf = message.userId === '822b934e-0439-4cf0-b9ae-d25a14756ffe'
  return (
    <div
      className={`flex items-start justify-start gap-[15px] ${isSelf ? 'flex-row-reverse' : ''}`}
    >
      {!isSelf && (
        <Image
          src={message.avatar}
          alt="user profile"
          width={50}
          height={50}
          quality={75}
          loading="lazy"
          draggable="false"
          objectFit="cover"
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full"
        />
      )}
      <div className="bg-[#EAEBEE] dark:bg-[#2a2a2a] px-[10px] py-[10px]  sm:px-[15px] sm:py-[12px] rounded text-body-text">
        {message.message}
      </div>
      <span
        className={`text-[0.7rem] self-end text-[#A1A4A9] relative ${isSelf ? 'left-2' : 'right-2'}`}
      >
        {message.timestamp}
      </span>
    </div>
  )
}
