import Router from 'koa-router'
import { verifyToken } from '../middleware/auth.middleware'
import commentController from '../controller/comment.controller'

const router = new Router({ prefix: '/comment' })

router.post('/', verifyToken, commentController.create)

export default router
