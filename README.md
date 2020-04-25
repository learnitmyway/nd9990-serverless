# Serverless Todo

A todo app that uses [Serverless](https://serverless.com/) and is part of the [Udacity Cloud Developer Nanodegree](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990)

## Project instructions

[Link to starter code](https://github.com/udacity/cloud-developer/tree/master/course-04/project/c4-final-project-starter-code)

All `TODO:`s have been replaced with `DONE:`s

## Serverless Setup

`sls config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY --profile serverless`

## Auth0 Setup

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
