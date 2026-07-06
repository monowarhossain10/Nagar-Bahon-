import { NextRequest, NextResponse } from 'next/server';
import { locales } from '@/lib/i18n';

function getLocale(request: NextRequest): string {
  // Check if there's a preferred language cookie
  const langCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (langCookie && locales.includes(langCookie as any)) {
    return langCookie;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse the header and find the best match
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(preferredLang as any)) {
      return preferredLang;
    }
  }

  // Default to English
  return 'en';
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Determine the user's locale
  const locale = getLocale(request);

  // Redirect to the localized URL
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!_next|api|.*\\..*|_auth).*)',
    // Optional: only run on specific routes
    // '/(book|driver|admin|profile|wallet).*'
  ],
};
