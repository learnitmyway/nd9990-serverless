import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { createLogger } from '../../utils/logger'
const logger = createLogger('createTodo')

import { createTodo } from '../businessLogic/todoService'
import { getUserId } from '../utils'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const body: CreateTodoRequest = JSON.parse(event.body)

  const newTodo = await createTodo({ body, userId: getUserId(event) })

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newTodo
    })
  }
}
