import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { Octokit } from '@octokit/rest'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function createPullRequest(releaseType, version) {
	const octokit = new Octokit({ auth: process.env.RELEASE_IT_TOKEN })
	const [owner, repo] = execSync('git remote get-url origin', {
		encoding: 'utf8',
	})
		.trim()
		.match(/github\.com[:/](.+)\/(.+)\.git$/i)
		.slice(1)

	const base = releaseType === 'hotfix' ? 'main' : 'develop'
	const head = releaseType === 'hotfix' ? `hotfix/v${version}` : 'main'

	try {
		const { data: pullRequest } = await octokit.pulls.create({
			owner,
			repo,
			title: `${releaseType === 'hotfix' ? 'Hotfix' : 'Release'} v${version}`,
			head,
			base,
			body: `This PR merges the ${releaseType === 'hotfix' ? 'hotfix' : 'release'} v${version} into ${base}.`,
		})

		console.log(`Pull request created: ${pullRequest.html_url}`)
		return pullRequest.html_url
	} catch (error) {
		console.error('Error creating pull request:', error.message)
		return null
	}
}

async function main() {
	try {
		const envPath = path.resolve(process.cwd(), '.env')
		console.log('Attempting to read .env file from:', envPath)

		if (fs.existsSync(envPath)) {
			const envContent = fs.readFileSync(envPath, 'utf8')
			console.log('Env file content:', envContent)

			const match = envContent.match(/RELEASE_IT_TOKEN=(.+)/)
			if (match) {
				process.env.RELEASE_IT_TOKEN = match[1].trim()
				console.log(
					'Token set. First 4 chars:',
					process.env.RELEASE_IT_TOKEN.slice(0, 4),
				)
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

		// Get the new version number
		const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
		const version = packageJson.version

		// Create pull request
		const prUrl = await createPullRequest(releaseType, version)
		if (prUrl) {
			console.log(`Pull request created: ${prUrl}`)
		}
	} catch (error) {
		console.error('Error:', error.message)
		process.exit(1)
	}
}

main()
