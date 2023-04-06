import Router from 'koa-router'
import { verifyPermission, verifyToken } from '../middleware/auth.middleware'
import commentController from '../controller/comment.controller'

const router = new Router({ prefix: '/comment' })

router.post('/', verifyToken, commentController.create)
router.post('/:commentId/reply', verifyToken, commentController.reply)
router.patch('/:commentId/update', verifyToken, verifyPermission, commentController.update)
router.delete('/:commentId/remove', verifyToken, verifyPermission, commentController.remove)

export default router
