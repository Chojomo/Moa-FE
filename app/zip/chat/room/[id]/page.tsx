'use client'

import { useEffect, useState, useRef, FormEvent } from 'react'
import { useParams } from 'next/navigation'
import { useWebSocketStore } from '@/store/useSocket'
import { ChatRoomInput } from '@/components/Page/Chat/ChatRoom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type Room = {
  _id: string
  name: string
  createdAt?: string
}

type Message = {
  _id?: string
  userId?: string
  nickname: string
  message: string
  roomId: string
  timestamp: string
  __v?: number
}

export default function ChatRoom() {
  const { id } = useParams()
  const { socket, nickname } = useWebSocketStore()
  const [message, setMessage] = useState('')
  const hasJoined = useRef(false)
  const queryClient = useQueryClient()

  const fetchRoom = async (roomId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/chat/rooms/${roomId}`)
    if (!res.ok) throw new Error('채팅방 정보 조회 실패')
    return res.json()
  }

  const fetchMessages = async (roomId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/chat/messages/${roomId}`)

    console.log(res)
    if (!res.ok) throw new Error('메시지 조회 실패')
    return res.json()
  }

  const {
    data: room,
    error: roomError,
    isLoading: isRoomLoading,
  } = useQuery<Room>({
    queryKey: ['chatRoom', id],
    queryFn: () => fetchRoom(id as string),
    enabled: !!id,
  })

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['messages', id],
    queryFn: () => fetchMessages(id as string),
    enabled: !!id,
  })

  useEffect(() => {
    if (!socket || !id || !nickname || hasJoined.current) {
      return () => {}
    }

    socket.emit('joinRoom', { roomId: id, nickname })
    hasJoined.current = true

    const handleNewMessage = (newMessage: Message) => {
      queryClient.setQueryData<Message[]>(['messages', id], (old = []) => [...old, newMessage])
    }

    const handleUserJoined = ({ nickname: joinedUser }: { nickname: string }) => {
      const systemMessage: Message = {
        _id: Date.now().toString(),
        nickname: 'system',
        message: `${joinedUser} 님이 입장하셨습니다.`,
        roomId: id as string,
        timestamp: new Date().toISOString(),
      }

      queryClient.setQueryData<Message[]>(['messages', id], (old = []) => [...old, systemMessage])
    }

    socket.on('newMessage', handleNewMessage)
    socket.on('userJoined', handleUserJoined)

    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.off('userJoined', handleUserJoined)
    }
  }, [socket, id, nickname, queryClient])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const messageContent = formData.get('message') as string

    if (messageContent.trim() !== '' && socket && nickname && id) {
      socket.emit('sendMessage', {
        roomId: id,
        message: messageContent,
        nickname,
      })

      setMessage('')
    }
  }

  if (isLoading || isRoomLoading) return <div>로딩중...</div>
  if (roomError) return <div>채팅방 정보를 불러오지 못했습니다.</div>

  console.log(message)

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="w-full text-center text-2xl px-4 py-4 font-bold text-inverse border-b border-border">
        {room?.name}
      </h1>
      <div className="pt-5 flex-1 space-y-2">
        <div className="flex flex-col px-5">
          {messages.map((msg) => (
            <div
              key={msg.timestamp}
              className="flex"
              // className={msg.nickname === nickname ? 'text-gray-500 italic' : ''}
            >
              <p className={`${msg.nickname === nickname ? 't' : ''} `}>{msg.nickname}</p>
              {msg.message}
            </div>
          ))}
        </div>
        <ChatRoomInput message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}
