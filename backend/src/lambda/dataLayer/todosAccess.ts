import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../../models/TodoItem'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'

const logger = createLogger('todosAccess')

export class TodoAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE
  ) {}

  async getAllTodos(): Promise<TodoItem[]> {
    logger.info('Getting all todos')

    const result = await this.docClient
      .scan({
        TableName: this.todosTable
      })
      .promise()

    return result.Items as TodoItem[]
  }

  async createTodo(newTodo: CreateTodoRequest): Promise<void> {
    logger.info('Creating todo')
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: newTodo
      })
      .promise()
  }
}

function createDynamoDBClient() {
  return new AWS.DynamoDB.DocumentClient()
}
