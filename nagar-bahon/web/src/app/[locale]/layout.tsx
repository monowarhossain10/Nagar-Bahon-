import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Hind_Siliguri, Inter } from 'next/font/google';
import Navigation from '@/components/common/Navigation';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  variable: '--font-hind-siliguri',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Nagar Bahon',
  description: 'Ride sharing platform',
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={locale === 'bn' ? hindSiliguri.variable : inter.variable}>
      <body className={locale === 'bn' ? 'font-hind-siliguri' : 'font-inter'}>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
