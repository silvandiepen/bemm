# Nuxt Module

Bemm also has a Nuxt module for Nuxt 3.

## Installation

```bash
npm i nuxt-bemm --save-dev
```

`nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    "nuxt-bemm",
  ],
}
```

Usage in any component;

```html
<template>
  <div :class="bemm()">
    <!-- <div class="my-block"> -->
    <div :class="bemm('child')">
      <!-- <div class="my-block__child"> -->
    </div>
  </div>
</template>

<script setup>
  const bemm = createBemm("my-block");
</script>
```

## Settings

| setting          | default | description                                                                                   |
| ---------------- | ------- | --------------------------------------------------------------------------------------------- |
| prefix           | `false` | Add a prefix to the functions                                                                 |
| prefixSkip       | `[]`    | Skips a function for adding the prefix                                                        |
| exclude          | `[]`    | Skips a function from being added                                                             |
| alias            | `[]`    | Creates an alias for a bemm function                                                          |
| upperAfterPrefix | `true`  | makes the function PascalCase and makes the initial function with prefix start with a capital |

### Usage

```js
export default defineNuxtConfig({
  modules: ["nuxt-bemm"],
  bemm: {
    prefix: "use",
    prefixSkip: ["createBemms"],
    exclude: [],
    alias: [["createBemms", "createMultipleBemms"]],
    upperAfterPrefix: true,
  },
});
```
