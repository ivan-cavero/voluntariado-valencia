import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getDictionary } from '@/lib/getDictionary'
import type { Locale } from '@/config/i18n'
import { locales } from '@/config/i18n'
import { logger } from '@/lib/logger'
import { ThemeProvider } from '@/components/themeProvider'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
	return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
	params,
}: {
	params: { lang: Locale }
}): Promise<Metadata> {
	const { lang } = await params
	logger.info('Generating metadata for lang:', lang)
	const dict = await getDictionary(lang)

	return {
		title: {
			default: dict.metadata.title,
			template: `%s | ${dict.metadata.title}`,
		},
		description: dict.metadata.description,
		keywords: dict.metadata.keywords,
		openGraph: {
			title: dict.metadata.title,
			description: dict.metadata.description,
			url: `https://www.voluntariado-valencia.com/${lang}`,
			siteName: dict.metadata.title,
			locale: lang,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: dict.metadata.title,
			description: dict.metadata.description,
		},
		alternates: {
			canonical: `https://www.voluntariado-valencia.com/${lang}`,
			languages: {
				es: 'https://www.voluntariado-valencia.com/es',
				en: 'https://www.voluntariado-valencia.com/en',
				ca: 'https://www.voluntariado-valencia.com/ca',
			},
		},
	}
}

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { lang: Locale }
}) {
	const { lang } = await params
	logger.info('Rendering layout for lang:', lang)
	return (
		<html lang={lang} suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
