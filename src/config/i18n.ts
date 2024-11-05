export const locales = ['en', 'es', 'ca'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
	en: 'English',
	es: 'Español',
	ca: 'Català',
}

export const urlLocales = locales
