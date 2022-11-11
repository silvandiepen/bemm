# Advanced Usage


### Multiple modifiers

The modifier argument accepts a string or an array of strings, in this way you can create multiple modifiers with the same block\_\_element in one function.

```js
const bemm = generateBemm("my-button");

render`<div class="${bem("background", ["primary", "ghost"])}"></div>`;
```

```html
<div class="my-button__background--primary my-button__background--ghost"></div>
```


### Multiple blocks

When you have multiple blocks in one component and you want to define multiple Bemm functions. You can do this using the `generateBemms` function.

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

There are cases you might want to define multiple blocks. An example of this would be form components, where you wnt to have indivudual classes for the componentn, but perhabs a shared class like "input-field" for all types of input fields. In that case you can define multiple blocks on initialization, this will create a class for each block on every element.

```js
const bemm = generateBemm(["input-text", "input-field"]);

bemm(); // --> `['.input-text','input-field']
```

