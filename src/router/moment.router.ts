import Router from 'koa-router'

import momentController from '../controller/moment.controller'
import { verifyToken, verifyPermission } from '../middleware/auth.middleware'
import { checkLabelName } from '../middleware/moment.middleware'
import { ITokenContext } from '../types/auth.type'

const router = new Router<any, ITokenContext>({ prefix: '/moment' })

router.get('/', momentController.getAll)
router.get('/:momentId', momentController.getSingle)
router.post('/create', verifyToken, momentController.create)
router.post('/:momentId/labels', verifyToken, verifyPermission, checkLabelName, momentController.addLabel)
router.patch('/:momentId', verifyToken, verifyPermission, momentController.update)
router.delete('/:momentId', verifyToken, verifyPermission, momentController.remove)

export default router
