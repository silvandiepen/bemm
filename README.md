# Bemm

## Block\_\_Element--Modifier Maker

Create BEM names from within your component.

### Installation

```bash
npm install bemm

# or yarn
yarn add bemm
```

### Setup

```js
import { useBemm } from "bemm";

const bemm = useBemm("block");

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

**Vue example**

```vue
<template>
  <div :class="bemm()">
    <div :class="bemm('child')"></div>
  </div>
</template>

<script setup>
const bemm = useBemm("block");
</script>
```

**React example**

```js
class Example extends React.Component {

  const bemm = useBemm('block', {
    return: 'string'
  });

  render() {
    return (
      <div className={bemm()}>
        <div className={bemm("child")}></div>
      </div>
    );
  }
}
```

**Multiple functions in once**

You can also use the spread method to get the bemm and [/docs/useClasses](classes) functions in one declration from useBemm, in this way you can use both, with the same block.

```js
import { useBemm } from "bemm";

const { bemm, classes } = useBemm("block");

const mainClasses = classes("", ["something"], "to", { m: "add" });

render`
    <div class="${mainClasses}">
        <div class="${bemm("inner")}></div>
    </div>
`;
```

```html
<div class="block block__something block__to block--add">
  <div class="block__inner"></div>
</div>
```

### How

In order to use the function, you have to initiate the function with it's block class.

Create the function an set the the block

```js
const bemm = useBemm("my-block-class");

bemm();
// my-block-class

bemm("lorem");
// my-block-class__lorem

bemm("lorem", "ipsum");
// my-block-class__lorem--ipsum
```

Then you will be able to use the `bemm` function throughout your html to create the desired classes.

### Arguments

On the initial `generateBemm` function, there is only one argument, which is the
string for the block.

The create bemm function, or whatever you want to call it, has two arguments:

| Argument   | Default | Type                   |
| ---------- | ------- | ---------------------- |
| `element`  | `""`    | `string \| bemmObject` |
| `modifier` | `""`    | `string \| string[]`   |
| `show`     | true    | `boolean`              |

```js
interface bemmObject {
  element: string;
  modifier: string | string[];
  show?: boolean;
}
```

[gist=2d9aff65094156a9f52f67594e8000d0]
