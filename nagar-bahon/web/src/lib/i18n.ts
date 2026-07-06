import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'bn'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../public/locales/${locale}.json`)).default
}));
