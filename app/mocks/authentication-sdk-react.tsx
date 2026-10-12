'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

/**
 * Mock для @tutu/authentication-sdk/react
 * Используется для прототипирования без реального SDK
 */

export interface User {
  isAuthenticated: boolean;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface UseUserResult {
  user: User | null;
  isUserLoading: boolean;
  isUserLoadError: boolean;
  reloadUser: () => void;
  setUser: (user: User | null) => void;
}

export interface AuthSdk {
  logout: () => Promise<void>;
  login: (credentials: any) => Promise<void>;
}

export const EVENTS = {
  LOGIN: 'login' as const,
  LOGOUT: 'logout' as const,
};

const UserContext = createContext<UseUserResult | null>(null);
const AuthSdkContext = createContext<AuthSdk | null>(null);

/**
 * Псевдо-пользователь для прототипов
 * Измените данные под ваши нужды
 */
const MOCK_USER: User = {
  isAuthenticated: true,
  id: 'mock-user-123',
  email: 'user@example.com',
  firstName: 'Иван',
  lastName: 'Петров',
  phone: '+7 (999) 123-45-67',
};

/**
 * Переключатель: true = авторизованный пользователь, false = гость
 */
const IS_AUTHENTICATED = true;

export function AuthProvider({ children, sdk }: { children: ReactNode; sdk?: AuthSdk }) {
  const [user, setUserState] = useState<User | null>(
    IS_AUTHENTICATED ? MOCK_USER : { isAuthenticated: false }
  );

  const mockSdk: AuthSdk = sdk || {
    logout: async () => {
      console.log('[Mock Auth] logout');
      setUserState({ isAuthenticated: false });
    },
    login: async (credentials) => {
      console.log('[Mock Auth] login', credentials);
      setUserState(MOCK_USER);
    },
  };

  const userValue: UseUserResult = {
    user,
    isUserLoading: false,
    isUserLoadError: false,
    reloadUser: () => console.log('[Mock Auth] reloadUser'),
    setUser: setUserState,
  };

  return (
    <AuthSdkContext.Provider value={mockSdk}>
      <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
    </AuthSdkContext.Provider>
  );
}

export function useUser(): UseUserResult {
  const context = useContext(UserContext);
  if (!context) {
    // Fallback для использования вне AuthProvider
    return {
      user: IS_AUTHENTICATED ? MOCK_USER : { isAuthenticated: false },
      isUserLoading: false,
      isUserLoadError: false,
      reloadUser: () => {},
      setUser: () => {},
    };
  }
  return context;
}

export function useAuthSdk(): AuthSdk {
  const context = useContext(AuthSdkContext);
  if (!context) {
    // Fallback
    return {
      logout: async () => console.log('[Mock Auth] logout'),
      login: async () => console.log('[Mock Auth] login'),
    };
  }
  return context;
}

export function useAuthEvent(event: string | string[], listener: (data?: any) => void): void {
  // Mock — ничего не делает
}

export type { UseUserResult as IUseUserResult };
