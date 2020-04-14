import { v4 } from 'uuid'

import { TodoItem } from '../../models/TodoItem'
import { TodoAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

const todoAccess = new TodoAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return await todoAccess.getAllTodos(userId)
}

export async function createTodo({
  body,
  userId
}: {
  body: CreateTodoRequest
  userId: string
}): Promise<TodoItem> {
  const createdAt = new Date().toISOString()
  const todoId = v4()
  const newTodo: TodoItem = {
    ...body,
    userId,
    createdAt,
    todoId,
    done: false
  }

  await todoAccess.createTodo(newTodo)

  return newTodo
}

export async function updateTodo({
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
  return await todoAccess.updateTodo({ todoId, userId, done, dueDate })
}
