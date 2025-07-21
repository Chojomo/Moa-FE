export type CreateRoom = {
  success: boolean
  message?: string
  room?: {
    id: string
    name: string
    participants: {
      _id: string
      nickname: string
      socketId?: string
    }[]
    createdAt: string
    __v: number
  }
}

export type Participant = {
  nickname: string
  socketId?: string
}

export type Room = {
  _id: string
  name: string
  participants: Participant[]
  createdAt: string
}

export type RoomResponse = {
  rooms: Room[]
  nextCursor?: string
}
