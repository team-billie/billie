import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TestUserState {
  userId: number | null
  setUserId: (id: number) => void
  logout: () => void
}

export const useTestUserStore = create<TestUserState>()(
  persist(
    (set) => ({
      userId: 100,
      setUserId: (id: number) => set({ userId: id }),
      logout: () => set({ userId: null }),
    }),
    {
      name: 'test-user-storage',
    }
  )
) 