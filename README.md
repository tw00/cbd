# Experimental implementation CBD

This is an experimanl implementation of component based deployments,
see this [blog post](https://tw00.dev/post/component-based-deployment/).

Live demo: https://pi.tw00.dev/

## How to get started

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
