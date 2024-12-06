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

### Form Input Component

```typescript
// Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  touched,
  ...props
}) => {
  const bemm = useBemm('input');

  return (
    <div className={bemm('wrapper')}>
      {label && (
        <label className={bemm('label')}>
          {label}
        </label>
      )}
      <input
        className={bemm('field', {
          error: touched && error,
          success: touched && !error,
          touched
        })}
        {...props}
      />
      {touched && error && (
        <span className={bemm('error')}>
          {error}
        </span>
      )}
    </div>
  );
};
```

## Layout Components

### Navigation Bar

```typescript
// Navbar.vue
<template>
  <nav :class="bemm()">
    <div :class="bemm('brand')">
      <slot name="brand" />
    </div>

    <button
      :class="bemm('toggle')"
      @click="isOpen = !isOpen"
    >
      <span :class="bemm('toggle-icon', { open: isOpen })" />
    </button>

    <div :class="bemm('menu', { open: isOpen })">
      <slot />
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useBemm } from 'bemm';

const isOpen = ref(false);
const bemm = useBemm('navbar');
</script>

<style>
.navbar {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.navbar__brand {
  margin-right: auto;
}

.navbar__toggle {
  display: none;
}

.navbar__menu {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .navbar__toggle {
    display: block;
  }

  .navbar__menu {
    display: none;
  }

  .navbar__menu--open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
  }
}
</style>
```

### Grid System

```typescript
// Grid.tsx
interface GridProps {
  columns?: number;
  gap?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({
  columns = 12,
  gap = 'medium',
  children
}) => {
  const bemm = useBemm('grid');
  const gapIndex = ['small', 'medium', 'large'].indexOf(gap);

  return (
    <div
      className={bemm('', {
        [`cols-${columns}`]: true,
        'small|medium|large': gapIndex
      })}
    >
      {children}
    </div>
  );
};

interface GridItemProps {
  span?: number;
  offset?: number;
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({
  span = 1,
  offset = 0,
  children
}) => {
  const bemm = useBemm('grid');

  return (
    <div
      className={bemm('item', {
        [`span-${span}`]: true,
        [`offset-${offset}`]: offset > 0
      })}
    >
      {children}
    </div>
  );
};
```

## Complex Components

### Tabs Component

```typescript
// Tabs.tsx
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveId?: string;
  orientation?: 'horizontal' | 'vertical';
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveId = tabs[0]?.id,
  orientation = 'horizontal'
}) => {
  const [activeId, setActiveId] = useState(defaultActiveId);
  const bemm = useBemm('tabs');

  return (
    <div className={bemm('', { vertical: orientation === 'vertical' })}>
      <div className={bemm('nav')}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={bemm('tab', { active: tab.id === activeId })}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={bemm('content')}>
        {tabs.find(tab => tab.id === activeId)?.content}
      </div>
    </div>
  );
};
```

### Modal Dialog

```typescript
// Modal.vue
<template>
  <Transition name="modal">
    <div
      v-if="modelValue"
      :class="bemm()"
    >
      <div
        :class="bemm('overlay')"
        @click="$emit('update:modelValue', false)"
      />

      <div :class="bemm('container', size)">
        <header :class="bemm('header')">
          <h3 :class="bemm('title')">
            <slot name="title" />
          </h3>
          <button
            :class="bemm('close')"
            @click="$emit('update:modelValue', false)"
          >
            ×
          </button>
        </header>

        <div :class="bemm('content')">
          <slot />
        </div>

        <footer :class="bemm('footer')">
          <slot name="footer">
            <button
              :class="bemm('button', 'secondary')"
              @click="$emit('update:modelValue', false)"
            >
              Cancel
            </button>
            <button
              :class="bemm('button', 'primary')"
              @click="$emit('confirm')"
            >
              Confirm
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';

const props = defineProps<{
  modelValue: boolean;
  size?: 'small' | 'medium' | 'large';
}>();

const bemm = useBemm('modal');
</script>
```

### Data Table

```typescript
// DataTable.tsx
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  selectable?: boolean;
}

function DataTable<T>({
  data,
  columns,
  sortable = false,
  selectable = false
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const bemm = useBemm('data-table');

  return (
    <div className={bemm()}>
      <table className={bemm('table')}>
        <thead className={bemm('header')}>
          <tr>
            {selectable && (
              <th className={bemm('cell', 'select')}>
                <input
                  type="checkbox"
                  checked={selected.size === data.length}
                  onChange={e => {
                    setSelected(new Set(
                      e.target.checked ? data.map((_, i) => i) : []
                    ));
                  }}
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={String(column.key)}
                className={bemm('cell', {
                  sortable: column.sortable,
                  sorted: sortKey === column.key
                })}
                onClick={() => {
                  if (column.sortable) {
                    if (sortKey === column.key) {
                      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortKey(column.key);
                      setSortDir('asc');
                    }
                  }
                }}
              >
                {column.label}
                {sortKey === column.key && (
                  <span className={bemm('sort-icon', sortDir)} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={bemm('row', {
                selected: selected.has(index)
              })}
            >
              {selectable && (
                <td className={bemm('cell', 'select')}>
                  <input
                    type="checkbox"
                    checked={selected.has(index)}
                    onChange={e => {
                      const newSelected = new Set(selected);
                      if (e.target.checked) {
                        newSelected.add(index);
                      } else {
                        newSelected.delete(index);
                      }
                      setSelected(newSelected);
                    }}
                  />
                </td>
              )}
              {columns.map(column => (
                <td
                  key={String(column.key)}
                  className={bemm('cell')}
                >
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Next Steps

- Learn about [Performance Optimization](/performance)
- Read the [Contributing Guide](/contributing)
- Check out [API Reference](/api-reference)
