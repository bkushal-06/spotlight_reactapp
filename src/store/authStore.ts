import { create } from 'zustand';
import { AuthState, User } from '../types';

const STORAGE_KEY = 'news-app-user';

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'),
  isAuthenticated: !!localStorage.getItem(STORAGE_KEY),

  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email);
    
    if (user) {
      const updatedUser = {
        ...user,
        lastVisit: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      set({ user: updatedUser, isAuthenticated: true });
    }
  },

  register: (userData) => {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      lastVisit: new Date().toISOString(),
      favorites: [],
    };
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },

  updatePreferences: (preferences) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, preferences };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },

  toggleFavorite: (newsId) => {
    set((state) => {
      if (!state.user) return state;
      const favorites = state.user.favorites.includes(newsId)
        ? state.user.favorites.filter(id => id !== newsId)
        : [...state.user.favorites, newsId];
      const updatedUser = { ...state.user, favorites };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
}));