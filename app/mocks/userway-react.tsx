'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';

/**
 * Mock для @tutu/userway/react
 * Используется для прототипирования без реальной аналитики
 */

export interface Userway {
  send: (eventName: string, data?: any) => void;
  setPage: (pageName: string) => void;
}

const UserwayContext = createContext<Userway | null>(null);

export interface IUserwayProviderProps {
  url: string | null;
  enabled?: boolean;
  pageId?: string;
  pageName?: string;
  children?: ReactNode;
  disableSendPageEvent?: boolean;
}

export function UserwayProvider({
  children,
  url,
  pageName,
  disableSendPageEvent = false,
}: IUserwayProviderProps) {
  const userway: Userway = {
    send: (eventName: string, data?: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Mock Userway] ${eventName}`, data);
      }
    },
    setPage: (page: string) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Mock Userway] setPage: ${page}`);
      }
    },
  };

  useEffect(() => {
    if (!disableSendPageEvent && pageName) {
      userway.send('page', { name: pageName });
    }
  }, [pageName, disableSendPageEvent]);

  return <UserwayContext.Provider value={userway}>{children}</UserwayContext.Provider>;
}

export function useUserway(): Userway {
  const context = useContext(UserwayContext);
  if (!context) {
    // Fallback для использования вне UserwayProvider
    return {
      send: () => {},
      setPage: () => {},
    };
  }
  return context;
}
