import Router from 'koa-router'
import labelController from '../controller/label.controller'
import { verifyToken } from '../middleware/auth.middleware'
import { checkName } from '../middleware/label.middleware'

const router = new Router({ prefix: '/label' })

router.post('/', verifyToken, checkName, labelController.create)
router.get('/', labelController.list)

export default router
