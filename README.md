# Small Web

A small web of pages stored in MongoDB, and a browser to read it in.

The browser has an address bar, links, back and forward, per-person history, full-text search, and a publishing form. The API is NestJS; the client is Next.js.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- A MongoDB connection string (MongoDB Atlas or a local MongoDB)

## Setup

```bash
npm install
cp apps/api/.env.example apps/api/.env
# put your MongoDB URI in apps/api/.env

npm run seed
```

Run the two sides in separate terminals:

```bash
npm run dev:api
npm run dev:web
```

Open http://localhost:3000.

The API listens on http://localhost:3001.

## Seeded addresses

`tidepool.zz`, `fieldnotes.zz`, `night-market.zz`, `coffeehouse.zz`, `radio-static.zz`, `football.zz`, `technology.zz`, `harbor.zz`, `repair-manual.zz`, `kitchen.zz`

Some seeded links deliberately point at addresses that do not exist, so the dead-link state can be tried without publishing anything first.

## Tests

```bash
npm test
```

The tests cover the navigation stack (including the forward history being discarded after a new visit) and the HTML sanitizer.
