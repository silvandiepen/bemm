---
projectLogo: assets/icon.svg
projectTitle: BEMM
projectDescription: Create BEMM classes
---

# Settings

### Available Settings

Available settings:

| setting       | default | description                                                                                                                                                                              |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `toKebabCase` | `true`  | Converts all elements to `kebab-case`                                                                                                                                                    |
| `return`      | `auto`  | By default the output will be determinded by the amount of classes, 1 class will be a string and multiple an array. You can fix this by defining `string` or `array` as the return value |
| `includeBaseClass` | `false` | By default when creating a bemm class with modifiers, the base element class is not being returned, this can be overruled by setting includeBaseClass, which will make sure the base Element class will always be returned |

Usage of settings:

```js
const bemm = generateBemm("my-button", { toKebabCase: true });
```

#### KebabCase

By default all elements of the class will be converted automatically to `kebab-case`, this means you can use spaces or Caps in your strings, but they will automatically be converted.

You can change this by fixing the settings at initialisation.

```js
const bemm1 = generateBemm("myButton");

bemm1("Container"); // `.my-button__container`

const bemm2 = generateBemm("myButton", {
  toKebabCase: false,
});

bemm2("Container"); // `.myButton__Container`
```
