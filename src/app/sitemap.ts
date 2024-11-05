import type { MetadataRoute } from 'next'
import { locales } from '@/config/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://www.voluntariado-valencia.com'
	const pages = ['/']

	return locales.flatMap((locale) =>
		pages.map((page) => ({
			url: `${baseUrl}/${locale}${page}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		})),
	)
}
