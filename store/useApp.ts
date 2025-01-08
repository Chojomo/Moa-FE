import { create } from 'zustand'

type AppStore = {
  isLoginModalOpen: boolean
  loginModalOpen: () => void
  loginModalClose: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  isLoginModalOpen: false,
  loginModalOpen: () => set({ isLoginModalOpen: true }),
  loginModalClose: () => set({ isLoginModalOpen: false }),
}))
