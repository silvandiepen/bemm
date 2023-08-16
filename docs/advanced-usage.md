# Advanced Usage

## Multiple Modifiers

The `modifier` argument of `bem` accepts a string or an array of strings, allowing you to create multiple modifiers with the same block\_\_element in one function. For example:

```js
const bem = generateBemm("my-button");

render`<div class="${bem("background", ["primary", "ghost"])}"></div>`;
```

This will generate the following HTML:


```html
<div class="my-button__background--primary my-button__background--ghost"></div>
```


### Multiple Blocks

When you have multiple blocks in one component and you want to define multiple BEM functions, you can use the `generateBemms` function. This function takes an object with block names as keys and returns an object with BEM functions as values. For example:

```js
const bemm = generateBemms({
  block: 'block-element',
  template: 'templates',
  article: 'articles'
})

bemm.block() // --> 'block'

bemm.template('view') // --> 'templates__view'

bemm.article('list','active') // --> 'article__list--active'

```

### Multiple blocks at once

There are cases where you might want to define multiple blocks. An example of this would be form components, where you want to have individual classes for each component, but a shared class like "input-field" for all types of input fields. In that case, you can define multiple blocks on initialization, which will create a class for each block on every element. For example:

```js
const bemm = generateBemm(["input-text", "input-field"]);

bemm(); // --> `['.input-text','input-field']
```

