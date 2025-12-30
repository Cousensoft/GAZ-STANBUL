
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string; // Kullanıcının benzersiz kimliği
  name: string;
  role: 'individual' | 'corporate' | 'admin' | 'technician'; // 'technician' rolü eklendi
  adminRole?: 'superadmin' | 'editor' | 'viewer'; // Only for admin role
  email: string;
  avatar?: string;
  phone?: string;
  birthDate?: string;
  // Yeni Kurumsal Bağlantı Alanları
  connectedCompanyId?: string;
  connectedCompanyName?: string;
  connectionStatus?: 'pending' | 'approved' | 'suspended' | 'none';
  employeeRole?: 'manager' | 'worker'; // Teknik eleman alt rolü
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, rememberMe?: boolean) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state directly from storage to prevent "unauthenticated" flash
  const [user, setUser] = useState<User | null>(() => {
    try {
      const persistentUser = localStorage.getItem('gazistanbul_user');
      if (persistentUser) return JSON.parse(persistentUser);
      
      const sessionUser = sessionStorage.getItem('gazistanbul_user');
      if (sessionUser) return JSON.parse(sessionUser);
    } catch (e) {
      console.error("Failed to load user from storage", e);
    }
    return null;
  });

  const login = (userData: User, rememberMe: boolean = false) => {
    setUser(userData);
    
    // Determine which storage to use
    if (rememberMe) {
        localStorage.setItem('gazistanbul_user', JSON.stringify(userData));
        sessionStorage.removeItem('gazistanbul_user'); // Clean session if we are remembering
    } else {
        sessionStorage.setItem('gazistanbul_user', JSON.stringify(userData));
        localStorage.removeItem('gazistanbul_user'); // Clean local if we are not remembering
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gazistanbul_user');
    sessionStorage.removeItem('gazistanbul_user');
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...data };
      
      // Update the storage that currently holds the user
      if (localStorage.getItem('gazistanbul_user')) {
          localStorage.setItem('gazistanbul_user', JSON.stringify(updatedUser));
      } else {
          sessionStorage.setItem('gazistanbul_user', JSON.stringify(updatedUser));
      }
      
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};