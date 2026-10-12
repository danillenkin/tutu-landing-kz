'use client';

import { useEffect, useMemo, useRef, useState, type RefCallback } from 'react';
import { Container, Row, Col } from '@tutu/kite/Grid';
import { Panel } from '@tutu/kite/Panel';
import { H1, H2, H3, P } from '@tutu/kite/SemanticText';
import { Button } from '@tutu/kite/Button';
import { Badge } from '@tutu/kite/Badge';
import { RichIcon } from '@tutu/kite/RichIcon';
import { CalendarPopper } from '@tutu/kite/CalendarPopper';
import type { MIconName } from '@tutu/order-icons';
import { PrototypeLayout } from './components/PrototypeLayout';
import { useLang } from './i18n/LangContext';
import type { LangCode } from './i18n/messages';

const MONTHS_SHORT: Record<LangCode, string[]> = {
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  kk: ['қаң', 'ақп', 'нау', 'сәу', 'мам', 'мау', 'шіл', 'там', 'қыр', 'қаз', 'қар', 'жел'],
};

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addDays(date: Date, days: number) {
  const next = startOfDay(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatSearchDate(date: Date, lang: LangCode) {
  return `${date.getDate()} ${MONTHS_SHORT[lang][date.getMonth()]}`;
}

const MODE_ICONS: MIconName[] = ['plane', 'train', 'bus', 'plain-train-bus'];

const LOVE_ICONS: MIconName[] = [
  'bank-card',
  'bubble-phone',
  'tickets',
  'bank-card',
  'shield-checkmark',
];

type HotelCard = {
  id: string;
  name: string;
  city: string;
  src: string;
  rating: string;
  reviews: number;
  priceRub: number;
  oldPriceRub: number;
  priceKzt: number;
  discount: number;
};

/** Отели с hotel.tutu.ru — города по всей России */
const HOTELS: HotelCard[] = [
  {
    id: 'alfa',
    name: 'Альфа Измайлово',
    city: 'Москва',
    src: '/assets/hotels/alfa.jpg',
    rating: '8,8',
    reviews: 1332,
    priceRub: 4506,
    oldPriceRub: 5301,
    priceKzt: 5128,
    discount: 15,
  },
  {
    id: 'sadovaya',
    name: 'Номера на Невском 111',
    city: 'Санкт-Петербург',
    src: '/assets/hotels/sadovaya.jpg',
    rating: '8,7',
    reviews: 1367,
    priceRub: 2100,
    oldPriceRub: 2470,
    priceKzt: 2390,
    discount: 15,
  },
  {
    id: 'grace',
    name: 'Грейс Горизонт',
    city: 'Сочи',
    src: '/assets/hotels/grace.jpg',
    rating: '9,4',
    reviews: 304,
    priceRub: 2200,
    oldPriceRub: 2588,
    priceKzt: 2504,
    discount: 15,
  },
  {
    id: 'venera',
    name: 'Venera',
    city: 'Казань',
    src: '/assets/hotels/venera.jpg',
    rating: '8,9',
    reviews: 1359,
    priceRub: 6120,
    oldPriceRub: 7200,
    priceKzt: 6965,
    discount: 15,
  },
  {
    id: 'nnv',
    name: 'Marins Нижний Новгород',
    city: 'Нижний Новгород',
    src: '/assets/hotels/nnv.jpg',
    rating: '8,1',
    reviews: 1309,
    priceRub: 5432,
    oldPriceRub: 6390,
    priceKzt: 6182,
    discount: 15,
  },
  {
    id: 'nsk',
    name: 'Marins Новосибирск',
    city: 'Новосибирск',
    src: '/assets/hotels/nsk.jpg',
    rating: '8,7',
    reviews: 779,
    priceRub: 3553,
    oldPriceRub: 4180,
    priceKzt: 4043,
    discount: 15,
  },
  {
    id: 'krr',
    name: 'Golden Tulip Krasnodar',
    city: 'Краснодар',
    src: '/assets/hotels/krr.jpg',
    rating: '9,1',
    reviews: 2528,
    priceRub: 18360,
    oldPriceRub: 21600,
    priceKzt: 20894,
    discount: 15,
  },
  {
    id: 'kgd',
    name: 'Гостиница Калининград',
    city: 'Калининград',
    src: '/assets/hotels/kgd.jpg',
    rating: '8,5',
    reviews: 363,
    priceRub: 6577,
    oldPriceRub: 7738,
    priceKzt: 7485,
    discount: 15,
  },
  {
    id: 'vvo',
    name: 'Приморье',
    city: 'Владивосток',
    src: '/assets/hotels/vvo.jpg',
    rating: '8,1',
    reviews: 416,
    priceRub: 2342,
    oldPriceRub: 2755,
    priceKzt: 2665,
    discount: 15,
  },
];

type City = {
  id: string;
  code: string;
  region: 'kz' | 'ru';
  name: Record<LangCode, string>;
  country: Record<LangCode, string>;
};

const CITIES: City[] = [
  {
    id: 'ala',
    code: 'ALA',
    region: 'kz',
    name: { ru: 'Алматы', kk: 'Алматы' },
    country: { ru: 'Казахстан', kk: 'Қазақстан' },
  },
  {
    id: 'nqz',
    code: 'NQZ',
    region: 'kz',
    name: { ru: 'Астана', kk: 'Астана' },
    country: { ru: 'Казахстан', kk: 'Қазақстан' },
  },
  {
    id: 'cit',
    code: 'CIT',
    region: 'kz',
    name: { ru: 'Шымкент', kk: 'Шымкент' },
    country: { ru: 'Казахстан', kk: 'Қазақстан' },
  },
  {
    id: 'kzo',
    code: 'KZO',
    region: 'kz',
    name: { ru: 'Караганда', kk: 'Қарағанды' },
    country: { ru: 'Казахстан', kk: 'Қазақстан' },
  },
  {
    id: 'ura',
    code: 'URA',
    region: 'kz',
    name: { ru: 'Уральск', kk: 'Орал' },
    country: { ru: 'Казахстан', kk: 'Қазақстан' },
  },
  {
    id: 'mow',
    code: 'MOW',
    region: 'ru',
    name: { ru: 'Москва', kk: 'Мәскеу' },
    country: { ru: 'Россия', kk: 'Ресей' },
  },
  {
    id: 'led',
    code: 'LED',
    region: 'ru',
    name: { ru: 'Санкт-Петербург', kk: 'Санкт-Петербург' },
    country: { ru: 'Россия', kk: 'Ресей' },
  },
  {
    id: 'krr',
    code: 'KRR',
    region: 'ru',
    name: { ru: 'Краснодар', kk: 'Краснодар' },
    country: { ru: 'Россия', kk: 'Ресей' },
  },
  {
    id: 'aer',
    code: 'AER',
    region: 'ru',
    name: { ru: 'Сочи', kk: 'Сочи' },
    country: { ru: 'Россия', kk: 'Ресей' },
  },
  {
    id: 'ovb',
    code: 'OVB',
    region: 'ru',
    name: { ru: 'Новосибирск', kk: 'Новосибирск' },
    country: { ru: 'Россия', kk: 'Ресей' },
  },
  {
    id: 'kzn',
    code: 'KZN',
    region: 'ru',
    name: { ru: 'Казань', kk: 'Қазан' },
    country: { ru: 'Россия', kk: 'Ресей' },
  },
  {
    id: 'svx',
    code: 'SVX',
    region: 'ru',
    name: { ru: 'Екатеринбург', kk: 'Екатеринбург' },
    country: { ru: 'Россия', kk: 'Ресей' },
  },
];

function cityById(id: string) {
  return CITIES.find((city) => city.id === id)!;
}

function findCity(value: string, lang: LangCode): City | undefined {
  const q = value.trim().toLowerCase();
  if (!q) return undefined;
  return CITIES.find(
    (city) =>
      city.name.ru.toLowerCase() === q ||
      city.name.kk.toLowerCase() === q ||
      city.name[lang].toLowerCase() === q ||
      city.code.toLowerCase() === q,
  );
}

function filterCities(query: string, lang: LangCode, excludeName?: string) {
  const q = query.trim().toLowerCase();
  const exclude = excludeName?.trim().toLowerCase();
  return CITIES.filter((city) => {
    const name = city.name[lang];
    if (exclude && name.toLowerCase() === exclude) return false;
    if (!q) return true;
    return (
      name.toLowerCase().includes(q) ||
      city.name.ru.toLowerCase().includes(q) ||
      city.name.kk.toLowerCase().includes(q) ||
      city.code.toLowerCase().includes(q) ||
      city.country[lang].toLowerCase().includes(q)
    );
  });
}

type Carrier = {
  rank: number;
  name: string;
  rating: number;
  reviews: string;
  fromIds: string[];
};

const CARRIERS: Carrier[] = [
  { rank: 1, name: 'FlixBus KZ', rating: 4.8, reviews: '15 200', fromIds: ['ala', 'nqz', 'cit'] },
  { rank: 2, name: 'Qazaq Line', rating: 4.6, reviews: '9 800', fromIds: ['nqz', 'kzo', 'ala'] },
  { rank: 3, name: 'Turkestan Line', rating: 4.5, reviews: '7 100', fromIds: ['cit', 'ala'] },
  { rank: 4, name: 'Silk Road Bus', rating: 4.3, reviews: '5 400', fromIds: ['ala', 'ura'] },
  { rank: 5, name: 'Ecolines', rating: 4.4, reviews: '12 100', fromIds: ['mow', 'led', 'kzn'] },
  { rank: 6, name: 'Unitiki', rating: 4.2, reviews: '6 400', fromIds: ['mow', 'svx', 'ovb'] },
  { rank: 7, name: 'Саратов Авто', rating: 4.1, reviews: '3 900', fromIds: ['krr', 'aer', 'mow'] },
  { rank: 8, name: 'Алтай Транс', rating: 4.0, reviews: '2 700', fromIds: ['ovb', 'svx'] },
];

type TransportKind = 'plane' | 'train' | 'bus';

function buildMixedPlan(fromName: string, toName: string, lang: LangCode) {
  const fromCity = findCity(fromName, lang) ?? cityById('ala');
  const toCity = findCity(toName, lang) ?? cityById('mow');
  const moscow = cityById('mow');
  const astana = cityById('nqz');
  const almaty = cityById('ala');
  const kazan = cityById('kzn');

  let hub = moscow;
  let seg1Mode: TransportKind = 'plane';
  let seg2Mode: TransportKind = 'train';

  if (fromCity.region === 'kz' && toCity.region === 'ru') {
    if (toCity.id === 'mow') {
      hub = cityById('svx');
      seg1Mode = 'plane';
      seg2Mode = 'train';
    } else {
      hub = moscow;
      seg1Mode = 'plane';
      seg2Mode = toCity.id === 'aer' || toCity.id === 'krr' ? 'bus' : 'train';
    }
  } else if (fromCity.region === 'ru' && toCity.region === 'kz') {
    if (fromCity.id === 'mow') {
      hub = astana;
      seg1Mode = 'plane';
      seg2Mode = 'bus';
    } else {
      hub = moscow;
      seg1Mode = 'train';
      seg2Mode = 'plane';
    }
  } else if (fromCity.region === 'kz' && toCity.region === 'kz') {
    hub = fromCity.id === 'nqz' || toCity.id === 'nqz' ? almaty : astana;
    seg1Mode = 'bus';
    seg2Mode = 'plane';
  } else {
    hub = fromCity.id === 'mow' || toCity.id === 'mow' ? kazan : moscow;
    seg1Mode = 'train';
    seg2Mode = 'plane';
  }

  if (hub.id === fromCity.id || hub.id === toCity.id) {
    hub = hub.id === 'mow' ? kazan : moscow;
  }

  const seed = `${fromCity.code}${toCity.code}${hub.code}`
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const price1 = 22000 + (seed % 45) * 700;
  const price2 = 5500 + (seed % 30) * 350;
  const dur1h = 2 + (seed % 6);
  const dur1m = (seed * 11) % 60;
  const dur2h = 2 + (seed % 5);
  const dur2m = (seed * 17) % 60;
  const totalMin = dur1h * 60 + dur1m + dur2h * 60 + dur2m + 70;
  const totalH = Math.floor(totalMin / 60);
  const totalM = totalMin % 60;

  return {
    fromCity,
    toCity,
    hub,
    seg1Mode,
    seg2Mode,
    price1,
    price2,
    totalPrice: price1 + price2,
    dur1: `${dur1h}ч ${String(dur1m).padStart(2, '0')}м`,
    dur2: `${dur2h}ч ${String(dur2m).padStart(2, '0')}м`,
    totalDuration: `≈ ${totalH}ч ${String(totalM).padStart(2, '0')}м`,
  };
}

const MEMO_ICONS: MIconName[] = [
  'passport',
  'buildings',
  'plane-departure',
  'phone',
  'bank-card',
  'shield-checkmark',
];

type PopularRoute = {
  id: string;
  from: string;
  to: string;
  src: string;
  priceRub: number;
  oldPriceRub: number;
  priceKzt: number;
  discount: number;
};

const POPULAR_ROUTES_KZ_RU: PopularRoute[] = [
  {
    id: 'ala-mow',
    from: 'Алматы',
    to: 'Москва',
    src: '/assets/destinations/cities/moscow.jpg',
    priceRub: 18500,
    oldPriceRub: 21765,
    priceKzt: 98000,
    discount: 15,
  },
  {
    id: 'nqz-led',
    from: 'Астана',
    to: 'Санкт-Петербург',
    src: '/assets/destinations/cities/spb.jpg',
    priceRub: 16200,
    oldPriceRub: 19060,
    priceKzt: 86000,
    discount: 15,
  },
  {
    id: 'ala-aer',
    from: 'Алматы',
    to: 'Сочи',
    src: '/assets/destinations/cities/sochi.jpg',
    priceRub: 21400,
    oldPriceRub: 26750,
    priceKzt: 113000,
    discount: 20,
  },
  {
    id: 'cit-kzn',
    from: 'Шымкент',
    to: 'Казань',
    src: '/assets/destinations/cities/kazan.jpg',
    priceRub: 14800,
    oldPriceRub: 17410,
    priceKzt: 78000,
    discount: 15,
  },
  {
    id: 'nqz-svx',
    from: 'Астана',
    to: 'Екатеринбург',
    src: '/assets/destinations/cities/ekb.jpg',
    priceRub: 12900,
    oldPriceRub: 15175,
    priceKzt: 68000,
    discount: 15,
  },
  {
    id: 'ala-led',
    from: 'Алматы',
    to: 'Санкт-Петербург',
    src: '/assets/destinations/cities/spb.jpg',
    priceRub: 19800,
    oldPriceRub: 24750,
    priceKzt: 105000,
    discount: 20,
  },
];

const POPULAR_ROUTES_RU_RU: PopularRoute[] = [
  {
    id: 'csy-mow',
    from: 'Чебоксары',
    to: 'Москва',
    src: '/assets/destinations/cities/moscow.jpg',
    priceRub: 4830,
    oldPriceRub: 5682,
    priceKzt: 5496,
    discount: 15,
  },
  {
    id: 'rov-mow',
    from: 'Ростов-на-Дону',
    to: 'Москва',
    src: '/assets/destinations/cities/moscow.jpg',
    priceRub: 2709,
    oldPriceRub: 3187,
    priceKzt: 3083,
    discount: 15,
  },
  {
    id: 'mow-uly',
    from: 'Москва',
    to: 'Ульяновск',
    src: '/assets/destinations/cities/ulyanovsk.jpg',
    priceRub: 3684,
    oldPriceRub: 4334,
    priceKzt: 4192,
    discount: 15,
  },
  {
    id: 'ufa-mow',
    from: 'Уфа',
    to: 'Москва',
    src: '/assets/destinations/cities/ekb.jpg',
    priceRub: 3443,
    oldPriceRub: 4051,
    priceKzt: 3918,
    discount: 15,
  },
  {
    id: 'kzn-led',
    from: 'Казань',
    to: 'Санкт-Петербург',
    src: '/assets/destinations/cities/spb.jpg',
    priceRub: 4120,
    oldPriceRub: 4847,
    priceKzt: 4690,
    discount: 15,
  },
  {
    id: 'svx-aer',
    from: 'Екатеринбург',
    to: 'Сочи',
    src: '/assets/destinations/cities/sochi.jpg',
    priceRub: 5890,
    oldPriceRub: 7363,
    priceKzt: 6700,
    discount: 20,
  },
];

function formatMoney(value: number) {
  return value.toLocaleString('ru-RU').replace(/\u00a0/g, ' ');
}

type VoiceReview = {
  text: string;
  name: string;
  tag: string;
  accent: 'orange' | 'green' | 'purple' | 'teal';
};

/** Отзывы в духе реальных сценариев KZ→RU (и публичных отзывов о tutu) */
const VOICE_REVIEWS: Record<LangCode, VoiceReview[]> = {
  kk: [
    {
      text: 'Достармен бірге баратын болсақ, әдетте біреуі барлығына билет іздейді. Бірінші болып көбінесе Тутуға кіреміз.',
      name: 'Айгерим',
      tag: 'Достарымен саяхаттайды',
      accent: 'orange',
    },
    {
      text: 'Алғашында ресейлік сервистерді пайдалану әдеттен тыс еді, бірақ Тутуда қиындықтар болмады дерлік.',
      name: 'Данияр',
      tag: 'Алматы → Мәскеу',
      accent: 'green',
    },
    {
      text: 'Тутуды бірінші рет емес қолданамыз — әзірге бәрі күтпеген жағдайсыз өтті.',
      name: 'Аружан',
      tag: 'Ресейде оқиды',
      accent: 'purple',
    },
    {
      text: 'Қолдау түнде жауап берді: рейс кешіктірілгенде нұсқаларды түсіндіріп, билетті ауыстыруға көмектесті.',
      name: 'Мадина',
      tag: 'Астана → Санкт-Петербург',
      accent: 'teal',
    },
    {
      text: 'Ұшақ пен қонақүйді бір жерден алдым — салыстыру ыңғайлы, бағасы басқа сайттардан жиі арзанырақ.',
      name: 'Нұрлан',
      tag: 'Жолда жұмыс істейді',
      accent: 'orange',
    },
    {
      text: 'Сайт ыңғайлы, қайтаруды да жылдам рәсімдеді. Келесі сапарда да осында аламын.',
      name: 'Ерлан',
      tag: 'Шымкент → Қазан',
      accent: 'green',
    },
  ],
  ru: [
    {
      text: 'Когда едем куда-то с друзьями, обычно один человек смотрит билеты сразу для всех. На Туту чаще всего заходим в первую очередь.',
      name: 'Айгерим',
      tag: 'Путешествует с друзьями',
      accent: 'orange',
    },
    {
      text: 'Поначалу было непривычно пользоваться российскими сервисами, но с Туту таких проблем почти не было.',
      name: 'Данияр',
      tag: 'Алматы → Москва',
      accent: 'green',
    },
    {
      text: 'Пользуемся Туту не первый раз, пока всё проходило без неожиданностей.',
      name: 'Аружан',
      tag: 'Учится в России',
      accent: 'purple',
    },
    {
      text: 'Поддержка ответила ночью: когда рейс задержали, объяснили варианты и помогли с переоформлением.',
      name: 'Мадина',
      tag: 'Астана → Санкт-Петербург',
      accent: 'teal',
    },
    {
      text: 'Взял самолёт и отель в одном месте — удобно сравнивать, и часто выходит дешевле, чем на других сайтах.',
      name: 'Нурлан',
      tag: 'Работает в разъездах',
      accent: 'orange',
    },
    {
      text: 'Сайт удобный, возврат тоже оформили быстро. В следующий раз снова возьму здесь.',
      name: 'Ерлан',
      tag: 'Шымкент → Казань',
      accent: 'green',
    },
  ],
};

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      {eyebrow ? (
        <P
          size="paragraph-small"
          style={{
            marginBottom: 8,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: light ? 'rgba(255,255,255,0.7)' : undefined,
          }}
          color={light ? undefined : 'brand'}
        >
          {eyebrow}
        </P>
      ) : null}
      <H2 style={light ? { color: 'white' } : undefined}>{title}</H2>
      {subtitle ? (
        <P
          size="paragraph-medium"
          color={light ? undefined : 'neutral-secondary'}
          style={{
            marginTop: 8,
            maxWidth: 640,
            color: light ? 'rgba(255,255,255,0.75)' : undefined,
          }}
        >
          {subtitle}
        </P>
      ) : null}
    </div>
  );
}

function LandingContent() {
  const { lang, t } = useLang();
  const [modeIndex, setModeIndex] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [cityOpen, setCityOpen] = useState<'from' | 'to' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [carrierFilter, setCarrierFilter] = useState(0);
  const [promoCopied, setPromoCopied] = useState(false);
  const [hotelPromoCopied, setHotelPromoCopied] = useState(false);
  const [destMarket, setDestMarket] = useState<'kz-ru' | 'ru-ru'>('kz-ru');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [dealLeftMs, setDealLeftMs] = useState(20 * 60 * 1000);
  const destCarouselRef = useRef<HTMLDivElement>(null);
  const hotelCarouselRef = useRef<HTMLDivElement>(null);
  const reviewCarouselRef = useRef<HTMLDivElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFrom('');
    setTo('');
    setCityOpen(null);
    setSelectedDate(null);
    setCalendarOpen(false);
    setCarrierFilter(0);
  }, [lang]);

  useEffect(() => {
    if (!cityOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      const root = searchWrapRef.current;
      if (root && !root.contains(event.target as Node)) {
        setCityOpen(null);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [cityOpen]);

  useEffect(() => {
    const storageKey = 'landing-hero-deal-end';
    const duration = 20 * 60 * 1000;
    const readEnd = () => {
      const raw = sessionStorage.getItem(storageKey);
      const parsed = raw ? Number(raw) : NaN;
      if (!Number.isFinite(parsed) || parsed <= Date.now()) {
        const next = Date.now() + duration;
        sessionStorage.setItem(storageKey, String(next));
        return next;
      }
      return parsed;
    };

    let endAt = readEnd();
    const tick = () => {
      let left = endAt - Date.now();
      if (left <= 0) {
        endAt = Date.now() + duration;
        sessionStorage.setItem(storageKey, String(endAt));
        left = duration;
      }
      setDealLeftMs(left);
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const dealTimer = useMemo(() => {
    const totalSec = Math.max(0, Math.ceil(dealLeftMs / 1000));
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [dealLeftMs]);

  const dateLabel = selectedDate ? formatSearchDate(selectedDate, lang) : '';
  const isBusMode = modeIndex === 2;
  const isMixedMode = modeIndex === 3;
  const mixedFrom = from.trim() || t.mixedDefaultFrom;
  const mixedTo = to.trim() || t.mixedDefaultTo;

  const mixedPlan = useMemo(
    () => buildMixedPlan(mixedFrom, mixedTo, lang),
    [mixedFrom, mixedTo, lang],
  );

  const transportLabel = (kind: TransportKind) => {
    if (kind === 'plane') return t.mixedPlane;
    if (kind === 'train') return t.mixedTrain;
    return t.mixedBus;
  };

  const transportIcon = (kind: TransportKind): MIconName => {
    if (kind === 'plane') return 'plane';
    if (kind === 'train') return 'train';
    return 'bus';
  };

  const selectedFromCity = findCity(from, lang);
  /** 5 популярных городов отправления для фильтра, если «Откуда» пусто */
  const popularCarrierCities = useMemo(
    () => ['ala', 'nqz', 'cit', 'mow', 'led'].map((id) => cityById(id)),
    [],
  );

  const carrierFilters = [t.allCities, ...popularCarrierCities.map((city) => city.name[lang])];

  const carriers = useMemo(() => {
    let list = CARRIERS;
    if (selectedFromCity) {
      list = CARRIERS.filter((carrier) => carrier.fromIds.includes(selectedFromCity.id));
      if (list.length === 0) {
        list = CARRIERS.filter((carrier) =>
          carrier.fromIds.some((id) => cityById(id).region === selectedFromCity.region),
        );
      }
    } else if (carrierFilter > 0) {
      const city = popularCarrierCities[carrierFilter - 1];
      if (city) {
        list = CARRIERS.filter((carrier) => carrier.fromIds.includes(city.id));
      }
    }
    return list;
  }, [selectedFromCity, carrierFilter, popularCarrierCities]);

  const fromCityOptions = filterCities(from, lang, to);
  const toCityOptions = filterCities(to, lang, from);

  const pickCity = (field: 'from' | 'to', city: City) => {
    const name = city.name[lang];
    if (field === 'from') {
      setFrom(name);
      setCarrierFilter(0);
    } else {
      setTo(name);
    }
    setCityOpen(null);
  };

  const popularRoutes = destMarket === 'kz-ru' ? POPULAR_ROUTES_KZ_RU : POPULAR_ROUTES_RU_RU;

  const scrollDestCarousel = (direction: -1 | 1) => {
    const node = destCarouselRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>('.landing-dest-card');
    const step = (card?.offsetWidth ?? 280) + 16;
    node.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const scrollHotelCarousel = (direction: -1 | 1) => {
    const node = hotelCarouselRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>('.landing-hotel-card');
    const step = (card?.offsetWidth ?? 260) + 14;
    node.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const scrollReviewCarousel = (direction: -1 | 1) => {
    const node = reviewCarouselRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>('.landing-voice-card');
    const step = (card?.offsetWidth ?? 300) + 14;
    node.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const voiceReviews = VOICE_REVIEWS[lang];

  return (
    <>
      <Panel
        id="top"
        padding={0}
        isTopLeftRounded={false}
        isTopRightRounded={false}
        className={[
          'landing-hero',
          isMixedMode ? 'landing-hero--mixed' : '',
          cityOpen ? 'landing-hero--city-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ background: 'var(--tutu-brand-deep)' }}
      >
        <div className="landing-hero__stage">
          <div className="landing-hero__visual" aria-hidden>
            <div className="landing-hero__oval">
              <img src="/assets/hero.jpg" alt="" />
            </div>
          </div>
          <div className="landing-hero__deal-slot">
            <a
              href="#promo-deal"
              className="landing-hero__deal"
              aria-label={t.heroDeal}
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById('promo-deal');
                if (!target) return;
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                window.history.replaceState(null, '', '#promo-deal');
              }}
            >
              <span className="landing-hero__deal-text">{t.heroDeal}</span>
              <span className="landing-hero__deal-timer" aria-live="polite">
                {dealTimer}
              </span>
            </a>
          </div>
          <Container className="landing-hero__container">
            <div className="landing-hero__copy">
              <div className="landing-hero__lead">
                <H1 className="landing-hero__title" key={modeIndex}>
                  {t.heroTitles[modeIndex]}
                </H1>
                <span className="landing-hero__badge">{t.heroBadge}</span>
                <P size="paragraph-large" className="landing-hero__subtitle">
                  {t.heroSubtitle}
                </P>
                <div className="landing-hero__cta">
                  <Button
                    color="primary"
                    size={600}
                    onClick={() => {
                      document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t.chooseTicket}
                  </Button>
                </div>
              </div>

              <div className="landing-trust">
                <span className="landing-trust__item">
                  <RichIcon icon="bank-card" size={200} iconStyle="static-light-primary" />
                  <span>{t.trustCards}</span>
                </span>
                <span className="landing-trust__item">
                  <RichIcon icon="bubble-phone" size={200} iconStyle="static-light-primary" />
                  <span>{t.trustSupport}</span>
                </span>
                <span className="landing-trust__item">
                  <RichIcon icon="tickets" size={200} iconStyle="static-light-primary" />
                  <span>{t.trustTravelers}</span>
                </span>
                <span className="landing-trust__item">
                  <RichIcon icon="shield-checkmark" size={200} iconStyle="static-light-primary" />
                  <span>{t.trustYears}</span>
                </span>
              </div>
            </div>

            <div className="landing-modes" role="tablist" aria-label={t.chooseTicket}>
              {t.modes.map((mode, index) => {
                const active = index === modeIndex;
                const isMixed = index === 3;
                return (
                  <button
                    key={mode}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={
                      active
                        ? 'landing-modes__item landing-modes__item--active'
                        : 'landing-modes__item'
                    }
                    onClick={() => setModeIndex(index)}
                  >
                    <span className="landing-modes__halo">
                      <RichIcon
                        icon={MODE_ICONS[index]}
                        size={400}
                        iconStyle="static-light-primary"
                      />
                      {isMixed ? (
                        <span className="landing-modes__ai" aria-hidden>
                          AI
                        </span>
                      ) : null}
                    </span>
                    <span className="landing-modes__label">{mode}</span>
                  </button>
                );
              })}
            </div>

            <div className="landing-search-wrap" id="search" ref={searchWrapRef}>
              <div className="landing-search">
                <label
                  className={
                    cityOpen === 'from'
                      ? 'landing-search__cell landing-search__cell--open'
                      : 'landing-search__cell'
                  }
                >
                  <span className="landing-search__label">{t.from}</span>
                  <input
                    className="landing-search__input"
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setCityOpen('from');
                      setCarrierFilter(0);
                    }}
                    onFocus={() => setCityOpen('from')}
                    placeholder=" "
                    aria-label={t.from}
                    aria-expanded={cityOpen === 'from'}
                    autoComplete="off"
                  />
                  {cityOpen === 'from' ? (
                    <div className="landing-city-dropdown" role="listbox">
                      {fromCityOptions.map((city) => (
                        <button
                          key={city.id}
                          type="button"
                          className="landing-city-dropdown__item"
                          role="option"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => pickCity('from', city)}
                        >
                          <span className="landing-city-dropdown__pin" aria-hidden>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              />
                              <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                            </svg>
                          </span>
                          <span className="landing-city-dropdown__copy">
                            <span className="landing-city-dropdown__name">{city.name[lang]}</span>
                            <span className="landing-city-dropdown__country">
                              {city.country[lang]}
                            </span>
                          </span>
                          <span className="landing-city-dropdown__code">{city.code}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </label>

                <button
                  type="button"
                  className="landing-search__swap"
                  aria-label="swap"
                  onClick={() => {
                    setFrom(to);
                    setTo(from);
                    setCityOpen(null);
                  }}
                >
                  <RichIcon icon="arrow-bold-2-shuffle" size={400} />
                </button>

                <label
                  className={
                    cityOpen === 'to'
                      ? 'landing-search__cell landing-search__cell--open'
                      : 'landing-search__cell'
                  }
                >
                  <span className="landing-search__label">{t.to}</span>
                  <input
                    className="landing-search__input"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                      setCityOpen('to');
                    }}
                    onFocus={() => setCityOpen('to')}
                    placeholder=" "
                    aria-label={t.to}
                    aria-expanded={cityOpen === 'to'}
                    autoComplete="off"
                  />
                  {cityOpen === 'to' ? (
                    <div className="landing-city-dropdown" role="listbox">
                      {toCityOptions.map((city) => (
                        <button
                          key={city.id}
                          type="button"
                          className="landing-city-dropdown__item"
                          role="option"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => pickCity('to', city)}
                        >
                          <span className="landing-city-dropdown__pin" aria-hidden>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              />
                              <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                            </svg>
                          </span>
                          <span className="landing-city-dropdown__copy">
                            <span className="landing-city-dropdown__name">{city.name[lang]}</span>
                            <span className="landing-city-dropdown__country">
                              {city.country[lang]}
                            </span>
                          </span>
                          <span className="landing-city-dropdown__code">{city.code}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </label>

                <CalendarPopper
                  selectRange={false}
                  isOpen={calendarOpen}
                  onOpenChange={setCalendarOpen}
                  selectedDate={selectedDate ?? undefined}
                  onDateSelect={(date) => {
                    setSelectedDate(startOfDay(date));
                    setCalendarOpen(false);
                  }}
                  disablePastDays
                  numberOfMonths={1}
                  containerStyle="dropdown"
                >
                  {({ ref }) => (
                    <button
                      ref={ref as RefCallback<HTMLButtonElement>}
                      type="button"
                      className={
                        dateLabel
                          ? 'landing-search__cell landing-search__cell--date'
                          : 'landing-search__cell landing-search__cell--date landing-search__cell--empty'
                      }
                      aria-label={t.when}
                      aria-expanded={calendarOpen}
                    >
                      <span className="landing-search__label">{t.when}</span>
                      {dateLabel ? (
                        <span className="landing-search__value">{dateLabel}</span>
                      ) : null}
                    </button>
                  )}
                </CalendarPopper>

                <div className="landing-search__cell landing-search__cell--passengers">
                  <span className="landing-search__hint">{t.whoTravels}</span>
                  <span className="landing-search__value">{t.passengersOne}</span>
                </div>

                <button type="button" className="landing-search__submit">
                  {t.findShort}
                </button>
              </div>

              <div className="landing-search__suggest">
                <div className="landing-search__suggest-col">
                  {CITIES.filter((city) => city.region === 'kz')
                    .slice(0, 2)
                    .map((city) => (
                      <button
                        key={city.id}
                        type="button"
                        className="landing-search__chip"
                        onClick={() => pickCity('from', city)}
                      >
                        {city.name[lang]}
                      </button>
                    ))}
                </div>
                <div className="landing-search__suggest-gap" aria-hidden />
                <div className="landing-search__suggest-col">
                  {CITIES.filter((city) => city.region === 'ru')
                    .slice(0, 2)
                    .map((city) => (
                      <button
                        key={city.id}
                        type="button"
                        className="landing-search__chip"
                        onClick={() => pickCity('to', city)}
                      >
                        {city.name[lang]}
                      </button>
                    ))}
                </div>
                <div className="landing-search__suggest-col">
                  {t.whenSuggest.map((day, index) => (
                    <button
                      key={day}
                      type="button"
                      className="landing-search__chip"
                      onClick={() => setSelectedDate(addDays(new Date(), index))}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <div className="landing-search__suggest-col landing-search__suggest-col--empty" />
                <div className="landing-search__suggest-col landing-search__suggest-col--empty" />
              </div>

              {isMixedMode ? (
                <div className="landing-mixed">
                  <p className="landing-mixed__eyebrow">{t.mixedEyebrow}</p>
                  <h2 className="landing-mixed__title">
                    {mixedPlan.fromCity.name[lang]} → {mixedPlan.toCity.name[lang]}
                  </h2>

                  <div className="landing-mixed__segments">
                    <article className="landing-mixed__card">
                      <div className="landing-mixed__mode">
                        <RichIcon
                          icon={transportIcon(mixedPlan.seg1Mode)}
                          size={400}
                          iconStyle="brand"
                        />
                        <span>{transportLabel(mixedPlan.seg1Mode)}</span>
                      </div>
                      <strong className="landing-mixed__route">
                        {mixedPlan.fromCity.name[lang]} → {mixedPlan.hub.name[lang]}
                      </strong>
                      <p className="landing-mixed__meta">
                        {mixedPlan.dur1} · {formatMoney(mixedPlan.price1)} ₸
                      </p>
                      <Button color="primary" size={500} fullWidth>
                        {t.mixedSelect}
                      </Button>
                    </article>

                    <span className="landing-mixed__plus" aria-hidden>
                      +
                    </span>

                    <article className="landing-mixed__card">
                      <div className="landing-mixed__mode">
                        <RichIcon
                          icon={transportIcon(mixedPlan.seg2Mode)}
                          size={400}
                          iconStyle="brand"
                        />
                        <span>{transportLabel(mixedPlan.seg2Mode)}</span>
                      </div>
                      <strong className="landing-mixed__route">
                        {mixedPlan.hub.name[lang]} → {mixedPlan.toCity.name[lang]}
                      </strong>
                      <p className="landing-mixed__meta">
                        {mixedPlan.dur2} · {formatMoney(mixedPlan.price2)} ₸
                      </p>
                      <Button color="primary" size={500} fullWidth>
                        {t.mixedSelect}
                      </Button>
                    </article>
                  </div>

                  <div className="landing-mixed__total">
                    <div className="landing-mixed__total-copy">
                      <span className="landing-mixed__total-label">{t.mixedTotalLabel}</span>
                      <span className="landing-mixed__total-duration">
                        {mixedPlan.totalDuration} · {t.mixedVia(mixedPlan.hub.name[lang])}
                      </span>
                    </div>
                    <strong className="landing-mixed__total-price">
                      {formatMoney(mixedPlan.totalPrice)} ₸
                    </strong>
                    <Button color="primary" size={500}>
                      {t.mixedBuyBoth}
                    </Button>
                  </div>
                </div>
              ) : null}

              {isBusMode ? (
                <div id="bus-carriers" className="landing-bus-carriers">
                  <SectionTitle
                    light
                    eyebrow={t.carriersEyebrow}
                    title={t.carriersTitle}
                    subtitle={t.carriersSubtitle}
                  />

                  {!selectedFromCity ? (
                    <div className="landing-bus-carriers__filters">
                      {carrierFilters.map((filter, index) => (
                        <Button
                          key={filter}
                          color={carrierFilter === index ? 'primary' : 'secondary'}
                          size={400}
                          onClick={() => setCarrierFilter(index)}
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                  ) : null}

                  <div className="landing-bus-carriers__list">
                    {carriers.map((carrier) => (
                      <Panel key={carrier.name} backgroundColor="neutral" padding={400}>
                        <Row gap={300} style={{ alignItems: 'center' }}>
                          <Col col={{ xs: 12, md: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <Badge size={300} color="brand" value={`#${carrier.rank}`} />
                              <RichIcon icon="bus" size={600} shape="circle" iconStyle="brand" />
                              <div>
                                <H3>{carrier.name}</H3>
                                <P size="paragraph-small" color="neutral-secondary">
                                  ★ {carrier.rating} · {t.reviewsCount(carrier.reviews)}
                                </P>
                                <P size="paragraph-small" color="neutral-secondary">
                                  {t.fromCity(
                                    carrier.fromIds
                                      .map((id) => cityById(id).name[lang])
                                      .slice(0, 2)
                                      .join(', '),
                                  )}
                                </P>
                              </div>
                            </div>
                          </Col>
                          <Col
                            col={{ xs: 12, md: 4 }}
                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                          >
                            <Button color="primary" size={400}>
                              {t.learnMore}
                            </Button>
                          </Col>
                        </Row>
                      </Panel>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Container>
        </div>
      </Panel>

      <Panel
        padding={500}
        isTopLeftRounded
        isTopRightRounded
        className="landing-section-rounded"
        style={{ background: 'var(--tutu-page)' }}
      >
        <Container>
          <div className="landing-dest-switch" role="tablist" aria-label={t.destinationsTitle}>
            <button
              type="button"
              role="tab"
              aria-selected={destMarket === 'kz-ru'}
              className={
                destMarket === 'kz-ru'
                  ? 'landing-dest-switch__btn landing-dest-switch__btn--active'
                  : 'landing-dest-switch__btn'
              }
              onClick={() => setDestMarket('kz-ru')}
            >
              {t.destinationsTabKzRu}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={destMarket === 'ru-ru'}
              className={
                destMarket === 'ru-ru'
                  ? 'landing-dest-switch__btn landing-dest-switch__btn--active'
                  : 'landing-dest-switch__btn'
              }
              onClick={() => setDestMarket('ru-ru')}
            >
              {t.destinationsTabRuRu}
            </button>
          </div>

          <div className="landing-dest-shell">
            <div className="landing-dest-head">
              <div className="landing-dest-head__copy">
                <div className="landing-dest-head__title-row">
                  <H2 className="landing-dest-head__title">{t.destinationsTitle}</H2>
                </div>
                <P size="paragraph-medium" className="landing-dest-head__subtitle">
                  {t.destinationsSubtitle}
                </P>
              </div>
              <button type="button" className="landing-dest-all">
                {t.destinationsAll} ›
              </button>
            </div>

            <div className="landing-dest-carousel">
              <button
                type="button"
                className="landing-dest-nav landing-dest-nav--prev"
                aria-label="Prev"
                onClick={() => scrollDestCarousel(-1)}
              >
                ‹
              </button>
              <div className="landing-dest-track" ref={destCarouselRef} key={destMarket}>
                {popularRoutes.map((route) => (
                  <button
                    key={route.id}
                    type="button"
                    className="landing-dest-card"
                    onClick={() => {
                      setFrom(route.from);
                      setTo(route.to);
                      document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="landing-dest-card__media">
                      <img src={route.src} alt="" width={720} height={480} loading="lazy" />
                    </span>
                    <span className="landing-dest-card__body">
                      <span className="landing-dest-card__route">
                        {route.from} → {route.to}
                      </span>
                      <span className="landing-dest-card__prices">
                        <span className="landing-dest-card__price-row">
                          <span className="landing-dest-card__price">
                            {`${t.destinationsPriceFrom} ${formatMoney(route.priceRub)} ₽`}
                          </span>
                          <span className="landing-dest-card__discount">-{route.discount}%</span>
                        </span>
                        <span className="landing-dest-card__old">
                          {formatMoney(route.oldPriceRub)} ₽
                        </span>
                        <span className="landing-dest-card__kzt">
                          ≈ ₸{formatMoney(route.priceKzt)}
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="landing-dest-nav landing-dest-nav--next"
                aria-label="Next"
                onClick={() => scrollDestCarousel(1)}
              >
                ›
              </button>
            </div>
          </div>
        </Container>
      </Panel>

      <Panel padding={500} className="landing-promo-section" style={{ background: 'var(--tutu-page)' }}>
        <Container className="landing-promo-section__container">
          <SectionTitle title={t.loveTitle} />

          <div className="landing-love" aria-label={t.loveTitle}>
            {t.loveCards.map((card, index) => (
              <article key={card.title} className="landing-love__card">
                <div className="landing-love__copy">
                  <h3 className="landing-love__card-title">{card.title}</h3>
                  <p className="landing-love__card-text">{card.text}</p>
                </div>
                <div className="landing-love__visual" aria-hidden>
                  <RichIcon icon={LOVE_ICONS[index]} size={700} iconStyle="brand" />
                </div>
              </article>
            ))}
          </div>

          <div className="landing-hotels-shell">
            <div className="landing-hotels-head">
              <div className="landing-hotels-head__copy">
                <P size="paragraph-small" className="landing-hotels-head__eyebrow">
                  {t.hotelsEyebrow}
                </P>
                <div className="landing-hotels-head__title-row">
                  <H2 className="landing-hotels-head__title">{t.hotelsTitle}</H2>
                  <span className="landing-hotels-head__discount">{t.hotelsDiscount}</span>
                  <button
                    type="button"
                    className="landing-hotels-head__code"
                    aria-label={t.hotelsPromoCode}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(t.hotelsPromoCode);
                        setHotelPromoCopied(true);
                        window.setTimeout(() => setHotelPromoCopied(false), 1800);
                      } catch {
                        setHotelPromoCopied(false);
                      }
                    }}
                  >
                    <span>{hotelPromoCopied ? t.promoCopied : t.hotelsPromoCode}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect
                        x="9"
                        y="9"
                        width="11"
                        height="11"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M5 15V5a2 2 0 0 1 2-2h10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <P size="paragraph-medium" className="landing-hotels-head__subtitle">
                  {t.hotelsSubtitle}
                </P>
              </div>
              <button type="button" className="landing-hotels-all">
                {t.hotelsAll} ›
              </button>
            </div>

            <div className="landing-hotels-carousel">
              <button
                type="button"
                className="landing-hotels-nav landing-hotels-nav--prev"
                aria-label="Prev"
                onClick={() => scrollHotelCarousel(-1)}
              >
                ‹
              </button>
              <div className="landing-hotels-track" ref={hotelCarouselRef}>
                {HOTELS.map((hotel) => (
                  <article key={hotel.id} className="landing-hotel-card">
                    <div className="landing-hotel-card__media">
                      <img src={hotel.src} alt="" width={640} height={480} loading="lazy" />
                      <span className="landing-hotel-card__city">{hotel.city}</span>
                    </div>
                    <div className="landing-hotel-card__body">
                      <div className="landing-hotel-card__meta">
                        <span className="landing-hotel-card__rating">{hotel.rating}</span>
                        <span className="landing-hotel-card__reviews">
                          {t.reviewsCount(formatMoney(hotel.reviews))}
                        </span>
                      </div>
                      <h3 className="landing-hotel-card__name">{hotel.name}</h3>
                      <div className="landing-hotel-card__prices">
                        <div className="landing-hotel-card__price-row">
                          <span className="landing-hotel-card__price">
                            {formatMoney(hotel.priceRub)} ₽
                          </span>
                          <span className="landing-hotel-card__old">
                            {formatMoney(hotel.oldPriceRub)} ₽
                          </span>
                          <span className="landing-hotel-card__discount">-{hotel.discount}%</span>
                        </div>
                        <div className="landing-hotel-card__kzt">
                          ≈ ₸ {formatMoney(hotel.priceKzt)} {t.hotelsPerNight}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <button
                type="button"
                className="landing-hotels-nav landing-hotels-nav--next"
                aria-label="Next"
                onClick={() => scrollHotelCarousel(1)}
              >
                ›
              </button>
            </div>
          </div>

          <section className="landing-voice-shell" aria-label={t.reviewsShellTitle}>
            <H2 className="landing-voice-shell__title">{t.reviewsShellTitle}</H2>
            <div className="landing-voice-carousel">
              <button
                type="button"
                className="landing-voice-nav landing-voice-nav--prev"
                aria-label="Prev"
                onClick={() => scrollReviewCarousel(-1)}
              >
                ‹
              </button>
              <div className="landing-voice-track" ref={reviewCarouselRef}>
                {voiceReviews.map((review) => (
                  <article key={`${review.name}-${review.tag}`} className="landing-voice-card">
                    <div className="landing-voice-card__stars" aria-hidden>
                      ★★★★★
                    </div>
                    <p className="landing-voice-card__text">{review.text}</p>
                    <div className="landing-voice-card__footer">
                      <span
                        className={`landing-voice-card__avatar landing-voice-card__avatar--${review.accent}`}
                        aria-hidden
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="8" r="3.5" fill="currentColor" />
                          <path
                            d="M5 19c1.5-3.2 3.8-4.8 7-4.8s5.5 1.6 7 4.8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span className="landing-voice-card__meta">
                        <span className="landing-voice-card__name">{review.name}</span>
                        <span className="landing-voice-card__tag">{review.tag}</span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
              <button
                type="button"
                className="landing-voice-nav landing-voice-nav--next"
                aria-label="Next"
                onClick={() => scrollReviewCarousel(1)}
              >
                ›
              </button>
            </div>
          </section>

          <aside id="promo-deal" className="landing-promo-code landing-promo-code--orange">
            <div className="landing-promo-code__deal">
              <span className="landing-promo-code__deal-text">{t.heroDeal}</span>
              <span className="landing-promo-code__deal-timer" aria-live="polite">
                {dealTimer}
              </span>
            </div>
            <div className="landing-promo-code__copy">
              <P size="paragraph-large" className="landing-promo-code__subtitle">
                {t.promoSubtitle}
              </P>
              <button
                type="button"
                className="landing-promo-code__btn"
                aria-label={t.promoCode}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(t.promoCode);
                    setPromoCopied(true);
                    window.setTimeout(() => setPromoCopied(false), 1800);
                  } catch {
                    setPromoCopied(false);
                  }
                }}
              >
                <span>{promoCopied ? t.promoCopied : t.promoCode}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect
                    x="9"
                    y="9"
                    width="11"
                    height="11"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M5 15V5a2 2 0 0 1 2-2h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="landing-promo-code__visual" aria-hidden>
              <img
                src="/assets/hero-photo-promo.jpg"
                alt=""
                width={640}
                height={480}
                loading="lazy"
              />
            </div>
          </aside>
        </Container>
      </Panel>

      <Panel padding={500} style={{ background: 'var(--tutu-page)' }}>
        <Container>
          <SectionTitle
            eyebrow={t.memoEyebrow}
            title={t.memoTitle}
            subtitle={t.memoSubtitle}
          />
          <Row gap={300}>
            {t.memoItems.map((item, index) => (
              <Col key={item.title} col={{ xs: 12, sm: 6, md: 4 }}>
                <Panel
                  padding={400}
                  backgroundColor="neutral"
                  style={{ height: '100%', boxShadow: 'var(--tutu-shadow)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <RichIcon
                      icon={MEMO_ICONS[index]}
                      size={500}
                      shape="circle"
                      iconStyle="brand"
                    />
                    <P size="paragraph-small" color="brand" style={{ fontWeight: 700 }}>
                      {String(index + 1).padStart(2, '0')}
                    </P>
                  </div>
                  <H3 style={{ marginTop: 8 }}>{item.title}</H3>
                  <P size="paragraph-medium" color="neutral-secondary" style={{ marginTop: 8 }}>
                    {item.text}
                  </P>
                </Panel>
              </Col>
            ))}
          </Row>
        </Container>
      </Panel>

      <Panel padding={500} style={{ background: 'var(--tutu-page)' }}>
        <Container style={{ maxWidth: 760 }}>
          <div className="landing-faq">
            <H2 className="landing-faq__title">{t.faqTitle}</H2>
            <div className="landing-faq__list">
              {t.faqs.map((item, index) => {
                const open = faqOpen === index;
                return (
                  <div
                    key={item.q}
                    className={open ? 'landing-faq__item landing-faq__item--open' : 'landing-faq__item'}
                  >
                    <button
                      type="button"
                      className="landing-faq__question"
                      aria-expanded={open}
                      onClick={() => setFaqOpen(open ? null : index)}
                    >
                      <span>{item.q}</span>
                      <span className="landing-faq__chevron" aria-hidden>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    {open ? <div className="landing-faq__answer">{item.a}</div> : null}
                  </div>
                );
              })}
            </div>
          </div>

          <Panel
            padding={500}
            style={{
              marginTop: 32,
              textAlign: 'center',
              borderRadius: 'var(--tutu-radius-lg)',
              background: 'var(--tutu-brand-deep)',
            }}
          >
            <H2 style={{ color: 'var(--tutu-page)' }}>{t.ctaTitle}</H2>
            <P
              size="paragraph-medium"
              style={{
                color: 'var(--kite-content-static-light-secondary, hsla(0,0%,100%,.8))',
                marginTop: 8,
                marginBottom: 20,
              }}
            >
              {t.ctaSubtitle}
            </P>
            <Button color="primary" size={600}>
              {t.findTickets}
            </Button>
          </Panel>
        </Container>
      </Panel>
    </>
  );
}

export default function Home() {
  return (
    <PrototypeLayout page="landing-kz" theme="dark" product="avia">
      <LandingContent />
    </PrototypeLayout>
  );
}
