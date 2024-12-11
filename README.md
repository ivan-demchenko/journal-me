# journal-me

To install dependencies:

```bash
bun install
```

To run:

```bash
bun --filter=@jm/db run migration:run
bun --filter=@jm/server run dev
bun --filter=@jm/web run dev
```

Deploy to Fly.io
Use Kinde for auth
https://console.neon.tech/ - DB
