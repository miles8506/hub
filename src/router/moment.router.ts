import Router from 'koa-router'

import momentController from '../controller/moment.controller'
import { verifyToken, verifyPermission } from '../middleware/auth.middleware'
import { ITokenContext } from '../types/auth.type'

const router = new Router<any, ITokenContext>({ prefix: '/moment' })

router.get('/', momentController.getAll)
router.get('/:momentId', momentController.getSingle)
router.post('/create', verifyToken, momentController.create)
router.patch('/:momentId', verifyToken, verifyPermission, momentController.update)

export default router