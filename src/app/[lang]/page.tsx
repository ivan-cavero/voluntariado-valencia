import { getDictionary } from '@/lib/getDictionary'
import type { Locale } from '@/config/i18n'
import { logger } from '@/lib/logger'

export default async function HomePage({
	params,
}: {
	params: { lang: Locale }
}) {
	const { lang } = await params
	logger.info('Rendering HomePage for lang:', lang)
	const dict = await getDictionary(lang)

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-4xl font-bold text-center">{dict.home.title}</h1>
		</main>
	)
}
