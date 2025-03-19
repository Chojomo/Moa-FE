'use client'

import { useState } from 'react'
import { ChatRoomBody, ChatRoomHeader, ChatRoomInput } from '@/components/Page/Chat/ChatRoom'
import { BASE_PROFILE } from '@/helper/constants'

type Params = {
  id: string
}

const messages = [
  {
    index: 0,
    userId: '822b934e-0439-4cf0-b9ae-d25a14756ffq',
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
    index: 1,
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
    index: 3,
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
    index: 4,
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
    index: 5,
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
    index: 6,
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
    index: 7,
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
    index: 8,
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
    index: 9,
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
  const [message, setMessage] = useState<string>('')
  const { id } = params

  return (
    <div className="w-[100%] h-[100%] flex flex-col overflow-hidden">
      <ChatRoomHeader />
      <ChatRoomBody messages={messages} />
      <ChatRoomInput message={message} setMessage={setMessage} />
    </div>
  )
}
