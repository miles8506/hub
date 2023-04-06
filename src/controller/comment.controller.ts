import commentService from '../service/comment.service'

import type { Next } from 'koa'
import type { ITokenContext } from '../types/auth.type'
import type { RouterContext } from '../types/base.type'
import type { ICreateCommentReq, IReplyCommentReq, IUpdateCommentReq } from '../types/comment.type'

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

  async reply(ctx: RouterContext<ITokenContext, any>, next: Next) {
    const { commentId } = ctx.params
    const { id } = ctx.user!
    const { momentId, content } = <IReplyCommentReq>ctx.request.body

    try {
      const [rows] = await commentService.reply(content, momentId, id, commentId)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }

  async update(ctx: RouterContext<ITokenContext, any>, next: Next) {
    const { commentId } = ctx.params
    const { content } = <IUpdateCommentReq>ctx.request.body

    try {
      const [rows] = await commentService.update(commentId, content)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }

  async remove(ctx: RouterContext<ITokenContext, any>, next: Next) {
    const { commentId } = ctx.params

    try {
      const [rows] = await commentService.remove(commentId)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }
}

export default new CommentController()
