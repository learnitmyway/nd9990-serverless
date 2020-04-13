# Serverless TODO

## Auth0 Set up

- callback url `http://localhost:3000/callback`

## Client

- Copy `.env.example` and fill in vars

## Backend

- `AUTH0_TENANT=${} CLIENT_ID=${} serverless [deploy|remove] --verbose --aws-profile serverless`
- `OFFLINE=${} AUTH0_TENANT=${} CLIENT_ID=${} serverless offline start --verbose --aws-profile serverless`

Where env vars look something like:

- `OFFLINE=false`
- `AUTH0_TENANT=dsalfkj12.eu`
- `CLIENT_ID=ASDJALDSFJ234JADFS`
