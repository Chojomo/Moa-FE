'use client'

import { useEffect } from 'react'
import { isTouchDevice } from '@/utils'
import { useWebSocketStore } from '@/store/useSocket'

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { connect, disconnect } = useWebSocketStore()
  const isMobile = isTouchDevice()

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const { userId, nickname } = userInfo

  useEffect(() => {
    connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, userId)

    return () => disconnect()
  }, [connect, disconnect])

  return (
    <div className="bg-background w-[100dvw] h-[100dvh] flex-center overflow-x-hidden">
      <div className={`${isMobile ? 'w-[100dvw]' : 'w-full max-w-[500px]'} h-full flex flex-col`}>
        {children}
      </div>
    </div>
  )
}
