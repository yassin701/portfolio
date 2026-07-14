import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Next.js 16 requires named or default 'proxy' export
export function proxy(request) {
  return intlMiddleware(request);
}

export default proxy;

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/...)
  // - TRPC routes (/trpc/...)
  // - Internal Next.js files (_next, _vercel)
  // - Files with extensions (e.g. favicon.ico, .png, .css, etc.)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
