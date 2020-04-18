import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getUserId } from '../utils'
import { updateUrl, getTodo } from '../businessLogic/todoService'
import { createLogger } from '../../utils/logger'

const logger = createLogger('generateUploadUrl')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('event', event)

  const body = JSON.parse(event.body)
  if (body !== null) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
      },
      body: 'body should be empty'
    }
  }

  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  const { dueDate } = await getTodo({ todoId, userId })

  const uploadUrl = await updateUrl({ todoId, userId, dueDate })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ uploadUrl })
  }
}
