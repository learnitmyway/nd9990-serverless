import { v4 } from 'uuid'
import { S3 } from 'aws-sdk'

import { TodoItem } from '../../models/TodoItem'
import { TodoAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'
const url = require('url')

const todoAccess = new TodoAccess()
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const logger = createLogger('todoService')

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return await todoAccess.getAllTodos(userId)
}

export async function getTodo({
  todoId,
  userId
}: {
  todoId: string
  userId: string
}): Promise<TodoItem> {
  const todoItem = await todoAccess.getTodo({ todoId })

  if (todoItem.userId !== userId) {
    throw new Error('Access denied: userId does not match')
  }

  return todoItem
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

export async function updateUrl({
  todoId,
  userId,
  dueDate
}: {
  todoId: string
  userId: string
  dueDate: string
}) {
  const uploadUrl = getUploadUrl(todoId)
  logger.info('uploadUrl', { uploadUrl })

  const { host, pathname } = url.parse(uploadUrl)
  const attachmentUrl = `https://${host}${pathname}`

  await todoAccess.updateUrl({ todoId, userId, dueDate, attachmentUrl })
  return uploadUrl
}

function getUploadUrl(todoId: string) {
  const s3 = new S3({
    signatureVersion: 'v4'
  })

  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  })
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
