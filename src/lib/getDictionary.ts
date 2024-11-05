import 'server-only'
import type { Locale } from '@/config/i18n'
import { logger } from './logger'

const dictionaries = {
	en: () => import('@/dictionaries/en.json').then((module) => module.default),
	es: () => import('@/dictionaries/es.json').then((module) => module.default),
	ca: () => import('@/dictionaries/ca.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
	logger.info('Getting dictionary for locale:', locale)
	return dictionaries[locale]()
}
