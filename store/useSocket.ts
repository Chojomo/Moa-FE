import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

type WebSocketStore = {
  socket: Socket | null
  isConnected: boolean
  nickname: string | null
  connect: (url: string, nickname: string) => void
  setConnected: (socket: Socket, nickname: string) => void
  disconnect: () => void
  userId: string | null
}
export const useWebSocketStore = create<WebSocketStore>((set) => ({
  nickname: null,
  userId: null,
  socket: null,
  isConnected: false,

  connect: (url: string, nickname: string) => {
    if (!url) return

    const ws = io(url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
    })

    ws.on('connect', () => {
      ws.emit('setUser', nickname)
      useWebSocketStore.getState().setConnected(ws, nickname)
    })

    ws.on('disconnect', (reason) => {
      console.log('소켓 연결 해제:', reason)
      useWebSocketStore.getState().disconnect()
    })

    ws.on('connect_error', (err) => {
      console.log('서버 연결 실패:', err.message)
    })

    ws.on('reconnect_attempt', (attempt) => {
      console.log(`재연결 시도: ${attempt}`)
    })

    ws.on('reconnect_failed', () => {
      alert('서버와 연결할 수 없습니다.')
      useWebSocketStore.getState().disconnect()
    })

    set({ socket: ws })
  },

  setConnected: (socket: Socket, nickname: string) => {
    set({
      socket,
      nickname,
      userId: socket.id,
      isConnected: true,
    })
  },

  disconnect: () => {
    set((state) => {
      if (state.socket) {
        state.socket.disconnect()
      }

      return {
        socket: null,
        isConnected: false,
        userId: null,
        nickname: null,
      }
    })
  },
}))
