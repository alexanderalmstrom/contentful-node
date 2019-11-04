# Contentful Node

Requirements:

- Node and Yarn installed.
- Contentful CLI installed globally (for importing Content model).
- A Contentful space.
- Redis (installed locally or on a remote server).

1. Add Contentful space id, access token and home id to `.env`. See example variables in `.env.example`

2. Import `contentful-export.json` with Contentful CLI. See Contentful docs for instructions.

Install dependencies

```bash
yarn install
```

Configure Redis

Add your local or remote `REDIS_URL` to `.env`

You can run Redis locally in a separate terminal window. Install redis with `brew install redis` and start server with `redis-server`. The url will be `//localhost:6379`

Run developemnt server

```bash
yarn run start
```

Build for production

```bash
yarn run build
```

Deploy to Heroku (Go to Heroku docs for more info how to setup a application)

```bash
yarn run deploy
```
