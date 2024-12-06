---
title: Core Concepts
description: Learn the fundamental concepts of BEM methodology and how to implement them using Bemm
menu:
  order: 3
  group: Getting Started
  title: Core Concepts
tags:
  - bem
  - methodology
  - concepts
  - patterns
hide: false
image: null
thumbnail: null
projectStyle: null
---

# Core Concepts

This guide explains the core concepts and principles behind Bemm's implementation of BEM methodology.

## Understanding BEM with Bemm

BEM (Block Element Modifier) is a methodology that helps you create reusable components. Bemm provides a simple API to implement BEM naming conventions in your JavaScript/TypeScript applications.

### Block

A block represents a standalone component that is meaningful on its own.

```typescript
const bemm = useBemm('navbar');
bemm(); // → 'navbar'
```

### Element

An element is a part of a block that has no standalone meaning.

```typescript
const bemm = useBemm('navbar');
bemm('item');     // → 'navbar__item'
bemm('logo');     // → 'navbar__logo'
bemm('menu');     // → 'navbar__menu'
```

### Modifier

A modifier is a flag on a block or element that changes its appearance or behavior.

```typescript
const bemm = useBemm('navbar');
bemm('item', 'active');     // → 'navbar__item--active'
bemm('menu', 'collapsed');  // → 'navbar__menu--collapsed'
```

## Working with Modifiers

Bemm provides several ways to work with modifiers:

### Single Modifier

```typescript
const bemm = useBemm('button');
bemm('', 'primary');           // → 'button--primary'
bemm('icon', 'large');         // → 'button__icon--large'
```

### Multiple Modifiers

```typescript
const bemm = useBemm('button');
bemm('', ['primary', 'large']); // → ['button--primary', 'button--large']
bemm('icon', ['spin', 'dark']); // → ['button__icon--spin', 'button__icon--dark']
```

### Conditional Modifiers

```typescript
const bemm = useBemm('button');
bemm('', {
  primary: true,
  large: false,
  disabled: true
}); // → ['button--primary', 'button--disabled']
```

### Pattern-Based Modifiers

Bemm supports pattern-based modifiers using the pipe (|) syntax:

```typescript
const bemm = useBemm('button');

// Size variations (0-based index)
bemm('', {
  'small|medium|large': 1
}); // → 'button--medium'

// Theme variations
bemm('', {
  'light|dark': 0
}); // → 'button--light'

// Multiple patterns
bemm('', {
  'small|medium|large': 2,
  'light|dark': 1
}); // → ['button--large', 'button--dark']
```

## Return Types

Bemm can return class names in different formats based on your needs:

### Auto Mode (Default)

```typescript
const bemm = useBemm('card');

// Single class returns string
bemm('title');                    // → 'card__title'

// Multiple classes returns array
bemm('title', ['large', 'bold']); // → ['card__title--large', 'card__title--bold']
```

### String Mode

```typescript
const bemm = useBemm('card', { return: 'string' });

// Always returns space-separated string
bemm('title', ['large', 'bold']); // → 'card__title--large card__title--bold'
```

### Array Mode

```typescript
const bemm = useBemm('card', { return: 'array' });

// Always returns array
bemm('title');                    // → ['card__title']
bemm('title', ['large', 'bold']); // → ['card__title--large', 'card__title--bold']
```

## Case Transformation

By default, Bemm converts all class names to kebab-case:

```typescript
const bemm = useBemm('myButton');

bemm();                    // → 'my-button'
bemm('innerElement');      // → 'my-button__inner-element'
bemm('icon', 'isActive'); // → 'my-button__icon--is-active'

// Disable kebab-case transformation
const rawBemm = useBemm('myButton', { toKebabCase: false });

rawBemm();                 // → 'myButton'
rawBemm('innerElement');   // → 'myButton__innerElement'
rawBemm('icon', 'isActive'); // → 'myButton__icon--isActive'
```

## Base Class Inclusion

Control whether to include the base class when using modifiers:

```typescript
// Default behavior (includeBaseClass: false)
const bemm = useBemm('button');
bemm('', 'primary'); // → 'button--primary'

// With includeBaseClass: true
const bemmWithBase = useBemm('button', { includeBaseClass: true });
bemmWithBase('', 'primary'); // → ['button', 'button--primary']

// With elements
bemmWithBase('icon', 'large'); // → ['button__icon', 'button__icon--large']
```

## Best Practices

1. **Use Semantic Names**
   ```typescript
   // Good
   const bemm = useBemm('card');
   bemm('header');
   bemm('content');

   // Avoid
   const bemm = useBemm('div1');
   bemm('span2');
   ```

2. **Keep Modifiers Boolean-Like**
   ```typescript
   // Good
   bemm('button', 'disabled');
   bemm('menu', 'collapsed');

   // Avoid
   bemm('button', 'color-red');
   bemm('menu', 'padding-large');
   ```

3. **Use Consistent Patterns**
   ```typescript
   // Good
   bemm('', { 'small|medium|large': 1 });
   bemm('', { 'light|dark': 0 });

   // Avoid mixing patterns
   bemm('', { 'sm|md|lg': 1, 'size-1|size-2': 0 });
   ```

4. **Prefer Object Syntax for Complex Conditions**
   ```typescript
   // Good
   bemm('button', {
     primary: isPrimary,
     disabled: isDisabled,
     loading: isLoading
   });

   // Avoid
   bemm('button', [
     isPrimary ? 'primary' : '',
     isDisabled ? 'disabled' : '',
     isLoading ? 'loading' : ''
   ].filter(Boolean));
   ```

## Next Steps

- Learn about [Framework Integrations](/framework-integrations)
- Explore [Examples](/examples)
- Check out the [API Reference](/api-reference)
