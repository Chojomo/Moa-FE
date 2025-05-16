'use client'

import { useState, useEffect, FormEvent } from 'react'
import { ChatRoomBody, ChatRoomHeader, ChatRoomInput } from '@/components/Page/Chat/ChatRoom'
import { BASE_PROFILE } from '@/helper/constants'
import { useWebSocketStore } from '@/store/useSocket'

type Params = {
  id: string
}
type Message = {
  userId: string
  username: string
  avatar: string
  message: string
  timestamp: string
}

const MESSAGES = [
  {
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
    username: '김철수',
    avatar: BASE_PROFILE,
    message: '안녕하세요! 점심 먹었어요?',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    userId: '822b934e-0439-4cf0-b9ae-d25a14756ffe',
    username: '나',
    avatar: BASE_PROFILE,
    message: '아직 안 먹었어요 ㅎㅎ 추천해 주세요!',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    userId: '822b934e-0439-4cf0-b9ae-d25a14756ffq',
    username: '김철수',
    avatar: BASE_PROFILE,
    message: '오늘 날씨도 좋고, 국밥 한 그릇 어때요?',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    userId: 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678',
    username: '나',
    avatar: BASE_PROFILE,
    message: '좋네요! 어디서 만날까요?',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    userId: '822b934e-0439-4cf0-b9ae-d25a14756ffq',
    username: '김철수',
    avatar: BASE_PROFILE,
    message: '역 근처 카페에서 볼까요? 국밥집도 가까워요!',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    userId: '822b934e-0439-4cf0-b9ae-d25a14756ffq',
    username: '김철수',
    avatar: BASE_PROFILE,
    message: '역 근처 카페에서 볼까요? 국밥집도 가까워요!!',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    userId: '822b934e-0439-4cf0-b9ae-d25a14756ffq',
    username: '김철수',
    avatar: BASE_PROFILE,
    message:
      '역 근처 카페에서 볼까요? 국밥집도 가까워요!!역 근처 카페에서 볼까요? 국밥집도 가까워요!!역 근처 카페에서 볼까요? 국밥집도 가까워요!!역 근처 카페에서 볼까요? 국밥집도 가까워요!!역 근처 카페에서 볼까요? 국밥집도 가까워요!!',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    userId: '822b934e-0439-4cf0-b9ae-d25a14756ffe',
    username: '나',
    avatar: BASE_PROFILE,
    message: '좋네요! 어디서 만날까요?',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
  {
    userId: '822b934e-0439-4cf0-b9ae-d25a14756ffe',
    username: '나',
    avatar: BASE_PROFILE,
    message: '좋네요! 어디서 만날까요?',
    timestamp: new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date()),
  },
]

export default function ChatRoom({ params }: { params: Params }) {
  const [messages, setMessages] = useState<[] | Message[]>(MESSAGES)
  const [message, setMessage] = useState<string>('')
  const { socket, isConnected } = useWebSocketStore()
  const { id } = params

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const { userId, nickname } = userInfo

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (data) => {
        console.log('newMessage data:', data)
      })
    }

    return () => {
      socket?.off('newMessage')
    }
  }, [socket])

  const sendMessage = () => {
    if (socket && isConnected) {
      socket.emit('sendMessage', {
        sender: { userId, username: nickname },
        receiver: {
          userId:
            userId === 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678'
              ? 'd4e5883f-c5bd-4fa9-993d-c7e3cb012678'
              : '822b934e-0439-4cf0-b9ae-d25a14756ffe',
          username: 'test02',
        },
        message,
      })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (message.trim() !== '') {
      setMessage('')

      const newMessage = {
        userId,
        username: nickname,
        avatar: BASE_PROFILE,
        message,
        timestamp: new Intl.DateTimeFormat('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(new Date()),
      }

      sendMessage()
      setMessages((prev: Message[]) => [...prev, newMessage])
    }
  }

  return (
    <div className="w-[100%] h-[100%] flex flex-col overflow-hidden">
      <ChatRoomHeader />
      <ChatRoomBody messages={messages} />
      <ChatRoomInput message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
    </div>
  )
}
