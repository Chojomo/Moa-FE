import { useMutation } from '@tanstack/react-query'

type CreateRoomPayload = {
  roomName: string
  nickname: string
}

type CreateRoomResponse = {
  room: {
    _id: string
    name: string
  }
  message: string
}

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: async ({ roomName, nickname }: CreateRoomPayload) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/chat/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, nickname }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '방 생성 실패')
      }

      return res.json() as Promise<CreateRoomResponse>
    },
  })
}
