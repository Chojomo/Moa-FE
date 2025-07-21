'use client'

import { useEffect } from 'react'
import { isTouchDevice } from '@/utils'
import { useWebSocketStore } from '@/store/useSocket'

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { disconnect } = useWebSocketStore()
  const isMobile = isTouchDevice()

  useEffect(() => {
    return () => disconnect()
  }, [disconnect])

  return (
    <div className="bg-background w-[100dvw] h-[100dvh] flex-center overflow-x-hidden">
      <div className={`${isMobile ? 'w-[100dvw]' : 'w-full max-w-[500px]'} h-full flex flex-col`}>
        {children}
      </div>
    </div>
  )
}
