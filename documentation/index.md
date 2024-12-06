---
title: Bemm Documentation
description: A lightweight, zero-dependency JavaScript/TypeScript library for BEM class naming in modern web applications
menu:
  order: 1
  title: Overview
  items:
    - title: Getting Started
      items:
        - title: Installation
          path: /installation
        - title: Core Concepts
          path: /core-concepts
        - title: Framework Integrations
          path: /framework-integrations
    - title: Examples & Usage
      items:
        - title: Basic Examples
          path: /examples
        - title: Advanced Usage
          path: /advanced-usage
    - title: Reference
      items:
        - title: API Reference
          path: /api-reference
---

# Bemm Documentation

Bemm is a lightweight, zero-dependency JavaScript/TypeScript library designed to simplify BEM (Block Element Modifier) class naming in modern web applications. It provides an intuitive API for generating BEM-compliant class names, making it easier to maintain consistent CSS architecture across your projects.

## What is BEM?

BEM (Block Element Modifier) is a naming methodology that helps you create reusable components and organize CSS code in a logical and maintainable way. The naming convention follows this pattern:

- **Block**: The standalone entity that is meaningful on its own (e.g., `header`, `menu`, `button`)
- **Element**: A part of a block that has no standalone meaning (e.g., `header__title`, `menu__item`)
- **Modifier**: A flag on a block or element that changes appearance or behavior (e.g., `button--disabled`, `menu__item--active`)

## Why Bemm?

### 🎯 Key Benefits

- **Type-Safe**: Built with TypeScript for better development experience and code reliability
- **Framework Agnostic**: Works with any JavaScript framework or vanilla JS
- **Zero Dependencies**: Lightweight and efficient with no external dependencies
- **Flexible API**: Supports various usage patterns and configuration options
- **Framework Integrations**: Official support for Vue, React, and Nuxt

### 🚀 Features

1. **Simple API**
   ```typescript
   const bemm = useBemm('button');
   bemm(); // → 'button'
   bemm('icon'); // → 'button__icon'
   bemm('icon', 'large'); // → 'button__icon--large'
   ```

2. **Multiple Modifiers**
   ```typescript
   bemm('icon', ['large', 'primary']); // → ['button__icon--large', 'button__icon--primary']
   ```

3. **Conditional Modifiers**
   ```typescript
   bemm('icon', { large: true, primary: false }); // → 'button__icon--large'
   ```

4. **Advanced Pattern Matching**
   ```typescript
   bemm('icon', { 'small|medium|large': 1 }); // → 'button__icon--medium'
   ```

## Quick Start

```bash
# Install Bemm
npm install bemm

# or with yarn
yarn add bemm
```

Basic usage:

```typescript
import { useBemm } from 'bemm';

const bemm = useBemm('button');

bemm();                    // → 'button'
bemm('icon');             // → 'button__icon'
bemm('icon', 'large');    // → 'button__icon--large'
```

## Support

- [GitHub Issues](https://github.com/silvandiepen/bemm/issues)
- [GitHub Discussions](https://github.com/silvandiepen/bemm/discussions)

## License

Bemm is [ISC licensed](https://github.com/silvandiepen/bemm/blob/main/LICENSE).
