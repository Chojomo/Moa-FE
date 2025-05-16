import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

type WebSocketStore = {
  socket: Socket | null
  isConnected: boolean
  connect: (url: string, userId: string) => void
  disconnect: () => void
}

export const useWebSocketStore = create<WebSocketStore>((set) => ({
  socket: null,
  isConnected: false,

  connect: (url: string, userId: string) => {
    if (!url) return
    const ws = io(url, { transports: ['websocket'] })

    ws.on('connect', () => {
      ws.emit('setUser', userId)
      set({ socket: ws, isConnected: true })
    })

    ws.on('disconnect', () => {
      set({ socket: null, isConnected: false })
    })

    set({ socket: ws })
  },

  disconnect: () => {
    set((state) => {
      if (state.socket) {
        state.socket.disconnect()
      }
      return { socket: null, isConnected: false }
    })
  },
}))
