'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n';

const LanguageToggle: React.FC = () => {
  const t = useTranslations('Common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = (newLocale: Locale) => {
    // Set cookie to remember preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Replace the current locale in the pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2 bg-blue-800 rounded-lg p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => toggleLanguage(loc)}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
            ${locale === loc 
              ? 'bg-white text-blue-900 shadow-md' 
              : 'text-white hover:bg-blue-700'
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
