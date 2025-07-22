'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Modal from 'react-modal'

import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import { useWebSocketStore } from '@/store/useSocket'

import { useCreateRoom } from '@/hooks/chat/useCreateRoom'

type CreateRoomModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function CreateRoomModal({ isOpen, handleClose }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('')
  const { nickname } = useWebSocketStore()
  const router = useRouter()

  const { mutate: createRoom } = useCreateRoom()

  useEffect(() => {
    Modal.setAppElement('#__next')
  }, [])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!roomName.trim() || !nickname) return

    createRoom(
      { roomName, nickname },
      {
        onSuccess: ({ room }) => {
          alert(`방 "${room.name}" 생성 완료`)
          setRoomName('')
          handleClose()
          router.push(`/zip/chat/room/${room._id}`)
        },
        onError: (error) => {
          alert(error.message)
        },
      }
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="relative bg-modal-bg px-[50px] py-[50px] rounded"
      overlayClassName="modal-overlay-transparent"
    >
      <form onSubmit={onSubmit} className="flex-center gap-2">
        <Button
          type="button"
          ariaLabel="로그인 모달 닫기 버튼"
          className="absolute top-3 right-2"
          onClick={handleClose}
        >
          <Icon name="Cancel" width={20} height={20} />
        </Button>
        <label htmlFor="roomName" className="sr-only">
          채팅방 이름
        </label>
        <input
          id="roomName"
          type="text"
          placeholder="채팅방 이름"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="p-2 rounded font-semibold"
        />
        <Button
          type="submit"
          ariaLabel="채팅방 생성 버튼"
          className="px-3 py-2 bg-main-blue rounded hover:bg-[#1666DE] text-white font-semibold"
        >
          생성
        </Button>
      </form>
    </Modal>
  )
}
