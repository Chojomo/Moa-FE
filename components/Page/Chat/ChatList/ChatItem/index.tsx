import Link from 'next/link'
import Image from 'next/image'

type Item = {
  index: number
  avatar: string
  username: string
  lastMessage: string
  isRead: boolean
  timestamp: string
}

type ChatItemProps = {
  chat: Item
}

export default function ChatItem({ chat }: ChatItemProps) {
  const { index, avatar, username, lastMessage, isRead, timestamp } = chat
  return (
    <Link href={`/zip/chat/${index}`} className="flex-center py-[20px] border-t border-border">
      <Image
        src={avatar}
        alt="user profile"
        width={50}
        height={50}
        quality={75}
        loading="lazy"
        draggable="false"
        objectFit="cover"
        className="w-[50px] h-[50px] rounded-full"
      />
      <div className="flex-1 pl-[15px]">
        <p className="font-bold text-heading-text">{username}</p>
        <p className="text-body-text">{lastMessage}</p>
      </div>
      <div className="flex flex-col justify-center items-end gap-[5px]">
        <p className="text-[0.8rem] text-body-text">{timestamp}</p>
        {!isRead && (
          <p className="flex-center w-[18px] h-[18px] bg-btn-red rounded-full text-[0.6rem] font-bold text-white">
            1
          </p>
        )}
      </div>
    </Link>
  )
}
