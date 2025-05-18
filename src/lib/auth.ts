import React, { createContext, useContext, useState, useEffect } from 'react';

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
  return email === 'admin@ftf.ai' && password === 'ftf3$$$';
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user state from localStorage on component creation
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id && parsedUser.email) {
          return parsedUser;
        }
      }
    } catch (error) {
      console.error('Failed to parse stored user data:', error);
      localStorage.removeItem('user');
    }
    return null;
  });
  
  const [isInitialized, setIsInitialized] = useState(false);

  // Set initialized flag after component mount
  useEffect(() => {
    setIsInitialized(true);
  }, []);

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

  // Don't render children until we've checked for an existing session
  if (!isInitialized) {
    return null;
  }

  return React.createElement(AuthContext.Provider, { value }, children);
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
