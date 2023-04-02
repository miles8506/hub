import Router from 'koa-router'
import userController from '../controller/user.controller'
import { registryMiddleware, handlePassword } from '../middleware/user.middleware'

const router = new Router({ prefix: '/user' })

router.post('/user', registryMiddleware, handlePassword, userController.create)

export default router
