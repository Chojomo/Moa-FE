import { useEffect, useState } from 'react'
import { BASE_PROFILE } from '@/helper/constants'
import { getUserFollow } from '@/lib/api/user'

import ListModal from './CreateChatModal'
import Filter from './Filter'
import ChatItem from './ChatItem'
import CreateChatButton from './CreateChatButton'

const chatList = [
  {
    index: 0,
    avatar: BASE_PROFILE,
    username: '망그러진두부',
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
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
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
    lastMessage: '김말이김말 김말',
    isRead: false,
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
]

type ChatListProps = {
  userId: string
}
export default function ChatList({ userId }: ChatListProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [following, setFollowing] = useState([])

  useEffect(() => {
    const getFollow = async () => {
      const { data } = await getUserFollow({ userId, type: 'following' })

      console.log('zz')
      console.log(data)
      setFollowing(data)
    }

    try {
      getFollow()
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div className="flex-1 pt-[64px] px-[20px] flex flex-col">
      <div className="flex flex-col gap-[30px] pb-[30px]">
        <Filter />
        <CreateChatButton handleClick={() => setIsModalOpen(true)} />
      </div>
      {chatList.map((chat) => (
        <ChatItem key={chat.index} chat={chat} />
      ))}
      <ListModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        list={following}
        title="팔로잉 목록"
      />
    </div>
  )
}
