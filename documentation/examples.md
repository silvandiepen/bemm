---
title: Examples and Use Cases
description: Practical examples of using Bemm in real-world applications, including common UI components, layout components, and complex implementations
menu:
  order: 5
  group: Examples & Usage
  title: Examples
---

# Examples and Use Cases

This guide provides practical examples and common use cases for using Bemm in real-world applications.

## Common UI Components

### Button Component

```typescript
// Button.tsx
import { useBemm } from 'bemm';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children
}) => {
  const bemm = useBemm('button');

  const variantIndex = ['primary', 'secondary', 'tertiary'].indexOf(variant);
  const sizeIndex = ['small', 'medium', 'large'].indexOf(size);

  return (
    <button
      className={bemm('', {
        'primary|secondary|tertiary': variantIndex,
        'small|medium|large': sizeIndex,
        disabled,
        loading
      })}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

// CSS
.button { /* Base styles */ }
.button--primary { /* Primary variant */ }
.button--secondary { /* Secondary variant */ }
.button--tertiary { /* Tertiary variant */ }
.button--small { /* Small size */ }
.button--medium { /* Medium size */ }
.button--large { /* Large size */ }
.button--disabled { /* Disabled state */ }
.button--loading { /* Loading state */ }
```

### Card Component

```typescript
// Card.vue
<template>
  <div :class="bemm()">
    <div v-if="$slots.header" :class="bemm('header')">
      <slot name="header" />
    </div>
    <div :class="bemm('content')">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="bemm('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';

const props = defineProps<{
  elevated?: boolean;
  bordered?: boolean;
}>();

const bemm = useBemm('card', { return: 'string' });

// CSS
<style scoped>
.card {
  background: white;
  border-radius: 8px;
}
.card--elevated {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.card--bordered {
  border: 1px solid #eee;
}
.card__header {
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.card__content {
  padding: 16px;
}
.card__footer {
  padding: 16px;
  border-top: 1px solid #eee;
}
</style>
</script>
```

[Rest of the content remains unchanged...]

## Next Steps

- Learn about [Advanced Usage](/advanced-usage)
- Check out the [API Reference](/api-reference)
- Read about [Performance Optimization](/docs/performance)
