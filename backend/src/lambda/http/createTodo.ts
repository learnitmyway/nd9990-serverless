import 'source-map-support/register'

import * as uuid from 'uuid'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import * as AWS from 'aws-sdk'

import { createLogger } from '../../utils/logger'
const logger = createLogger('createTodo')

const docClient = new AWS.DynamoDB.DocumentClient()

const todosTable = process.env.TODOS_TABLE

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const createdAt = new Date().toISOString()
  const todoId = uuid.v4()
  const parsedBody = JSON.parse(event.body)
  const newTodo: CreateTodoRequest = {
    ...parsedBody,
    createdAt,
    todoId,
    done: false
  }

  await docClient
    .put({
      TableName: todosTable,
      Item: newTodo
    })
    .promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newTodo
    })
  }
}
