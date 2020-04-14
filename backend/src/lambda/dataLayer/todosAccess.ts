import { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../../models/TodoItem'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'

const logger = createLogger('todosAccess')

export class TodoAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX
  ) {}

  async getAllTodos(userId: string): Promise<TodoItem[]> {
    logger.info('Getting all todos for userId: ' + userId)

    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    return result.Items as TodoItem[]
  }

  async createTodo(newTodo: CreateTodoRequest): Promise<void> {
    logger.info('Creating new todo', newTodo)
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: newTodo
      })
      .promise()
  }

  async updateTodo(todoId: string, userId: string, done: boolean) {
    logger.info('Updating todo')
    logger.info('todoId', todoId)
    logger.info('userId', userId)
    logger.info('done', done)

    return await this.docClient
      .update({
        TableName: this.todosTable,
        Key: { todoId },
        UpdateExpression: 'set done = :done',
        ConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':done': done, ':userId': userId }
      })
      .promise()
  }
}

function createDynamoDBClient() {
  return new DynamoDB.DocumentClient()
}
