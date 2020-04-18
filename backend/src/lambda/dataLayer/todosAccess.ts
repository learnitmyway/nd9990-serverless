import { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../../models/TodoItem'
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

  async getTodo({ todoId }: { todoId: string }): Promise<TodoItem> {
    logger.info('Getting todo', { todoId })

    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        KeyConditionExpression: 'todoId = :todoId',
        ExpressionAttributeValues: {
          ':todoId': todoId
        }
      })
      .promise()

    return result.Items[0] as TodoItem
  }

  async createTodo(newTodo: TodoItem): Promise<void> {
    logger.info('Creating new todo', newTodo)
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: newTodo
      })
      .promise()
  }

  async updateUrl({
    todoId,
    userId,
    dueDate,
    attachmentUrl
  }: {
    todoId: string
    userId: string
    dueDate: string
    attachmentUrl: string
  }) {
    logger.info('Updating url', { todoId, userId, attachmentUrl })

    return await this.docClient
      .update({
        TableName: this.todosTable,
        Key: { todoId, dueDate },
        UpdateExpression: 'set attachmentUrl = :attachmentUrl',
        ConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':attachmentUrl': attachmentUrl,
          ':userId': userId
        }
      })
      .promise()
  }

  async updateTodo({
    todoId,
    userId,
    done,
    dueDate
  }: {
    todoId: string
    userId: string
    done: boolean
    dueDate: string
  }) {
    logger.info('Updating todo', { todoId, userId, done })

    return await this.docClient
      .update({
        TableName: this.todosTable,
        Key: { todoId, dueDate },
        UpdateExpression: 'set done = :done',
        ConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':done': done, ':userId': userId }
      })
      .promise()
  }

  async deleteTodo({
    todoId,
    userId,
    dueDate
  }: {
    todoId: string
    userId: string
    dueDate: string
  }) {
    logger.info('Deleting todo', { todoId, userId, dueDate })

    return await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: { todoId, dueDate },
        ConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId }
      })
      .promise()
  }
}

function createDynamoDBClient() {
  return new DynamoDB.DocumentClient()
}
