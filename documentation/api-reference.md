# API Reference

This document provides detailed information about Bemm's API, including all functions, parameters, return types, and configuration options.

## Core Functions

### useBemm

The main function for creating BEM class names.

```typescript
function useBemm(
  block: string,
  options?: BemmOptions
): BemmFunction;
```

#### Parameters

- `block` (string, required): The BEM block name
- `options` (BemmOptions, optional): Configuration options

#### Options Interface

```typescript
interface BemmOptions {
  toKebabCase?: boolean;      // Default: true
  return?: ReturnType;        // Default: 'auto'
  includeBaseClass?: boolean; // Default: false
}

type ReturnType = 'auto' | 'string' | 'array';
```

#### Return Type

Returns a function with the following signature:

```typescript
interface BemmFunction {
  (
    element?: string | BemmObject,
    modifier?: string | string[] | ModifierObject
  ): string | string[];
}

interface BemmObject {
  element: string;
  modifier?: string | string[] | ModifierObject;
  show?: boolean;
}

interface ModifierObject {
  [key: string]: boolean | number;
}
```

#### Examples

```typescript
// Basic usage
const bemm = useBemm('block');
bemm();                    // → 'block'
bemm('element');          // → 'block__element'
bemm('element', 'mod');   // → 'block__element--mod'

// With options
const bemm = useBemm('block', {
  toKebabCase: false,
  return: 'array',
  includeBaseClass: true
});

// With modifier object
bemm('element', {
  active: true,
  disabled: false
}); // → ['block__element--active']

// With pattern matching
bemm('element', {
  'small|medium|large': 1
}); // → 'block__element--medium'

// With BemmObject
bemm({
  element: 'button',
  modifier: 'primary',
  show: true
}); // → 'block__button--primary'
```

### useClasses

Utility function for combining multiple class names.

```typescript
function useClasses(
  options?: ClassesOptions
): ClassesFunction;
```

#### Parameters

- `options` (ClassesOptions, optional): Configuration options

#### Options Interface

```typescript
interface ClassesOptions {
  return?: ReturnType;  // Default: 'auto'
}
```

#### Return Type

Returns a function with the following signature:

```typescript
interface ClassesFunction {
  (...classes: ClassValue[]): string | string[];
}

type ClassValue =
  | string
  | string[]
  | { [key: string]: boolean }
  | undefined
  | null;
```

#### Examples

```typescript
const classes = useClasses();

// Basic usage
classes('one', 'two');  // → 'one two'

// With arrays
classes(['one', 'two'], 'three');  // → 'one two three'

// With objects
classes({
  active: true,
  disabled: false
}); // → 'active'

// Mixed usage
classes(
  'base',
  ['one', 'two'],
  { active: true },
  null,
  undefined
); // → 'base one two active'
```

## Helper Functions

### toKebabCase

Converts a string to kebab-case.

```typescript
function toKebabCase(str: string): string;
```

#### Examples

```typescript
toKebabCase('myComponent');  // → 'my-component'
toKebabCase('MyComponent');  // → 'my-component'
toKebabCase('MY_COMPONENT'); // → 'my-component'
```

### classNames

Low-level function for generating class names.

```typescript
function classNames(
  block: string,
  element?: string,
  modifier?: string
): string;
```

#### Examples

```typescript
classNames('block');                    // → 'block'
classNames('block', 'element');         // → 'block__element'
classNames('block', 'element', 'mod');  // → 'block__element--mod'
```

## Type Definitions

### BemmOptions

```typescript
interface BemmOptions {
  /**
   * Convert class names to kebab-case
   * @default true
   */
  toKebabCase?: boolean;

  /**
   * Specify return type format
   * @default 'auto'
   */
  return?: 'auto' | 'string' | 'array';

  /**
   * Include base class when using modifiers
   * @default false
   */
  includeBaseClass?: boolean;
}
```

### BemmObject

```typescript
interface BemmObject {
  /**
   * Element name
   */
  element: string;

  /**
   * Optional modifier
   */
  modifier?: string | string[] | ModifierObject;

  /**
   * Conditionally show the class
   * @default true
   */
  show?: boolean;
}
```

### ModifierObject

```typescript
interface ModifierObject {
  /**
   * Key can be:
   * - Simple string: { active: true }
   * - Pattern: { 'small|medium|large': 1 }
   */
  [key: string]: boolean | number;
}
```

## Constants

### Default Options

```typescript
const DEFAULT_OPTIONS: Required<BemmOptions> = {
  toKebabCase: true,
  return: 'auto',
  includeBaseClass: false
};
```

## Error Types

```typescript
class BemmError extends Error {
  constructor(message: string) {
    super(`[Bemm] ${message}`);
  }
}
```

Common error messages:
- Invalid block name
- Invalid element name
- Invalid modifier
- Invalid pattern format
- Invalid return type

## Next Steps

- See [Examples and Use Cases](/examples)
- Learn about [Performance Optimization](/performance)
- Read the [Contributing Guide](/contributing)
