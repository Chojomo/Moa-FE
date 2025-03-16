import { BASE_PROFILE } from '@/helper/constants'

import Filter from './Filter'
import ChatItem from './ChatItem'
import CreateChatButton from './CreateChatButton'

const chatList = [
  {
    index: 0,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 1,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 2,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 3,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 4,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 5,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 6,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 7,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 8,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    index: 9,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
]

export default function ChatList() {
  return (
    <div className="flex-1 pt-[64px] px-[20px] flex flex-col">
      <div className="flex flex-col gap-[30px] pb-[30px]">
        <Filter />
        <CreateChatButton />
      </div>
      {chatList.map((chat) => (
        <ChatItem key={chat.index} chat={chat} />
      ))}
    </div>
  )
}
