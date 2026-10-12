'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { messages, type LangCode } from './messages';

type LangContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (typeof messages)['ru'];
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('ru');

  const setLang = useCallback((next: LangCode) => {
    setLangState(next);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next === 'kk' ? 'kk' : 'ru';
    }
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: messages[lang],
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang must be used within LangProvider');
  }
  return ctx;
}

export type { LangCode };
