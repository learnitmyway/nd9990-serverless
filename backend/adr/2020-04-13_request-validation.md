# Request validation

Requests can be validated either at the API Gateway or in the Lambda functions themselves.

Validating requests in a Lambda function seems to offer a more detailed error messages. This can also be simplified with middleware.

API Gateway prevents the lambda functions from being executed if there is a bad response. This saves 💰.

## Decision

Use both for learning purposes :)
