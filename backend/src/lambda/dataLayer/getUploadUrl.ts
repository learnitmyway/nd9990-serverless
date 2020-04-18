import { S3 } from 'aws-sdk'

import { createLogger } from '../../utils/logger'

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const logger = createLogger('todoAssetsAccess')

export default function getUploadUrl(todoId: string) {
  logger.info('todoId', todoId)
  const s3 = new S3({
    signatureVersion: 'v4'
  })

  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  })
}
