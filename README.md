# Serverless TODO

## Auth0 Set up

- callback url `http://localhost:3000/callback`

## Client

- Copy `.env.example` and fill in vars

## Backend

- `AUTH0_TENANT=${} serverless [command] --verbose --aws-profile serverless`

Where `command` could be `deploy`, `offline` or `remove`
and env vars look something like:

- `AUTH0_TENANT=dsalfkj12.eu`
