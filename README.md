# Etch-A-Sketch(ish) with Lit Components

This was largely an attempt at getting my feet wet with separating components and isolating logic with Lit. The project is built with Vite, Lit and Typescript.

The parts built with Lit are the `<etch-grid>` component, the`<actions-panel>` component, and the `<drawing-mode>` component.

Each `<drawing-mode>` wraps a button whose label is the mode's title, and when clicked, they return a custom event indicating the title and handler function. The attributes for it are `title` (a string) and `handler` (a function).

The `<action-panel>` takes a `handlers`, an array of `{title, handler}` objects, and constructs that many `<drawing-mode>` buttons.

The `<etch-grid>` takes a `size` and `onMouseover`. It will generate a collection of `size*size` elements, and when those elements are moused over, will call the `onMouseover` with the `event.target`.

So the handler functions we pass in will take a `cell`, and will somehow transform that one cell. Example handlers:

```js
{ title: 'Black', handler: (cell)=>cell.style.backgroundColor='black'},
{ title: 'Random Symbol!', handler: (cell)=>cell.textContent = `!@#$%^&*()`.charAt(Math.floor(Math.random()*10))}
```
The handler doesn't have access to the context in which the `cell` lives - only to the `cell` itself.

See the demo here: https://etchasketch-with-lit.netlify.app/