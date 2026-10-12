import type { Metadata } from 'next';
import { IconsLink } from '@tutu/order-icons';
import { AssetsLink } from '@tutu/kite/AssetsLink';
import './globals.css';

export const metadata: Metadata = {
  title: 'tutu — билеты и поездки из Казахстана',
  description:
    'Авиа, ЖД, автобусы и смешанные маршруты. Ищите билеты из Алматы и Астаны в одном месте.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <IconsLink />
        <AssetsLink />
        {/* Стили из @tutu-react пакетов (генерируются при npm install) */}
        <link rel="stylesheet" href="/tutu-styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
