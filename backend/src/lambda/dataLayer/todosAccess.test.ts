import { TodoAccess } from './todosAccess'
import { TodoItem } from '../../models/TodoItem'

const sampleTodoItems: TodoItem[] = [
  {
    userId: 'some user id',
    todoId: 'some todo id',
    createdAt: 'some created date',
    name: ' some name',
    dueDate: 'some due date',
    done: false
  }
]

describe('todosAccess', () => {
  it('gets all todos', async () => {
    const promise = jest.fn()
    promise.mockResolvedValue({ Items: sampleTodoItems })

    const query = jest.fn()
    query.mockImplementation(() => {
      return { promise }
    })

    const dynamoDbClient: any = { query }
    const todosTable = 'todos table'
    const todoAccess = new TodoAccess(
      dynamoDbClient,
      todosTable,
      'user id index'
    )

    const todoItems = await todoAccess.getAllTodos('some user id')

    expect(query).toHaveBeenCalledWith(
      expect.objectContaining({
        TableName: todosTable
      })
    )
    expect(todoItems).toBe(sampleTodoItems)
  })
})
