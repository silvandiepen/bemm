---
title: Advanced Usage
description: Learn advanced features and patterns for using Bemm in complex scenarios, including pattern matching, dynamic blocks, and integration with CSS-in-JS
menu:
  order: 6
  group: Examples & Usage
  title: Advanced Usage
---

# Advanced Usage

This guide covers advanced features and patterns for using Bemm in complex scenarios.

## Pattern Matching System

Bemm provides a powerful pattern matching system for handling multiple state variations:

### Basic Pattern Matching

```typescript
const bemm = useBemm('button');

// Size variations
bemm('', {
  'small|medium|large': 1  // → 'button--medium'
});

// Theme variations
bemm('', {
  'light|dark': 0         // → 'button--light'
});
```

[Rest of the content remains unchanged...]

## Next Steps

- Check out [Examples](/examples)
- Review the [API Reference](/api-reference)
- Learn about [Performance Optimization](/docs/performance)
