---
title: Installation and Setup
description: Learn how to install and configure Bemm in your project, with examples for different module systems and TypeScript support
menu:
  order: 2
  group: Getting Started
  title: Installation
tags:
  - installation
  - setup
  - configuration
hide: false
image: null
thumbnail: null
projectStyle: null
---

# Installation and Setup

This guide will walk you through installing and setting up Bemm in your project.

## Installation

You can install Bemm using npm or yarn:

```bash
# Using npm
npm install bemm

# Using yarn
yarn add bemm

# Using pnpm
pnpm add bemm
```

## Basic Setup

### ES Modules / TypeScript

```typescript
import { useBemm } from 'bemm';

const bemm = useBemm('block');
```

### CommonJS

```javascript
const { useBemm } = require('bemm');

const bemm = useBemm('block');
```

## Configuration Options

When initializing Bemm, you can provide configuration options to customize its behavior:

```typescript
const bemm = useBemm('block', {
  toKebabCase: true,      // Convert class names to kebab-case
  return: 'auto',         // 'auto' | 'string' | 'array'
  includeBaseClass: false // Include base class when using modifiers
});
```

### Configuration Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `toKebabCase` | `boolean` | `true` | When enabled, automatically converts all class names to kebab-case format (e.g., `myButton` becomes `my-button`) |
| `return` | `'auto' \| 'string' \| 'array'` | `'auto'` | Determines the return type format. In `'auto'` mode, returns a string for single classes and an array for multiple classes |
| `includeBaseClass` | `boolean` | `false` | When enabled, includes the base element class when using modifiers |

## Basic Usage Examples

```typescript
// Initialize with block name
const bemm = useBemm('card');

// Basic usage
bemm();                    // → 'card'
bemm('title');            // → 'card__title'
bemm('button', 'primary'); // → 'card__button--primary'

// With multiple modifiers
bemm('button', ['primary', 'large']); // → ['card__button--primary', 'card__button--large']

// With conditional modifiers
bemm('button', {
  primary: true,
  large: false,
  disabled: true
}); // → ['card__button--primary', 'card__button--disabled']

// With return type configuration
const stringBemm = useBemm('card', { return: 'string' });
stringBemm('button', ['primary', 'large']); // → 'card__button--primary card__button--large'

const arrayBemm = useBemm('card', { return: 'array' });
arrayBemm('button'); // → ['card__button']
```

## TypeScript Support

Bemm is written in TypeScript and provides full type definitions out of the box. When using TypeScript, you'll get type checking and autocompletion for all options and methods:

```typescript
import { useBemm } from 'bemm';

// Configuration types are checked
const bemm = useBemm('block', {
  toKebabCase: true,
  return: 'string', // Type-checked: must be 'auto', 'string', or 'array'
});

// Method parameters are type-checked
bemm('element', {
  modifier: true,  // Object properties are type-checked
  'a|b|c': 1      // Pattern strings are type-checked
});
```

## Next Steps

- Learn about [Core Concepts](/core-concepts)
- Explore [Framework Integrations](/framework-integrations)
- Check out [Examples](/examples)
