'use client'

import { useEffect } from 'react'
import { Header, ChatList } from '@/components/Page/Chat'

export default function Chat() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const { userId, nickname } = userInfo

  return (
    <div className="w-full">
      <Header />
      <ChatList />
    </div>
  )
}
