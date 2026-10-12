'use client';

import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Mock для @tutu-react/authentication-ui
 * Заглушки для UI компонентов авторизации
 */

// Типы Flow
export type FlowType = string;

export const FLOW = {
  LOGIN_BY_EMAIL_AND_PASS: 'LOGIN_BY_EMAIL_AND_PASS',
  LOGIN_BY_EMAIL_OR_PHONE: 'LOGIN_BY_EMAIL_OR_PHONE',
  LOGIN_OR_REGISTER: 'LOGIN_OR_REGISTER',
  REGISTRATION_BY_EMAIL_OR_PHONE: 'REGISTRATION_BY_EMAIL_OR_PHONE',
  ADD_RUSSIAN_CONTACT: 'ADD_RUSSIAN_CONTACT',
} as const;

export const EVENTS = {
  SESSION_SECURITY_LEVEL_STRONG_ENOUGH: 'SESSION_SECURITY_LEVEL_STRONG_ENOUGH',
} as const;

// AuthUiController mock
export class AuthUiController {
  constructor(_options?: any) {}
  destroy() {}
}

// Context для AuthUiController
const AuthUiControllerContext = createContext<AuthUiController | null>(null);

export function AuthUiControllerProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: AuthUiController;
}) {
  return (
    <AuthUiControllerContext.Provider value={value}>
      {children}
    </AuthUiControllerContext.Provider>
  );
}

export function useAuthUiController(): AuthUiController {
  const context = useContext(AuthUiControllerContext);
  if (!context) {
    return new AuthUiController();
  }
  return context;
}

// useUndo hook mock
export function useUndo() {
  return {
    canUndo: false,
    undo: () => {},
  };
}

// FlowTitle component mock
export function FlowTitle({ flow }: { flow?: FlowType }) {
  return <span>{flow || 'Авторизация'}</span>;
}

// AuthUi component mock - показывает заглушку
export function AuthUi(_props: {
  startFlow?: FlowType;
  userwayLogger?: any;
  onChangeFlow?: (event: { to: FlowType }) => void;
}) {
  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
      [Mock] Форма авторизации
    </div>
  );
}

// SuperFlow component mock
export function SuperFlow(_props: {
  startFlow?: FlowType;
  onChangeFlow?: (event: { to: FlowType }) => void;
}) {
  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
      [Mock] SuperFlow
    </div>
  );
}

// Default export
export default {
  AuthUi,
  AuthUiController,
  AuthUiControllerProvider,
  FlowTitle,
  SuperFlow,
  useUndo,
  useAuthUiController,
  FLOW,
  EVENTS,
};
