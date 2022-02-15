# Bemm

## Block__Element--Modifier Maker

Create BEM names from within your component.

### Installation

```bash
npm install bemm
// or yarn
yarn add bemm
```

### Setup

```js
import { createBemm } from "bemm";

const bemm = createBem("block");

render`
    <div class="${bemm()}">
        <div class="${bemm("inner")}></div>
    </div>
`;
```

```html
<div class="block">
  <div class="block__inner"></div>
</div>
```

You can do the same as a Class, if you really want to.

```js
import { Bemm } from "bemm";

const bem = new Bemm("block");

render`
    <div class="${bem.m()}">
        <div class="${bem.m("inner")}></div>
    </div>
`;
```

```html
<div class="block">
  <div class="block__inner"></div>
</div>
```

### How

In order to use the function, you have to initiate the function with it's block class.

Create the function an set the the block

```js
const bemm = createBemm('my-block-class');
```

Then you will be able to use the `bemm` function throughout your html to create the desired classes.

### Arguments

On the initial `createBemm` function, there is only one argument, which is the
string for the block.

The create bemm function, or whatever you want to call it, has two arguments:

| Argument   | Default | Type                  |
| ---------- | ------- | --------------------- |
| `element`  | `""`    | `string | bemmObject` |
| `modifier` | `""`    | `string | string[]`   |


```js
interface bemmObject {
  element: string;
  modifier: string | string[];
}
```


### Multiple modifiers

The modifier argument accepts a string or an array of strings, in this way you can create multiple modifiers with the same block__element in one function. 

```js

const bemm = createBemm('my-button');

render `<div class="${bem('background',['primary','ghost'])}"></div>`

```

```html
<div class="my-button__background--primary my-button__background--ghost"></div>
```


### Settings

Available settings:

| setting       | default | description                           |
| ------------- | ------- | ------------------------------------- |
| `toKebabCase` | `true`  | Converts all elements to `kebab-case` |

Usage of settings:

```js
const bemm = createBemm('my-button', { toKebabCase: true });
```

#### KebabCase

By default all elements of the class will be converted automatically to `kebab-case`, this means you can use spaces or Caps in your strings, but they will automatically be converted. 

You can change this by fixing the settings at initialisation.

```js
const bemm1 = createBemm('myButton');

bemm1('Container'); // `.my-button__container`

const bemm2 = createBemm('myButton',{
  toKebabCase: false
})

bemm2('Container'); // `.myButton__Container`
```

### In a Vue component


```html
<template>
  <button :class="[bemm(),bem('',modifiers)]">
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
 .my-button{
   font-size: 1em;
   padding: 1em;

    /* Sizes */
    &--small{
     font-size: 0.8em;
    }
    &--medium{
     font-size: 1em;
    }
    &--large{
     font-size: 1.2em;
    }

    /* Colors */
    &--primary{
      background-color: var(--primary);
    }
    &--secondary{
      background-color: var(--secondary);
    }
    &--tertiary{
      background-color: var(--tertiary);
    }
  }
</style>
```