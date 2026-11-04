# Small Web

A small web of pages stored in MongoDB, and a browser to read it in.

- `apps/web` — Next.js, React, TypeScript
- `apps/api` — NestJS, Mongoose, TypeScript

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- MongoDB, either local or a free MongoDB Atlas cluster

## Setup

```bash
npm install
cp apps/api/.env.example apps/api/.env
# edit apps/api/.env and set MONGODB_URI
npm run seed
```

For Atlas: create an M0 free cluster, add a database user, allow your current IP, then copy the Node.js connection string into `MONGODB_URI`.

## Run

```bash
npm run dev:api
```

```bash
npm run dev:web
```

Open http://localhost:3000. The API listens on http://localhost:3001.

If the API is not on `http://localhost:3001`, copy `apps/web/.env.example` to `apps/web/.env.local` and change `NEXT_PUBLIC_API_URL`.

For a production build:

```bash
npm run build
npm run start -w apps/api
npm run start -w apps/web
```

## Seed

```bash
npm run seed
```

The seed creates 10 sites, 5 people, and 30 visits. It is safe to run twice: sites are upserted by address, people by name, and visits by the fixed user/address/time tuple.

Addresses:

`tidepool.zz`, `fieldnotes.zz`, `night-market.zz`, `coffeehouse.zz`, `radio-static.zz`, `football.zz`, `technology.zz`, `harbor.zz`, `repair-manual.zz`, `kitchen.zz`

People:

`Ayesha Khan`, `Mina Farooq`, `Owen Blake`, `Priya Nair`, `Tomas Reed`

## Tests

```bash
npm test
```
