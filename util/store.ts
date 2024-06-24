import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  token: string
}

type Action = {
  setToken: (token: string) => void
}

export const useTokenStore = create<State & Action>()(
  persist(
    (set, get) => ({
      token: "",
      setToken: (token) => set(() => ({ token: token })),
    }),
    {
      name: 'token-storage',
    },
  ),
)