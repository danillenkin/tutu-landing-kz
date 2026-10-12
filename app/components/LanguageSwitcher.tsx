'use client';

import type { LangCode } from '../i18n/messages';

const OPTIONS: Array<{ code: LangCode; label: string }> = [
  { code: 'kk', label: 'ҚАЗ' },
  { code: 'ru', label: 'RU' },
];

export function LanguageSwitcher({
  value,
  onChange,
}: {
  value: LangCode;
  onChange: (lang: LangCode) => void;
}) {
  const activeIndex = OPTIONS.findIndex((option) => option.code === value);

  return (
    <div className="lang-switch" role="group" aria-label="Тіл / Язык">
      <span
        className="lang-switch__thumb"
        style={{ transform: `translateX(${Math.max(activeIndex, 0) * 100}%)` }}
        aria-hidden
      />
      {OPTIONS.map((option) => {
        const active = value === option.code;
        return (
          <button
            key={option.code}
            type="button"
            className={`lang-switch__btn${active ? ' is-active' : ''}`}
            aria-pressed={active}
            onClick={() => onChange(option.code)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
