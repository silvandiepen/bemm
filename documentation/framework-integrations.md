# Framework Integrations

Bemm seamlessly integrates with popular JavaScript frameworks. This guide demonstrates how to use Bemm effectively with different frameworks.

## Vue.js Integration

### Basic Usage with Vue 3 Composition API

```vue
<template>
  <div :class="bemm()">
    <header :class="bemm('header', { sticky: isSticky })">
      <h1 :class="bemm('title')">{{ title }}</h1>
    </header>
    <nav :class="bemm('nav')">
      <ul :class="bemm('menu')">
        <li v-for="item in items"
            :key="item.id"
            :class="bemm('item', { active: item.isActive })">
          {{ item.text }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useBemm } from 'bemm';
import { ref } from 'vue';

const bemm = useBemm('layout');
const isSticky = ref(false);
const title = ref('My App');
const items = ref([
  { id: 1, text: 'Home', isActive: true },
  { id: 2, text: 'About', isActive: false },
  { id: 3, text: 'Contact', isActive: false }
]);
</script>

<style>
.layout { /* ... */ }
.layout__header { /* ... */ }
.layout__header--sticky { /* ... */ }
.layout__title { /* ... */ }
.layout__nav { /* ... */ }
.layout__menu { /* ... */ }
.layout__item { /* ... */ }
.layout__item--active { /* ... */ }
</style>
```

### Vue 2 Options API Example

```vue
<template>
  <div :class="bemm()">
    <button :class="bemm('button', buttonModifiers)">
      {{ text }}
    </button>
  </div>
</template>

<script>
import { useBemm } from 'bemm';

export default {
  name: 'MyComponent',
  data() {
    return {
      text: 'Click me',
      isDisabled: false,
      size: 'medium'
    };
  },
  computed: {
    bemm() {
      return useBemm('my-component');
    },
    buttonModifiers() {
      return {
        disabled: this.isDisabled,
        'small|medium|large': ['small', 'medium', 'large'].indexOf(this.size)
      };
    }
  }
};
</script>
```

## React Integration

### Function Components with Hooks

```tsx
import React, { useState } from 'react';
import { useBemm } from 'bemm';

interface CardProps {
  title: string;
  isExpanded?: boolean;
  theme?: 'light' | 'dark';
}

const Card: React.FC<CardProps> = ({
  title,
  isExpanded = false,
  theme = 'light'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const bemm = useBemm('card');

  return (
    <div
      className={bemm('', {
        expanded: isExpanded,
        hovered: isHovered,
        [`light|dark`]: theme === 'light' ? 0 : 1
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <header className={bemm('header')}>
        <h2 className={bemm('title')}>{title}</h2>
      </header>
      <div className={bemm('content')}>
        {/* Content here */}
      </div>
    </div>
  );
};

export default Card;
```

### Class Components

```tsx
import React, { Component } from 'react';
import { useBemm } from 'bemm';

interface TabsProps {
  items: string[];
  defaultActive?: number;
}

interface TabsState {
  activeIndex: number;
}

class Tabs extends Component<TabsProps, TabsState> {
  private bemm = useBemm('tabs', { return: 'string' });

  state = {
    activeIndex: this.props.defaultActive || 0
  };

  render() {
    const { items } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className={this.bemm()}>
        {items.map((item, index) => (
          <button
            key={index}
            className={this.bemm('tab', { active: index === activeIndex })}
            onClick={() => this.setState({ activeIndex: index })}
          >
            {item}
          </button>
        ))}
      </div>
    );
  }
}

export default Tabs;
```

## Nuxt.js Integration

### Installation

First, install the Nuxt module:

```bash
npm install nuxt-bemm --save-dev
```

### Configuration

Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-bemm'],
  bemm: {
    prefix: 'use',                // Optional: Add prefix to functions
    prefixSkip: ['generateBemms'], // Optional: Skip prefix for specific functions
    exclude: [],                  // Optional: Exclude specific functions
    alias: [                      // Optional: Create aliases
      ['generateBemms', 'createMultipleBemms']
    ],
    upperAfterPrefix: true        // Optional: PascalCase after prefix
  }
});
```

### Usage in Nuxt Components

```vue
<template>
  <div :class="bemm()">
    <header :class="bemm('header')">
      <h1 :class="bemm('title')">{{ title }}</h1>
    </header>
    <main :class="bemm('content', contentModifiers)">
      <slot />
    </main>
  </div>
</template>

<script setup>
const bemm = useBemm('page-layout');
const title = ref('Welcome');
const contentModifiers = computed(() => ({
  'narrow|medium|wide': 1,
  padded: true
}));
</script>
```

## Angular Integration

### Basic Component Example

```typescript
import { Component } from '@angular/core';
import { useBemm } from 'bemm';

@Component({
  selector: 'app-notification',
  template: `
    <div [class]="bemm()">
      <div [class]="bemm('icon', type)">
        <i [class]="getIconClass()"></i>
      </div>
      <div [class]="bemm('content')">
        <h4 [class]="bemm('title')">{{ title }}</h4>
        <p [class]="bemm('message')">{{ message }}</p>
      </div>
      <button
        [class]="bemm('close')"
        (click)="onClose()"
      >
        ×
      </button>
    </div>
  `
})
export class NotificationComponent {
  private bemm = useBemm('notification', { return: 'string' });

  title: string = '';
  message: string = '';
  type: 'success' | 'error' | 'warning' = 'success';

  getIconClass() {
    return {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle'
    }[this.type];
  }

  onClose() {
    // Handle close
  }
}
```

### Service Integration

```typescript
import { Injectable } from '@angular/core';
import { useBemm } from 'bemm';

@Injectable({
  providedIn: 'root'
})
export class BemmService {
  create(block: string, options = {}) {
    return useBemm(block, options);
  }
}

// Usage in component
@Component({
  selector: 'app-example',
  template: `
    <div [class]="classes.block()">
      <header [class]="classes.element('header')">
        <!-- ... -->
      </header>
    </div>
  `
})
export class ExampleComponent {
  classes = this.bemmService.create('example');

  constructor(private bemmService: BemmService) {}
}
```

## Best Practices for Framework Integration

1. **Consistent Initialization**
   ```typescript
   // Create bemm instance at component level
   const bemm = useBemm('component-name');
   ```

2. **Computed Properties for Complex Modifiers**
   ```typescript
   // Vue example
   const modifiers = computed(() => ({
     active: isActive.value,
     disabled: isDisabled.value,
     [`small|medium|large`]: sizeIndex.value
   }));
   ```

3. **Type Safety with TypeScript**
   ```typescript
   // Define allowed modifiers
   type ButtonModifiers = 'primary' | 'secondary' | 'disabled';

   // Use with type checking
   const bemm = useBemm<ButtonModifiers>('button');
   ```

4. **Performance Optimization**
   ```typescript
   // Memoize bemm function for complex components
   const bemm = useMemo(() => useBemm('component'), []);
   ```

## Next Steps

- Explore [Advanced Usage](/advanced-usage)
- Check out [Examples and Use Cases](/examples)
- Learn about [Performance Optimization](/performance)
