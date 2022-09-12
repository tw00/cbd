# Experimental implementation CBD

This is an experimanl implementation of component based deployments,
see this [blog post](https://tw00.dev/post/component-based-deployment/).

Live demo: https://pi.tw00.dev/

## Publish component

1. Make change to `pipeline/components/text.jsx`
2. Run `(cd pipeline && ./bin/publish.js components/text.jsx)`
3. Check updated page: https://pi.tw00.dev/

## How it works

The publish script in `pipeline/bin` compiles a jsx component using [esbuild](https://esbuild.github.io/) and then sends it to a backend endpoint via:

```bash
curl -i \
  --method POST \
  --header 'Content-Type: text/javascript' \
  --data 'export default function() {}' \
  'http://localhost:9300/?id=image'
```

The backend uses a persistent key-value store ([levelDB](https://github.com/Level/leveldown)) to store the component. A component can then be retrieved via:

```bash
curl -i 'http://localhost:9300/?id=image'
```

which returns `Content-Type: application/javascript; charset=utf-8` so it can be used with a `<script>` tag.

The frontend uses [native ES modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) to import modules in the browser directly from a URL.
The page is driven by the page data defined in `frontend/static/data/page.js`. A minimal `packageSelector` in `frontend/static/js/main.js` then iterates over the page data, checks which modules are needed, loads them via dynamic browser-side import `` await import(`http://localhost:9300/?id=${type}`) ``, and finally renders them via `React.createElement`.

## How to get started locally

1. Start backend

```bash
(cd backend && npm run dev)
```

2. Create and seed level DB

```bash
(cd backend && npm run seed)
```

3. Start frontend

```bash
(cd frontend && ./server.sh)
open backend/server.crt # add certificate to keychain
open https://localhost:9000/
```

4. Publish components

```bash
(cd pipeline && npm run publish component/image.jsx)
```
