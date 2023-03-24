import Router from 'koa-router'
import userController from '../controller/user.controller'
import { registryMiddleware } from '../middleware/user.middleware'

const router = new Router({ prefix: '/users' })

router.post('/users', registryMiddleware, userController.create)

export default router
