import commentService from '../service/comment.service'

import type { Next } from 'koa'
import type { ITokenContext } from '../types/auth.type'
import type { RouterContext } from '../types/base.type'
import type { ICreateCommentReq } from '../types/comment.type'

class CommentController {
  async create(ctx: RouterContext<ITokenContext, any>, next: Next) {
    const { id } = ctx.user!
    const { momentId, content } = <ICreateCommentReq>ctx.request.body

    try {
      const [rows] = await commentService.create(content, momentId, id)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }
}

export default new CommentController()
