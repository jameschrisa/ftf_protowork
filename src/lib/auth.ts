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
  resetPassword: (email: string) => Promise<void>;
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
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=FTFAdmin&backgroundColor=b6e3f4,c0aede,d1d4f9`,
      lastActive: Date.now()
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email: string) => {
    console.log('Reset password function called with email:', email);
    
    // In a real application, this would:
    // 1. Generate a secure token
    // 2. Store the token with an expiration time
    // 3. Send an email with a reset link containing the token
    
    // For demo purposes, we'll just validate the email exists
    if (email !== 'admin@ftf.ai') {
      console.log('Email validation failed:', email);
      // In a real app, we wouldn't reveal if an email exists for security reasons
      // But for demo purposes, we'll show an error
      throw new Error('No account found with this email address');
    }
    
    console.log('Email validation passed, simulating API delay');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Password reset requested for: ${email}`);
    // In a real app, we would send an email here
    
    console.log('Password reset process completed successfully');
    
    // Return success
    return;
  };

  const value = {
    user,
    login,
    logout,
    resetPassword,
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
