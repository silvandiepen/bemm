# Introduction to Bemm

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

## When to Use Bemm

Bemm is particularly useful when:

- You're building component-based applications
- You need to maintain consistent CSS naming conventions
- You want to reduce CSS specificity issues
- You need type-safe class name generation
- You're working with modern JavaScript frameworks

## Quick Example

Here's a quick example of how Bemm can simplify your component development:

```typescript
import { useBemm } from 'bemm';

// Initialize with a block name
const bemm = useBemm('card');

// Use in your component
const Card = ({ isActive, size }) => {
  return (
    <div className={bemm()}>
      <header className={bemm('header', { active: isActive })}>
        <h2 className={bemm('title')}></h2>
      </header>
      <div className={bemm('content', size)}>
        <p className={bemm('text')}></p>
      </div>
    </div>
  );
};
```

This generates clean, BEM-compliant class names:
```html
<div class="card">
  <header class="card__header card__header--active">
    <h2 class="card__title"></h2>
  </header>
  <div class="card__content card__content--large">
    <p class="card__text"></p>
  </div>
</div>
```

Continue reading the documentation to learn more about Bemm's features and how to integrate it into your projects.
