import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatState {
  userId: number;
  username: string;
  avatar: string;
  setUser: (id: number, name: string, avatar: string) => void;
  clearUser: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      userId: 100,
      username: '',
      avatar: '',
      setUser: (id, name, avatar) => set({ userId: id, username: name, avatar }),
      clearUser: () => set({ userId: 100, username: '', avatar: '' }),
    }),
    {
      name: 'chat-user-storage',
    }
  )
);