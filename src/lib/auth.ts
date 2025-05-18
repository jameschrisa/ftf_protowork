import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  lastActive: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const validateCredentials = (email: string, password: string): boolean => {
  return email === 'admin@ftf.ai' && password === 'admin123';
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (!validateCredentials(email, password)) {
      throw new Error('Invalid credentials');
    }

    const newUser: User = {
      id: '1',
      name: 'FTF Admin',
      email: email,
      avatarUrl: `https://ui-avatars.com/api/?name=FTF+Admin&background=random&color=fff`,
      lastActive: Date.now()
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
