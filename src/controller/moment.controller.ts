import momentService from '../service/moment.service'

import type { Next } from 'koa'
import type { RouterContext } from '../types/base.type'
import type { ICreateMomentReq, IGetAllMomentParams, IGetMomentRes, IPatchMomentBody } from '../types/moment.type'
import type { ITokenContext } from '../types/auth.type'

class MomentController {
  async create(ctx: RouterContext<ITokenContext, any>, next: Next) {
    const { content } = <ICreateMomentReq>ctx.request.body
    const id = ctx.user!.id

    try {
      const [rows] = await momentService.create(id, content)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }

  async getSingle(ctx: RouterContext<{}, IGetMomentRes[]>, next: Next) {
    const id = ctx.params.momentId ?? ''

    try {
      const [rows] = await momentService.getSingle(id)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }

  async getAll(ctx: RouterContext<{}, IGetMomentRes[]>, next: Next) {
    const { size, offset } = ctx.request.query as unknown as IGetAllMomentParams

    try {
      const [rows] = await momentService.getAll(size, offset)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }

  async update(ctx: RouterContext<ITokenContext, any>, next: Next) {
    const { content } = <IPatchMomentBody>ctx.request.body
    const momentId = ctx.params.momentId

    try {
      const [rows] = await momentService.update(content, momentId)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }

  async remove(ctx: RouterContext<ITokenContext, any>, next: Next) {
    const { momentId } = ctx.params

    try {
      const [rows] = await momentService.remove(momentId)

      ctx.body = rows
    } catch (error) {
      console.error(error)
    }
  }
}

export default new MomentController()
