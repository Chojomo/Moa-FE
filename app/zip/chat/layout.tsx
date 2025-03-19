'use client'

import { isTouchDevice } from '@/utils'

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isMobile = isTouchDevice()

  return (
    <div className="bg-background w-[100dvw] h-[100dvh] flex-center overflow-x-hidden">
      <div className={`${isMobile ? 'w-[100dvw]' : 'w-full max-w-[500px]'} h-full flex flex-col`}>
        {children}
      </div>
    </div>
  )
}
