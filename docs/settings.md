# Settings


### Available Settings

Available settings:

| setting        | default | description                           |
| -------------- | ------- | ------------------------------------- |
| `toKebabCase`  | `true`  | Converts all elements to `kebab-case` |
| `returnArray`  | `false` | Always returns an array               |
| `returnString` | `false` | Always returns a string               |

Usage of settings:

```js
const bemm = createBemm("my-button", { toKebabCase: true });
```



#### KebabCase

By default all elements of the class will be converted automatically to `kebab-case`, this means you can use spaces or Caps in your strings, but they will automatically be converted.

You can change this by fixing the settings at initialisation.

```js
const bemm1 = createBemm("myButton");

bemm1("Container"); // `.my-button__container`

const bemm2 = createBemm("myButton", {
  toKebabCase: false,
});

bemm2("Container"); // `.myButton__Container`
```
