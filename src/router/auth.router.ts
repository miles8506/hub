import Router from 'koa-router'
import authController from '../controller/auth.controller'
import { verifyLogin, verifyToken } from '../middleware/auth.middleware'

const router = new Router()

router.post('/login', verifyLogin, authController.login)

// router.post('/test', verifyToken, authController.success)

export default router
