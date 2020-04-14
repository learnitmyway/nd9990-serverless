import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { updateTodo } from '../businessLogic/todoService'

const logger = createLogger('updateTodo')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event ', event)
  const todoId = event.pathParameters.todoId
  const { done, dueDate }: UpdateTodoRequest = JSON.parse(event.body)

  if (!done || !dueDate) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Missing required fields (done, dueDate)'
    }
  }

  const updatedTodo = updateTodo({
    todoId,
    userId: getUserId(event),
    done,
    dueDate
  })

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
