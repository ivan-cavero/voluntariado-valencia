import type { MetadataRoute } from 'next'
import { getDictionary } from '@/lib/getDictionary'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const dict = await getDictionary('en')

	return {
		name: dict.metadata.title,
		short_name: dict.metadata.shortTitle,
		description: dict.metadata.description,
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		// icons: [
		// 	{
		// 		src: '/icon.png',
		// 		sizes: '192x192',
		// 		type: 'image/png',
		// 	},
		// 	{
		// 		src: '/icon-512.png',
		// 		sizes: '512x512',
		// 		type: 'image/png',
		// 	},
		// ],
		lang: 'en',
		dir: 'ltr',
	}
}
