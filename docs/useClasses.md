# useClasses

In order to create a multitude of classes using one function. You can use the useClasses composable.

```js
const bemmClasses = useClasses("block");

const classes = bemmClasses(
  ["element"],
  ["element", "modifier"],
  ["something", ["", "else"]]
);

// -> 'block__element block__element--modifier block__something block__something--else'
```

## Input Options

**Strings**
Strings are the most simple way of adding classes which will be "bemmified".

```js
const bemmClasses = useClasses("block");

bemClasses("lorem", "ipsum", "dolor");
//  block__lorem block__ipsum block__dolor
```

With modifier:

```js
bemClasses("lorem", "lorem:ipsum");
// block__lorem block__lorem--ipsum
```

**Array(s)**

```js
const bemmClasses = useClasses("block");

bemClasses(["lorem"], ["ipsum"], ["dolor"]);
//  block__lorem block__ipsum block__dolor
```

With modifier:

```js
bemClasses(["lorem"], ["lorem", "ipsum"]);
//  block__lorem block__lorem--ipsum
```

Conditional:

```js
bemClasses(["lorem"], ["lorem", "ipsum", false], ["lorem", "dolor", true]);
//  block__lorem block__lorem--dolor
```

**Object(s)**

```js
const bemmClasses = useClasses("block");

bemClasses(
    { element: "lorem" }, 
    { element: "ipsum" }, 
    { element: "dolor" }
);
//  block__lorem block__ipsum block__dolor
```

With modifier:

```js
bemClasses(
    { element: "lorem" }, 
    { element: "lorem", modifier: "ipsum" }
);
//  block__lorem block__lorem--ipsum
```

Conditional

```js
bemClasses(
    { element: "lorem"}, 
    { element: "lorem", modifier: "ipsum", show;false}, 
    { element: "lorem", modifier: "dolor", show: true}
);
//  block__lorem block__lorem--dolor
```

**Mixed**

```js
const bemmClasses = useClasses("block");

bemClasses(
    "lorem", 
    ["ipsum"], 
    { element: "dolor" }
);
//  block__lorem block__ipsum block__dolor
```



**Inline Conditional**


```js
const bemmClasses = useClasses("block");

bemClasses(
    "lorem", 
    false ? ["ipsum"] : "", 
    1 == 1 ? { element: "dolor" } : null
);
//  block__lorem
```
