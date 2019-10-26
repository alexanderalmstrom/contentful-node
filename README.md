# Contentful Node

Add Contentful space id, access token and home id to `.env`. See example variables in `.env.example`

Requirements:

- Redis (installed locally or on a remote server)
- Node

Install dependencies

```bash
yarn install
```

Configure Redis

Add your REDIS_URL to .env

You can also run Redis locally in a separate terminal window. Install redis with `brew install redis`. Then start with `redis-server`.

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
