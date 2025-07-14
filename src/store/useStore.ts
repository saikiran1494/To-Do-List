import { create } from 'zustand';
import { User, Match, Chat, SwipeAction } from '../types';

interface AppState {
  currentUser: User | null;
  users: User[];
  matches: Match[];
  chats: Chat[];
  swipeHistory: SwipeAction[];
  
  // Actions
  setCurrentUser: (user: User) => void;
  addSwipeAction: (action: SwipeAction) => void;
  addMatch: (match: Match) => void;
  removeUser: (userId: string) => void;
  addMessage: (chatId: string, message: any) => void;
}

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  users: [],
  matches: [],
  chats: [],
  swipeHistory: [],

  setCurrentUser: (user) => set({ currentUser: user }),
  
  addSwipeAction: (action) => 
    set((state) => ({ 
      swipeHistory: [...state.swipeHistory, action] 
    })),
  
  addMatch: (match) =>
    set((state) => ({ 
      matches: [...state.matches, match] 
    })),
  
  removeUser: (userId) =>
    set((state) => ({ 
      users: state.users.filter(user => user.id !== userId) 
    })),
  
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    })),
}));