import { create } from 'zustand'

type AuthMode = 'login' | 'register'

interface AuthModalState {
  isOpen: boolean
  mode: AuthMode
  open: (mode?: AuthMode) => void
  close: () => void
  setMode: (mode: AuthMode) => void
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: 'login',
  open: (mode = 'login') => set({ isOpen: true, mode }),
  close: () => set({ isOpen: false }),
  setMode: (mode) => set({ mode }),
}))