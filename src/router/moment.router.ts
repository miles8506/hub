import Router from 'koa-router'

import momentController from '../controller/moment.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = new Router({ prefix: '/moment' })

router.get('/', momentController.getAll)
router.post('/create', verifyToken, momentController.create)
router.get('/:momentId', momentController.getSingle)

export default router
