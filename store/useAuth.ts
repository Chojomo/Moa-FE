import { create } from 'zustand'

type AuthStore = {
  isLogin: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => {
    set({ isLogin: false })
    localStorage.removeItem('authToken')
  },
}))
