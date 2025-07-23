'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useFlash } from '@/context/FlashContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const BASIC_AUTH =
  'Basic ' +
  btoa(
    `${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`
  );

interface AuthContextType {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser: (email: string, password: string, country: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showMessage } = useFlash();

  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const loginUser = useCallback(async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: BASIC_AUTH,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error || 'Login failed', 'error');
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setToken(data.token);
    setUsername(data.username);
    showMessage('Login successful!', 'success');
  }, []);

  const signupUser = useCallback(async (email: string, password: string, country: string) => {
    const response = await fetch(`${API_URL}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: BASIC_AUTH,
      },
      body: JSON.stringify({ email, password, country }),
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error || 'Signup failed', 'error');
      throw new Error(data.error || 'Signup failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setToken(data.token);
    setUsername(data.username);
    showMessage('Signup successful!', 'success');
  }, []);

  const resetPassword = useCallback(async (email: string, newPassword: string) => {
    const response = await fetch(`${API_URL}/api/users/forgot-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: BASIC_AUTH,
      },
      body: JSON.stringify({ email, password: newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error || 'Reset password failed', 'error');
      throw new Error(data.error || 'Reset password failed');
    }

    showMessage('Password updated successfully!', 'success');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
    showMessage('Logged out successfully.', 'success');
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!token) return;

    const response = await fetch(`${API_URL}/api/users`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error || 'Account deletion failed', 'error');
      throw new Error(data.error || 'Failed to delete account');
    }

    logout();
    showMessage('Account deleted successfully!', 'success');
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        isLoggedIn: !!token,
        loginUser,
        signupUser,
        resetPassword,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
