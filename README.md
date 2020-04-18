# Serverless TODO

[Starter code](https://github.com/udacity/cloud-developer/tree/master/course-04/project/c4-final-project-starter-code)

## Auth0 Set up

- callback url `http://localhost:3000/callback`

## Client

- Copy `.env.example` and fill in vars

## Backend

### Set env vars

- `export AUTH0_TENANT=${}`
- `export CLIENT_ID=${}`

Examples:

- `AUTH0_TENANT=dsalfkj12.eu`
- `CLIENT_ID=ASDJALDSFJ234JADFS`

### Useful commands

- `serverless [deploy|offline|remove] --verbose --aws-profile serverless`

### Tests

`npx jest --watch`
