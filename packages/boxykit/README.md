# boxykit

A small, flat UI kit. The CSS is the kit; the React components only write the same classes. Use either.

- Docs, with every component in React and in plain HTML: [boxykit.temka.fi](https://boxykit.temka.fi)
- Source and issues: [github.com/Xamber/boxykit](https://github.com/Xamber/boxykit)

```sh
npm install boxykit
```

## CSS only

```js
import "boxykit/css"; // tokens + reset + every component
```

```html
<button class="boxy-button boxy-button-accent">Save</button>
<input class="boxy-input boxy-input-muted" placeholder="Search">
```

Or only what you use: `boxykit/css/tokens`, then `boxykit/css/button`, `boxykit/css/input`, …

## React

```tsx
import "boxykit/css";
import { Button, buttonClass } from "boxykit/react";

<Button look="accent">Save</Button>
<Link className={buttonClass({ look: "dark" })} href="/play">Play</Link>
```

## Theming

Every value is a `--boxy-*` custom property; override it on `:root` or any element. Dark mode follows the system;
force one with `data-boxy-theme="light"` or `"dark"`. The kit lives in `@layer boxy.*`, so your own styles win
without `!important`.

MIT
