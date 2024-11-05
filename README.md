[English](README.md) | [Español](README.es.md)

# Voluntariado Valencia

## About the App

Voluntariado Valencia is an application created to help coordinate resources and volunteers during the emergency situation in Valencia caused by heavy rainfall. Many areas in Valencia are currently without electricity and water. This app allows users to:

- View a map showing points where resources are needed or where volunteers are available.
- Register necessary resources at specific locations.
- Sign up as a volunteer to help in affected areas.
- Manage their own resources and volunteer registrations.

We use Next.js 15, TypeScript, React 19, Tailwind, Shadcn, Turso (SQLite), and other modern technologies to provide a robust and responsive platform for crisis management.

## Project Setup

To set up the project for development:

1. Clone the repository to your local machine.
2. Install Bun if you haven't already (visit bun.sh for installation instructions).
3. Navigate to the project directory in your terminal.
4. Run "bun install" to install all dependencies.
5. Run "bun run prepare" to set up Husky and the commit message linter.
6. Create a .env file in the root directory and add necessary environment variables (refer to .env.example).
7. Run "bun run dev" to start the development server.

Ensure you have a RELEASE_IT_TOKEN set up in your repository secrets for release-it to create GitHub releases.

## Git Flow Workflow

We follow an enhanced Git Flow model with automated tools for releases and enforced commit conventions.

### Developing New Features

To create a new feature:

1. Ensure you're on the develop branch and it's up to date:
   git checkout develop
   git pull origin develop

2. Create a new feature branch:
   git checkout -b feature/name-of-feature

3. Develop your feature, making commits that follow the conventional commit format.

4. Push your branch to GitHub:
   git push origin feature/name-of-feature

5. Create a Pull Request on GitHub from your feature branch to develop.

6. After review and approval, the PR will be merged into develop.

### Preparing a Release

Releases are created from the develop branch:

1. Ensure you're on the develop branch and it's up to date:
   git checkout develop
   git pull origin develop

2. Run the release command:
   bun run release -- minor  # For a minor version bump
   # or
   bun run release -- major  # For a major version bump

3. Follow the prompts from release-it. It will handle version bumping, changelog updates, commit creation, tagging, pushing changes, and creating a GitHub release.

4. After the release, merge the changes to main:
   git checkout main
   git merge develop
   git push origin main

5. Switch back to develop and merge the release changes:
   git checkout develop
   git merge main
   git push origin develop

### Hotfixes

Hotfixes are created from the main branch for urgent fixes:

1. Create a hotfix branch from main:
   git checkout main
   git pull origin main
   git checkout -b hotfix/description-of-problem

2. Make the necessary fixes, committing with the conventional commit format.

3. Run the hotfix release process:
   bun run release -- patch

4. Follow the prompts from release-it.

5. After the hotfix is released, merge the changes back to develop:
   git checkout develop
   git merge hotfix/description-of-problem
   git push origin develop

6. Delete the hotfix branch:
   git branch -d hotfix/description-of-problem

## Commit Conventions

We use Conventional Commits for our commit messages, enforced by commitlint. Your commit message should have this structure:

type(scope): description

Examples include:
- feat: add new login functionality
- fix: correct form validation error
- docs: update README with installation instructions
- style: format code according to project standards
- refactor: simplify data processing logic
- test: add tests for authentication module
- chore: update dependencies

Commits that don't follow this convention will be rejected by the commit linter.

### Handling Commit Failures

If your commit is rejected due to an incorrect message format:

1. The commit will not be created, and you'll see an error message explaining why it was rejected.
2. Your changes will still be staged, so you don't lose any work.
3. Simply run the commit command again with a corrected message that follows the convention.

### Undoing Commits

If you need to undo a commit:

1. To undo the last commit but keep your changes staged: 
   git reset --soft HEAD~1

2. To undo the last commit and unstage your changes:
   git reset HEAD~1

3. To undo multiple commits, replace 1 with the number of commits you want to undo.

Remember, if you've pushed the commit(s) to a shared branch, you should avoid rewriting history. Instead, create a new commit that reverts the changes.

## Branch Protection and Automated Tools

The main and develop branches are protected. Pull requests, status checks, and up-to-date branches are required before merging. These rules apply to administrators as well.

We use several tools to automate our workflow:
- release-it for automating the release process
- commitlint for enforcing commit message conventions
- husky for running commitlint on commit messages

To ensure these tools are set up correctly, always run "bun run prepare" after cloning the repository or pulling changes that modify the Husky or commitlint configuration.

By following these conventions and workflows, we maintain a clean, automated, and easy-to-follow project history while efficiently managing crisis response efforts in Valencia.