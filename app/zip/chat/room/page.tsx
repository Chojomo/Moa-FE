'use client'

import { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { CreateRoomModal } from '@/components/Page/Chat'
import Link from 'next/link'
import { RoomResponse } from '@/types/chat'

const fetchRooms = async ({ pageParam = '' }): Promise<RoomResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/rooms?cursor=${pageParam}`)
  if (!res.ok) throw new Error('룸 목록 조회 실패')
  return res.json()
}

export default function ChatRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ref, inView } = useInView()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['rooms'],
      queryFn: fetchRooms,
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className="w-full h-full bg-slate-400 flex flex-col items-center overflow-y-auto p-4">
      <button
        type="button"
        aria-label="채팅방 생성하기 모달 노출 버튼"
        className="px-4 py-2 mb-4 bg-main-blue hover:bg-[#1666DE] font-semibold rounded"
        onClick={() => setIsModalOpen(true)}
      >
        채팅방 생성하기
      </button>

      <CreateRoomModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />

      {isLoading && <div>로딩 중...</div>}
      {isError && <div className="text-red-500">룸 목록 조회 실패</div>}

      {!isLoading && !isError && (
        <ul className="space-y-2 w-full max-w-md">
          {data?.pages.map((page) =>
            page.rooms.map((room) => (
              <li key={room._id} className="p-2 bg-white rounded text-black">
                <Link href={`/zip/chat/room/${room._id}`} className="block w-full h-full">
                  {room.name} ({room.participants.length}명)
                </Link>
              </li>
            ))
          )}
        </ul>
      )}

      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <span>더 불러오는 중...</span>}
      </div>
    </div>
  )
}
