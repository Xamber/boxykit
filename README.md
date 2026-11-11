# boxykit

**Docs and every component:** [boxykit.temka.fi](https://boxykit.temka.fi) · **Repo:** [github.com/Xamber/boxykit](https://github.com/Xamber/boxykit) · **npm:** [boxykit](https://www.npmjs.com/package/boxykit)

The boxykit UI kit (`packages/boxykit`) and its docs site (`apps/docs`). See the package [README](packages/boxykit/README.md) for usage,
[docs/publishing.md](docs/publishing.md) for releasing to npm and [docs/deployments.md](docs/deployments.md) for the docs site.

```sh
npm install
npm run dev        # builds the package, starts the docs at localhost:3000
npm run build      # package, then docs (static export to apps/docs/out)
npm run lint       # ESLint + Stylelint (after a build: the docs read generated files)
npm run typecheck
npm test           # Vitest: components, CSS/React parity, axe on every example
```
