---
title: Bemm Documentation
description: Complete guide to using Bemm, including installation, configuration, and examples
menu:
  order: 1
  title: Documentation
---

# Bemm Documentation

Bemm is a lightweight, zero-dependency JavaScript/TypeScript library for generating BEM-compliant class names in modern web applications.

## Installation

```bash
# Using npm
npm install bemm

# Using yarn
yarn add bemm

# Using pnpm
pnpm add bemm
```

## Basic Usage

```typescript
import { useBemm } from 'bemm';

const bemm = useBemm('card');

// Basic usage
bemm();                     // → 'card'
bemm('title');             // → 'card__title'
bemm('button', 'primary'); // → 'card__button--primary'
```

## Configuration (BemmSettings)

When initializing Bemm, you can provide a `BemmSettings` object to customize its behavior:

```typescript
interface BemmSettings {
  toKebabCase?: boolean;      // Default: true
  return?: BemmReturn;         // Default: 'auto'
  prefix?: {
    element?: string;          // Default: '__'
    modifier?: string;         // Default: '--'
  };
  includeBaseClass?: boolean;  // Default: false
}

type BemmReturn = 'array' | 'string' | 'auto';
```

### Settings Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `toKebabCase` | `boolean` | `true` | Converts class names to kebab-case (e.g., `myButton` → `my-button`) |
| `return` | `BemmReturn` | `'auto'` | Output format: `'auto'` (smart), `'string'` (space-separated), or `'array'` (array of classes) |
| `prefix.element` | `string` | `'__'` | Separator between block and element |
| `prefix.modifier` | `string` | `'--'` | Separator between element and modifier |
| `includeBaseClass` | `boolean` | `false` | Include base element class when using modifiers |

### Configuration Examples

```typescript
// Custom configuration
const bemm = useBemm('card', {
  toKebabCase: true,
  return: 'string',
  prefix: {
    element: '--',
    modifier: '-'
  },
  includeBaseClass: true
});

// With custom prefixes
bemm('title', 'large');  // → 'card--title-large'

// With includeBaseClass
bemm('button', 'primary'); // → 'card--button card--button-primary'
```

## Advanced Features

### Multiple Modifiers

```typescript
// Array of modifiers
bemm('button', ['primary', 'large']);
// → ['card__button--primary', 'card__button--large']

// With string return type
const stringBemm = useBemm('card', { return: 'string' });
stringBemm('button', ['primary', 'large']);
// → 'card__button--primary card__button--large'
```

### Conditional Modifiers

```typescript
bemm('button', {
  primary: true,
  large: false,
  disabled: true
});
// → ['card__button--primary', 'card__button--disabled']
```

### Pattern Matching

```typescript
bemm('size', { 'small|medium|large': 1 });
// → 'card__size--medium'

bemm('theme', { 'light|dark': true });
// → 'card__theme--light'
```

### Multiple Blocks

```typescript
const bemms = useBemms({
  card: 'card',
  button: 'btn'
});

bemms.card('title');    // → 'card__title'
bemms.button('icon');   // → 'btn__icon'
```

## Framework Integration

### React Example

```tsx
const Card = ({ isActive, size }) => {
  const bemm = useBemm('card');

  return (
    <div className={bemm()}>
      <header className={bemm('header', { active: isActive })}>
        <h2 className={bemm('title')}>Title</h2>
      </header>
      <div className={bemm('content', size)}>
        <p className={bemm('text')}>Content</p>
      </div>
    </div>
  );
};
```

### Vue Example

```vue
<template>
  <div :class="bemm()">
    <header :class="bemm('header', { active: isActive })">
      <h2 :class="bemm('title')">Title</h2>
    </header>
    <div :class="bemm('content', size)">
      <p :class="bemm('text')">Content</p>
    </div>
  </div>
</template>

<script setup>
import { useBemm } from 'bemm';
const bemm = useBemm('card');
</script>
```

## TypeScript Support

Bemm is written in TypeScript and provides full type definitions:

```typescript
interface BemmModifiers {
  [key: string]: boolean | number;
}

interface BemmObject {
  element: string | string[] | null;
  modifier: string | string[] | BemmModifiers;
  show?: boolean;
}

type bemmReturnType = (
  e?: BemmObject['element'] | BemmObject,
  m?: BemmObject['modifier'],
  s?: BemmSettings
) => string | string[];
```

## Best Practices

1. Initialize `useBemm` at the component level for better organization
2. Use descriptive block and element names
3. Keep modifiers focused on single responsibilities
4. Leverage TypeScript for better type safety
5. Use conditional modifiers for dynamic states
6. Consider using `return: 'string'` for simpler class binding

## Performance Considerations

- Bemm is lightweight and has zero dependencies
- Class name generation is memoized for better performance
- Use `return: 'array'` when working with large sets of modifiers
- Avoid unnecessary re-initialization of `useBemm`
