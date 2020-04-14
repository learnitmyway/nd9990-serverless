import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import { TodoAccess } from '../dataLayer/todosAccess'
import { getUserId } from '../utils'

const logger = createLogger('updateTodo')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event ', event)
  const todoId = event.pathParameters.todoId
  const parsedBody: UpdateTodoRequest = JSON.parse(event.body)

  const updatedTodo = await new TodoAccess().updateTodo(
    todoId,
    getUserId(event),
    parsedBody.done
  )

  // DONE: Update a TODO item with the provided id using values in the "updatedTodo" object
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      updatedTodo
    })
  }
}
