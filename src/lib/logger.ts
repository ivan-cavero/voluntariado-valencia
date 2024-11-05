// src/lib/logger.ts
export const logger = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	info: (message: string, ...args: any[]) => {
		console.log(`[INFO] ${message}`, ...args)
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error: (message: string, ...args: any[]) => {
		console.error(`[ERROR] ${message}`, ...args)
	},
}
