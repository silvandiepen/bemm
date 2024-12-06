---
title: Contributing Guide
description: Learn how to contribute to Bemm, including development setup, workflow, and guidelines for code, documentation, and releases
menu:
  order: 2
  group: Advanced Topics
  title: Contributing
---

# Contributing to Bemm

Thank you for your interest in contributing to Bemm! This guide will help you get started with contributing to the project.

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Setting Up the Development Environment

1. Fork the repository and clone it locally:
```bash
git clone https://github.com/your-username/bemm.git
cd bemm
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run tests to ensure everything is working:
```bash
npm test
# or
yarn test
```

## Project Structure

```
bemm/
├── src/                    # Source code
│   ├── classNames/        # Class name generation utilities
│   ├── helpers/           # Helper functions
│   ├── useBemm/           # Core Bemm functionality
│   ├── useClasses/        # Class composition utilities
│   ├── index.ts           # Main entry point
│   └── types.ts           # TypeScript type definitions
├── tests/                 # Test files
├── docs/                  # Documentation
└── examples/              # Example implementations
```

## Development Workflow

### 1. Create a Branch

Create a branch for your contribution:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
```

### 2. Development Guidelines

#### Code Style

- Use TypeScript for all new code
- Follow existing code formatting (EditorConfig and Prettier are configured)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

#### TypeScript Guidelines

```typescript
// Use explicit types
function example(value: string): number {
  return value.length;
}

// Use interfaces for complex types
interface BemmOptions {
  toKebabCase?: boolean;
  return?: 'auto' | 'string' | 'array';
  includeBaseClass?: boolean;
}

// Use type guards when necessary
function isValidModifier(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}
```

#### Testing

- Write tests for all new features and bug fixes
- Maintain existing test coverage
- Use descriptive test names

```typescript
describe('useBemm', () => {
  it('should generate correct class name with element and modifier', () => {
    const bemm = useBemm('block');
    expect(bemm('element', 'modifier')).toBe('block__element--modifier');
  });
});
```

### 3. Commit Guidelines

Follow conventional commits specification:

```bash
# Format: <type>(<scope>): <description>

# Examples:
feat(core): add support for multiple modifiers
fix(types): correct return type for useBemm
docs(readme): update installation instructions
test(useBemm): add tests for pattern matching
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `style`: Code style changes
- `perf`: Performance improvements
- `chore`: Maintenance tasks

### 4. Testing Your Changes

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### 5. Submitting a Pull Request

1. Push your changes:
```bash
git push origin your-branch-name
```

2. Create a Pull Request on GitHub
3. Fill in the PR template with:
   - Description of changes
   - Related issues
   - Breaking changes (if any)
   - Screenshots (if applicable)

## Documentation

### Adding Documentation

1. Create or update markdown files in the `docs/` directory
2. Follow the existing documentation structure
3. Include code examples where appropriate
4. Update the table of contents if necessary

### Documentation Style Guide

- Use clear, concise language
- Include code examples for complex features
- Use proper markdown formatting
- Link to related documentation when relevant

Example:
```markdown
## Feature Name

Description of the feature.

### Basic Usage

\```typescript
const bemm = useBemm('block');
bemm('element', 'modifier');
\```

### Advanced Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| option1 | string | 'default' | Description |
```

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a release PR
4. After merge, create a GitHub release
5. NPM package will be published automatically

## Getting Help

- Create an issue for bugs or feature requests
- Join our community discussions
- Tag your issues appropriately:
  - `bug`: Bug reports
  - `feature`: Feature requests
  - `docs`: Documentation improvements
  - `help wanted`: Issues needing assistance

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Focus on constructive feedback
- Maintain professional communication
- Help others learn and grow

### Enforcement

- First occurrence: Warning
- Second occurrence: Temporary ban
- Third occurrence: Permanent ban

## License

By contributing to Bemm, you agree that your contributions will be licensed under its ISC license.

## See Also

- [Performance Guide](/docs/performance)
- [API Reference](/api-reference)
- [Examples](/examples)
