# Performance Optimization

This guide covers best practices and techniques for optimizing Bemm's performance in your applications.

## General Best Practices

### 1. Memoize Bemm Instances

Create Bemm instances at the component level and memoize them to prevent unnecessary re-creation:

```typescript
// React Example
import { useMemo } from 'react';
import { useBemm } from 'bemm';

function Component() {
  // Good: Memoized instance
  const bemm = useMemo(() => useBemm('component'), []);

  // Bad: New instance on every render
  const badBemm = useBemm('component');

  return <div className={bemm()}>{/* ... */}</div>;
}
```

### 2. Cache Complex Modifier Calculations

For complex modifier calculations, use memoization to prevent recalculation on every render:

```typescript
function ComplexComponent({ size, theme, isActive }) {
  const bemm = useMemo(() => useBemm('component'), []);

  // Good: Memoized modifiers
  const modifiers = useMemo(() => ({
    'small|medium|large': ['small', 'medium', 'large'].indexOf(size),
    'light|dark': theme === 'light' ? 0 : 1,
    active: isActive
  }), [size, theme, isActive]);

  return <div className={bemm('', modifiers)}>{/* ... */}</div>;
}
```

### 3. Prefer String Return Type for Single Classes

When you know you'll only have one class, use the string return type to avoid array processing:

```typescript
// Good: String return type for single classes
const bemm = useBemm('button', { return: 'string' });

// Less optimal: Auto return type when you know it's always single
const autoBemm = useBemm('button');
```

## Memory Optimization

### 1. Reuse Modifier Maps

Create reusable modifier maps instead of recreating them inline:

```typescript
// Good: Reusable modifier maps
const SIZE_MODIFIERS = {
  small: 0,
  medium: 1,
  large: 2
} as const;

const THEME_MODIFIERS = {
  light: 0,
  dark: 1
} as const;

function Component({ size, theme }) {
  const bemm = useBemm('component');

  return (
    <div className={bemm('', {
      'small|medium|large': SIZE_MODIFIERS[size],
      'light|dark': THEME_MODIFIERS[theme]
    })}>
      {/* ... */}
    </div>
  );
}
```

### 2. Shared Bemm Instances

For components that share the same block name, consider sharing the Bemm instance:

```typescript
// Good: Shared instance
const buttonBemm = useBemm('button');

function PrimaryButton(props) {
  return <button className={buttonBemm('', 'primary')} {...props} />;
}

function SecondaryButton(props) {
  return <button className={buttonBemm('', 'secondary')} {...props} />;
}
```

## Render Optimization

### 1. Conditional Rendering

Only calculate classes when needed:

```typescript
function Component({ isVisible, type }) {
  const bemm = useBemm('component');

  // Good: Only calculate when needed
  if (!isVisible) return null;

  const className = bemm('', type);
  return <div className={className}>{/* ... */}</div>;
}
```

### 2. Avoid Unnecessary Array Spreads

When combining classes, avoid unnecessary array spreads:

```typescript
// Good: Direct array usage
const classes = [
  bemm(''),
  isActive && bemm('', 'active'),
  isDisabled && bemm('', 'disabled')
].filter(Boolean);

// Less optimal: Unnecessary spread
const classesSpread = [
  ...bemm(''),
  ...(isActive ? [bemm('', 'active')] : []),
  ...(isDisabled ? [bemm('', 'disabled')] : [])
];
```

## Framework-Specific Optimizations

### React

```typescript
// Use with React.memo for pure components
const OptimizedComponent = React.memo(function OptimizedComponent({
  size,
  theme
}) {
  const bemm = useMemo(() => useBemm('component'), []);
  const modifiers = useMemo(() => ({
    'small|medium|large': SIZE_MODIFIERS[size],
    'light|dark': THEME_MODIFIERS[theme]
  }), [size, theme]);

  return <div className={bemm('', modifiers)}>{/* ... */}</div>;
});
```

### Vue

```typescript
// Vue Composition API optimization
import { computed } from 'vue';

const bemm = useBemm('component');

// Computed properties for reactive class names
const className = computed(() =>
  bemm('', {
    'small|medium|large': SIZE_MODIFIERS[props.size],
    'light|dark': THEME_MODIFIERS[props.theme]
  })
);
```

### Angular

```typescript
// Use with OnPush change detection
@Component({
  selector: 'app-optimized',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="className">
      <!-- ... -->
    </div>
  `
})
export class OptimizedComponent {
  private bemm = useBemm('component');

  // Memoized class calculation
  className = memoize((size: string, theme: string) =>
    this.bemm('', {
      'small|medium|large': SIZE_MODIFIERS[size],
      'light|dark': THEME_MODIFIERS[theme]
    })
  );
}
```

## Bundle Size Optimization

### 1. Tree Shaking

Bemm is designed to be tree-shakeable. Import only what you need:

```typescript
// Good: Specific imports
import { useBemm } from 'bemm';

// Bad: Import everything
import * as Bemm from 'bemm';
```

### 2. Code Splitting

For large applications, consider code splitting your components and their Bemm instances:

```typescript
// Good: Code splitting with dynamic imports
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Performance Monitoring

### 1. React DevTools Profiler

Use React DevTools Profiler to monitor component re-renders and identify performance bottlenecks:

```typescript
// Wrap performance-critical components with Profiler
import { Profiler } from 'react';

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  console.log(`Component ${id} took ${actualDuration}ms to render`);
}

function App() {
  return (
    <Profiler id="BemmComponent" onRender={onRender}>
      <YourComponent />
    </Profiler>
  );
}
```

### 2. Performance Metrics

Monitor key performance metrics when using Bemm:

```typescript
function measureBemmPerformance() {
  const bemm = useBemm('component');

  const start = performance.now();

  // Your Bemm operations
  const result = bemm('element', {
    'small|medium|large': 1,
    'light|dark': 0
  });

  const end = performance.now();
  console.log(`Bemm operation took ${end - start}ms`);

  return result;
}
```

## Next Steps

- Check out [Examples and Use Cases](/examples)
- Read the [Contributing Guide](/contributing)
- Review the [API Reference](/api-reference)
