import 'source-map-support/register'

import { v4 } from 'uuid'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { createLogger } from '../../utils/logger'
const logger = createLogger('createTodo')

import { TodoAccess } from '../dataLayer/todosAccess'
import { getUserId } from '../utils'
import { TodoItem } from '../../models/TodoItem'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const createdAt = new Date().toISOString()
  const todoId = v4()
  const parsedBody = JSON.parse(event.body)
  const newTodo: TodoItem = {
    ...parsedBody,
    userId: getUserId(event),
    createdAt,
    todoId,
    done: false
  }

  await new TodoAccess().createTodo(newTodo)

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
