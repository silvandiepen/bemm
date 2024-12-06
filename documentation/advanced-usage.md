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

### Complex Pattern Matching

```typescript
const bemm = useBemm('card');

// Multiple patterns
bemm('', {
  'xs|sm|md|lg|xl': 2,           // → 'card--md'
  'primary|secondary|tertiary': 0, // → 'card--primary'
  'light|dark': 1                 // → 'card--dark'
});

// Conditional patterns
const size = 2;
const theme = isDarkMode ? 1 : 0;

bemm('', {
  'small|medium|large': size,    // → 'card--large'
  'light|dark': theme           // → 'card--dark' (if isDarkMode is true)
});
```

## Working with Multiple Blocks

### Using Multiple Bemm Instances

```typescript
const cardBemm = useBemm('card');
const buttonBemm = useBemm('button');

function Component() {
  return `
    <div class="${cardBemm()}">
      <div class="${cardBemm('header')}">
        <button class="${buttonBemm('', 'primary')}">
          Click me
        </button>
      </div>
    </div>
  `;
}
```

### Combining Multiple Classes

```typescript
import { useClasses } from 'bemm';

const bemm = useBemm('component');
const classes = useClasses();

// Combine multiple class sets
const combinedClasses = classes(
  bemm(''),
  bemm('element', 'modifier'),
  'external-class',
  { 'conditional-class': true }
);
```

## Dynamic Block Names

### Using Variables for Block Names

```typescript
const getComponentBemm = (componentName: string) => {
  return useBemm(`app-${componentName}`);
};

const headerBemm = getComponentBemm('header');
const footerBemm = getComponentBemm('footer');

headerBemm('title');  // → 'app-header__title'
footerBemm('links');  // → 'app-footer__links'
```

### Namespace Pattern

```typescript
const createNamespace = (namespace: string) => {
  return (blockName: string) => useBemm(`${namespace}-${blockName}`);
};

const adminBemm = createNamespace('admin');
const userBemm = createNamespace('user');

const adminDashboard = adminBemm('dashboard');
const userDashboard = userBemm('dashboard');

adminDashboard('widget');  // → 'admin-dashboard__widget'
userDashboard('widget');   // → 'user-dashboard__widget'
```

## Advanced Modifier Patterns

### Compound Modifiers

```typescript
const bemm = useBemm('input');

// Multiple conditions affecting modifiers
const getInputModifiers = (
  isValid: boolean,
  isTouched: boolean,
  isRequired: boolean
) => ({
  valid: isValid && isTouched,
  invalid: !isValid && isTouched,
  required: isRequired,
  pristine: !isTouched
});

bemm('', getInputModifiers(true, true, true));
// → ['input--valid', 'input--required']
```

### State-Based Modifiers

```typescript
const bemm = useBemm('form');

type FormState = 'idle' | 'loading' | 'success' | 'error';

const getFormClasses = (state: FormState) => {
  const stateIndex = ['idle', 'loading', 'success', 'error'].indexOf(state);

  return bemm('', {
    'idle|loading|success|error': stateIndex,
    active: state !== 'idle'
  });
};

getFormClasses('loading');
// → ['form--loading', 'form--active']
```

## Custom Return Types

### Creating Custom Formatters

```typescript
const bemm = useBemm('component', {
  return: 'string',
  format: (block: string, element?: string, modifier?: string) => {
    // Custom formatting logic
    const base = element ? `${block}__${element}` : block;
    return modifier ? `${base}:${modifier}` : base;
  }
});

bemm('header', 'active');  // → 'component__header:active'
```

### Array to String Transformation

```typescript
const bemm = useBemm('nav');
const toString = (classes: string | string[]) =>
  Array.isArray(classes) ? classes.join(' ') : classes;

// Usage
const classes = toString(bemm('item', ['active', 'highlighted']));
// → 'nav__item--active nav__item--highlighted'
```

## Integration with CSS-in-JS

### Styled Components Example

```typescript
import styled from 'styled-components';
import { useBemm } from 'bemm';

const bemm = useBemm('card');

const StyledCard = styled.div`
  &.${bemm()} {
    /* Base styles */
  }

  &.${bemm('', 'highlighted')} {
    /* Highlighted state styles */
  }

  .${bemm('header')} {
    /* Header styles */
  }

  .${bemm('content')} {
    /* Content styles */
  }
`;
```

### Emotion Example

```typescript
import { css } from '@emotion/css';
import { useBemm } from 'bemm';

const bemm = useBemm('modal');

const modalStyles = css`
  .${bemm()} {
    /* Modal styles */
  }

  .${bemm('', 'open')} {
    /* Open state styles */
  }

  .${bemm('overlay')} {
    /* Overlay styles */
  }
`;
```

## Performance Optimization

### Memoization

```typescript
import { useMemo } from 'react';

function Component() {
  // Memoize bemm instance
  const bemm = useMemo(() => useBemm('component'), []);

  // Memoize complex modifier calculations
  const modifiers = useMemo(() => ({
    'small|medium|large': size,
    active: isActive,
    disabled: isDisabled
  }), [size, isActive, isDisabled]);

  return (
    <div className={bemm('', modifiers)}>
      {/* Component content */}
    </div>
  );
}
```

### Reusable Modifier Maps

```typescript
// Create reusable modifier maps
const SIZE_MODIFIERS = {
  sm: 0,
  md: 1,
  lg: 2
} as const;

const THEME_MODIFIERS = {
  light: 0,
  dark: 1
} as const;

// Use in components
function Button({ size = 'md', theme = 'light' }) {
  const bemm = useBemm('button');

  return (
    <button
      className={bemm('', {
        'sm|md|lg': SIZE_MODIFIERS[size],
        'light|dark': THEME_MODIFIERS[theme]
      })}
    >
      {/* Button content */}
    </button>
  );
}
```

## Type Safety

### Custom Type Definitions

```typescript
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonState = 'idle' | 'loading' | 'success' | 'error';

interface ButtonModifiers {
  size: ButtonSize;
  variant: ButtonVariant;
  state: ButtonState;
  disabled?: boolean;
}

// Use with type checking
function createButtonClasses(modifiers: ButtonModifiers) {
  const bemm = useBemm('button');

  return bemm('', {
    'small|medium|large': ['small', 'medium', 'large'].indexOf(modifiers.size),
    'primary|secondary|tertiary': ['primary', 'secondary', 'tertiary'].indexOf(modifiers.variant),
    'idle|loading|success|error': ['idle', 'loading', 'success', 'error'].indexOf(modifiers.state),
    disabled: modifiers.disabled
  });
}
```

## Next Steps

- Check out [Examples and Use Cases](/examples)
- Learn about [Performance Optimization](/performance)
- Read the [Contributing Guide](/contributing)
