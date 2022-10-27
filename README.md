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
import { createBemm } from "bemm";

const bemm = createBemm("block");

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
const bemm = createBemm("my-block-class");
```

Then you will be able to use the `bemm` function throughout your html to create the desired classes.

### Arguments

On the initial `createBemm` function, there is only one argument, which is the
string for the block.

The create bemm function, or whatever you want to call it, has two arguments:

| Argument   | Default | Type                   |
| ---------- | ------- | ---------------------- |
| `element`  | `""`    | `string \| bemmObject` |
| `modifier` | `""`    | `string \| string[]`   |

```js
interface bemmObject {
  element: string;
  modifier: string | string[];
}
```


[gist=2d9aff65094156a9f52f67594e8000d0]
