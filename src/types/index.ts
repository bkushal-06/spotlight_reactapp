export interface User {
  id: string;
  email: string;
  name: string;
  preferences: string[];
  lastVisit: string;
  favorites: string[];
}

export interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  url: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (user: Omit<User, 'id' | 'lastVisit' | 'favorites'>) => void;
  logout: () => void;
  updatePreferences: (preferences: string[]) => void;
  toggleFavorite: (newsId: string) => void;
}