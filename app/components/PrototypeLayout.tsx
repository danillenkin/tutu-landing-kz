'use client';

import React, { ReactNode } from 'react';
import { Footer } from '@tutu-react/kite-footer';
import { Container } from '@tutu/kite/Grid';
import { AuthProvider } from '../mocks/authentication-sdk-react';
import { UserwayProvider } from '../mocks/userway-react';
import { LangProvider, useLang } from '../i18n/LangContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export interface PrototypeLayoutProps {
  page: string;
  children: ReactNode;
  baseDomain?: string;
  product?: 'etrain' | 'bus' | 'geo' | 'train' | 'avia' | 'hotels' | 'tours' | 'aeroexpress';
  theme?: 'dark' | 'light';
  fixedHeader?: boolean;
  breadcrumbs?: Array<{ label: string; url?: string }>;
  isCompactFooter?: boolean;
  showProductsLinks?: boolean;
  showDefaultSecondaryNavItems?: boolean;
}

function HeaderBar({
  product,
  theme,
  fixedHeader,
}: {
  product?: PrototypeLayoutProps['product'];
  theme: 'dark' | 'light';
  fixedHeader: boolean;
}) {
  const { lang, setLang, t } = useLang();
  const isDark = theme === 'dark';

  return (
    <header
      style={{
        position: fixedHeader ? 'sticky' : 'relative',
        top: 0,
        zIndex: 20,
        backgroundColor: isDark
          ? 'var(--tutu-brand-deep, #0d0b68)'
          : 'var(--kite-background-static-light)',
      }}
    >
      <Container>
        <div className="landing-header">
          <a href="#top" className="landing-header__brand" aria-label="tutu">
            <img
              className="landing-header__logo"
              src={isDark ? '/assets/logos/tutu-on-dark.svg' : '/assets/logos/tutu-on-light.svg'}
              alt="tutu"
              width={140}
              height={38}
            />
            {product === 'avia' ? (
              <span className="landing-header__product">{t.productAvia}</span>
            ) : null}
          </a>

          <LanguageSwitcher value={lang} onChange={setLang} />
        </div>
      </Container>
    </header>
  );
}

export function PrototypeLayout({
  page,
  children,
  baseDomain = 'tutu.ru',
  product,
  theme = 'dark',
  fixedHeader = false,
  breadcrumbs = [],
  isCompactFooter = false,
}: PrototypeLayoutProps) {
  return (
    <AuthProvider>
      <UserwayProvider url="mock" pageName={page}>
        <LangProvider>
          <HeaderBar product={product} theme={theme} fixedHeader={fixedHeader} />
          <main>{children}</main>
          <Footer
            page={page}
            baseDomain={baseDomain}
            product={product}
            breadcrumbs={breadcrumbs}
            isCompactView={isCompactFooter}
          />
        </LangProvider>
      </UserwayProvider>
    </AuthProvider>
  );
}
