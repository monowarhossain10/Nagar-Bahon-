'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n';

const LanguageToggle: React.FC = () => {
  const t = useTranslations('Common');
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = (newLocale: Locale) => {
    // Set cookie to remember preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Reload with new locale
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => toggleLanguage(loc)}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
            ${locale === loc 
              ? 'bg-blue-900 text-white shadow-md' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
          aria-label={`Switch to ${loc === 'en' ? 'English' : 'বাংলা'}`}
          aria-current={locale === loc ? 'true' : undefined}
        >
          {loc === 'en' ? 'EN' : 'বাংলা'}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
