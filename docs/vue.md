### Nuxt 3 Directive

```js
import { createBemm } from "bemm";

let bemm = createBemm("");

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("bemm-block", {
    created(el, binding) {
      bemm = createBemm(binding.value);
      el.classList = bemm();
    },
  });
  nuxtApp.vueApp.directive("bemm", {
    created(el, binding) {
      const values = binding.value.split(",").map((v: string) => v.trim());
      el.classList = bemm({
        element: values[0],
        modifier: values[1] || "",
      });
    },
  });
});
```

Usage:

```html
<template>
  <div v-bemm-block="'block'">
    <div v-bemm="'element'">Some element</div>
    <div v-bemm="'element,modifier'">Some element with a modifier</div>
  </div>
</template>
```

### In a Vue component

```html
<template>
  <button :class="[bemm(),bemm('',modifiers)]">
    <span :class="bemm('text')"></span>
  </button>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { createBemm } from "bemm";

  enum ButtonSize {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large
  }

  enum ButtonColor {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary
  }

  export default defineComponent({
    props: {
      size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.MEDIUM
      }, color: {
        type: String as PropType<ButtonColor>,
        default: ButtonColor.PRIMARY
      }
    },
    setup(props){
      const bemm = createBemm('my-button');

      return {
        bemm,
        modifiers: [props.size, props.color]
      }
    }

  })
</script>
<style lang="scss">
  .my-button {
    font-size: 1em;
    padding: 1em;

    /* Sizes */
    &--small {
      font-size: 0.8em;
    }
    &--medium {
      font-size: 1em;
    }
    &--large {
      font-size: 1.2em;
    }

    /* Colors */
    &--primary {
      background-color: var(--primary);
    }
    &--secondary {
      background-color: var(--secondary);
    }
    &--tertiary {
      background-color: var(--tertiary);
    }
  }
</style>
```
