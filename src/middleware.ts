import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale } from '@/config/i18n'

function getLocale(request: NextRequest): string {
	const acceptLanguage = request.headers.get('Accept-Language') || defaultLocale

	const negotiatorHeaders: Record<string, string> = {
		'accept-language': acceptLanguage,
	}

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
	return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	// Handle manifest requests
	if (pathname.endsWith('/manifest.webmanifest')) {
		return NextResponse.rewrite(new URL('/manifest.webmanifest', request.url))
	}

	// Handle sitemap requests
	if (pathname.endsWith('sitemap.xml')) {
		return NextResponse.rewrite(new URL('sitemap.xml', request.url))
	}

	const pathnameIsMissingLocale = locales.every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	)

	if (pathnameIsMissingLocale) {
		const locale = getLocale(request)
		return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
