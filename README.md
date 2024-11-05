[English](README.md) | [Español](README.es.md)

# Git Flow Workflow

This project follows the Git Flow model for version control. Below is a detailed explanation of how to work with this flow and how the main branches are protected.

## Main Branches

- `main`: Represents the production code. Only updated through releases or hotfixes.
- `develop`: Main development branch. All features are integrated here.

## Workflows

### Developing New Features

1. Create a new branch from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/name-of-feature
   ```

2. Develop the new feature in this branch.

3. Once completed, create a Pull Request to `develop`:
   ```bash
   git push origin feature/name-of-feature
   ```
   Then, create the PR on GitHub.

4. After review and approval, merge the PR into `develop`.

### Preparing a Release

1. Create a release branch from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.x.x
   ```

2. Make final adjustments, update version and documentation.

3. Create a Pull Request to `main`:
   ```bash
   git push origin release/v1.x.x
   ```
   Create the PR on GitHub.

4. After approval, merge into `main` and tag the new version:
   ```bash
   git checkout main
   git pull origin main
   git merge release/v1.x.x
   git tag -a v1.x.x -m "Release v1.x.x"
   git push origin main --tags
   ```

5. Merge the release into `develop` as well:
   ```bash
   git checkout develop
   git pull origin develop
   git merge release/v1.x.x
   git push origin develop
   ```

6. Delete the release branch:
   ```bash
   git branch -d release/v1.x.x
   git push origin --delete release/v1.x.x
   ```

### Hotfixes

1. Create a hotfix branch from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/description-of-problem
   ```

2. Make the fix.

3. Create a Pull Request to `main`:
   ```bash
   git push origin hotfix/description-of-problem
   ```
   Create the PR on GitHub.

4. After approval, merge into `main` and tag:
   ```bash
   git checkout main
   git pull origin main
   git merge hotfix/description-of-problem
   git tag -a v1.x.y -m "Hotfix v1.x.y"
   git push origin main --tags
   ```

5. Merge the hotfix into `develop` as well:
   ```bash
   git checkout develop
   git pull origin develop
   git merge hotfix/description-of-problem
   git push origin develop
   ```

6. Delete the hotfix branch:
   ```bash
   git branch -d hotfix/description-of-problem
   git push origin --delete hotfix/description-of-problem
   ```

## Branch Protection in GitHub

- [x] Require pull request reviews before merging
- [x] Require status checks to pass before merging
- [x] Require branches to be up to date before merging
- [x] Include administrators
- [x] Restrict who can push to matching branches

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages. Some examples:

- `feat: add new login functionality`
- `fix: correct form validation error`
- `docs: update README with installation instructions`
- `style: format code according to project standards`
- `refactor: simplify data processing logic`
- `test: add tests for authentication module`
- `chore: update dependencies`

By following these conventions and workflows, we'll maintain a clean and easy-to-follow project history.