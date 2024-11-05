const fs = require('node:fs')
const path = require('node:path')
const { execSync } = require('node:child_process')

try {
	const envPath = path.resolve(process.cwd(), '.env')

	if (fs.existsSync(envPath)) {
		const envContent = fs.readFileSync(envPath, 'utf8')

		const match = envContent.match(/RELEASE_IT_TOKEN=(.+)/)
		if (match) {
			process.env.RELEASE_IT_TOKEN = match[1].trim()
		} else {
			throw new Error('RELEASE_IT_TOKEN not found in .env file')
		}
	} else {
		throw new Error('.env file not found')
	}

	const releaseType = process.argv[2]
	const additionalArgs = process.argv.slice(3)

	const command = `release-it ${releaseType} ${additionalArgs.join(' ')}`
	console.log('Executing command:', command)

	execSync(command, { stdio: 'inherit' })
} catch (error) {
	console.error('Error:', error.message)
	process.exit(1)
}
