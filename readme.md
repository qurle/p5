# p5 playground

Monorepo for my p5 tryings. Very cool book called [Nature of Code](natureofcode.com) made me do this. 

Requires [Live p5 extension](https://marketplace.visualstudio.com/items?itemName=filipesabella.live-p5) to render canvas right in VS Code.

Don't forget to 
```
npm i
```

## Project structure

Structure of this project differs from classical p5.js projects. 

### What's special

1. It's monorepo, so all the sketches co-live in one project.
2. There are no HTML and CSS files which are usually the same and boilerplaited. All the rendering goes on [Live p5 extension](https://marketplace.visualstudio.com/items?itemName=filipesabella.live-p5).
3. There are no `sketch.js` files. Every projects lives in the separate typescript file with custom name. That helps to differentiate the sketches with a a glance.

### Transforming to standard structure

If you want a standard project structure, you need this:

1. Create `index.html`, `style.css` and `sketch.js` files.
2. Copy code from required `<filename>.ts` to `sketch.js`.
3. Remove module wrapper — `{` on the first line and `}` on the last line.
4. Remove `//@ts-ignore` directives.
5. Remove all type usages, if any.


