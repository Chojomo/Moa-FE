'use client'

import { isTouchDevice } from '@/utils'
import { Header, ChatList } from '@/components/Page/Chat'

export default function Chat() {
  const isMobile = isTouchDevice()

  return (
    <div className="bg-background w-[100dvw] h-[100dvh] flex-center">
      <div className={`${isMobile ? 'w-[100dvw]' : 'w-full max-w-[500px]'} h-full flex flex-col`}>
        <Header />
        <ChatList />
      </div>
    </div>
  )
}
