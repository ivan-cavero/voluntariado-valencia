import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { Octokit } from '@octokit/rest'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function createPullRequest(
	octokit,
	owner,
	repo,
	head,
	base,
	title,
	body,
) {
	try {
		const { data: pullRequest } = await octokit.pulls.create({
			owner,
			repo,
			title,
			head,
			base,
			body,
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

		// Create a new release branch
		const newVersion = execSync(
			`npm version --no-git-tag-version ${releaseType}`,
		)
			.toString()
			.trim()
		const releaseBranch = `release/${newVersion}`

		execSync(`git checkout -b ${releaseBranch}`)
		execSync('git add .')
		execSync(`git commit -m "chore: prepare release ${newVersion}"`)
		execSync(`git push origin ${releaseBranch}`)

		// Run release-it
		const command = `release-it ${releaseType} ${additionalArgs.join(' ')} --no-git.requireCleanWorkingDir`
		console.log('Executing command:', command)
		execSync(command, { stdio: 'inherit' })

		// Create pull requests
		const octokit = new Octokit({ auth: process.env.RELEASE_IT_TOKEN })
		const [owner, repo] = execSync('git remote get-url origin', {
			encoding: 'utf8',
		})
			.trim()
			.match(/github\.com[:/](.+)\/(.+)\.git$/i)
			.slice(1)

		// PR from release branch to main
		const mainPrUrl = await createPullRequest(
			octokit,
			owner,
			repo,
			releaseBranch,
			'main',
			`Release ${newVersion}`,
			`This PR merges the release ${newVersion} into main.`,
		)

		// PR from release branch to develop
		const developPrUrl = await createPullRequest(
			octokit,
			owner,
			repo,
			releaseBranch,
			'develop',
			`Merge release ${newVersion} into develop`,
			`This PR merges the release ${newVersion} back into develop.`,
		)

		console.log('Release process completed.')
		console.log(`Main PR: ${mainPrUrl}`)
		console.log(`Develop PR: ${developPrUrl}`)
	} catch (error) {
		console.error('Error:', error.message)
		process.exit(1)
	}
}

main()
