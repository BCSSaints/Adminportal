# CLAUDE.md — Adminportal

> Guidelines and context for AI assistants working in this repository.

## Project Overview

**Adminportal** is an admin portal application. This repository is in its initial setup phase.

- **Repository**: BCSSaints/Adminportal
- **Status**: New project — initial scaffolding in progress

## Repository Structure

```
Adminportal/
├── CLAUDE.md          # AI assistant guidelines (this file)
└── (project files TBD)
```

> **Note**: This file should be updated as the project grows. Each major directory, config file, or convention added to the project should be reflected here.

## Development Workflow

### Branch Conventions

- Feature branches: `feature/<description>`
- Bug fixes: `bugfix/<description>`
- AI-generated branches: `claude/<description>-<session-id>`

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in imperative mood (e.g., "Add", "Fix", "Update", "Remove")
- Keep the subject line under 72 characters

### Pull Requests

- PRs should target the main/default branch unless otherwise specified
- Include a summary of changes and any testing performed

## Code Conventions

> To be updated as the tech stack and coding patterns are established.

### General Principles

- Keep code simple and readable
- Follow the principle of least surprise
- Prefer explicit over implicit
- Write self-documenting code; add comments only where intent isn't obvious

## Testing

> To be updated once a test framework is chosen and configured.

- Run all tests before submitting changes
- Add tests for new functionality
- Do not reduce existing test coverage

## Environment Setup

> To be updated once dependencies and tooling are established.

1. Clone the repository
2. Install dependencies (TBD)
3. Configure environment variables (TBD)
4. Start the development server (TBD)

## Key Files to Update

When making changes, remember to update:

- This `CLAUDE.md` file when adding new patterns, tools, or conventions
- `README.md` (when created) for user-facing documentation
- Any relevant config files when adding dependencies or tooling

## AI Assistant Guidelines

- **Read before writing**: Always read existing files before modifying them
- **Minimal changes**: Only change what's necessary to complete the task
- **No over-engineering**: Avoid adding abstractions or features not requested
- **Preserve style**: Match existing code style and conventions in the project
- **Test your changes**: Run available tests/linters before committing
- **Update docs**: Keep this file and other documentation current
