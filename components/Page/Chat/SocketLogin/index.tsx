'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWebSocketStore } from '@/store/useSocket'

export default function SocketLogin() {
  const [nickname, setNickname] = useState('')
  const { connect } = useWebSocketStore()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nickname) return

    connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, nickname)
    setNickname('')
    router.push('chat/room')
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 space-x-3">
      <label htmlFor="nickname" className="sr-only">
        닉네임 설정
      </label>
      <input
        id="nickname"
        type="text"
        placeholder="채팅방에서 사용할 닉네임을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="pl-4 py-2 rounded min-w-[300px] placeholder:text-sm"
      />
      <button
        type="submit"
        disabled={!nickname.trim()}
        aria-label="닉네임 설정 완료 버튼"
        className="p-2 rounded bg-main-blue hover:bg-[#1666DE] font-semibold "
      >
        완료
      </button>
    </form>
  )
}
