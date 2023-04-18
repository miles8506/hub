import Router from 'koa-router'
import fileController from '../controller/file.controller'
import { verifyToken } from '../middleware/auth.middleware'
import { uploadAvatar } from '../middleware/file.middleware'

const FileRouter = new Router({ prefix: '/upload' })

FileRouter.post('/avatar', verifyToken, (uploadAvatar.single('avatar') as any), fileController.createAvatar)

export default FileRouter
