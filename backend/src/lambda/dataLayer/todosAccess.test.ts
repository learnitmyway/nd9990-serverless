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

    const scan = jest.fn()
    scan.mockImplementation(() => {
      return { promise }
    })

    const dynamoDbClient: any = { scan }
    const todosTable = 'todos table'
    const todoAccess = new TodoAccess(dynamoDbClient, todosTable)

    const todoItems = await todoAccess.getAllTodos()

    expect(scan).toHaveBeenCalledWith({
      TableName: todosTable
    })
    expect(todoItems).toBe(sampleTodoItems)
  })
})
