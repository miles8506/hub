import momentService from '../service/moment.service'

import type { RouterContext } from 'koa-router'
import type { ICreateMomentContext, ICreateMomentReq, IGetAllMomentParams } from '../types/moment.type'

class MomentController {
  async create(ctx: RouterContext<any, ICreateMomentContext>, next: () => Promise<any>) {
    const { content } = <ICreateMomentReq>ctx.request.body
    const { id } = ctx.user

    const [rows] = await momentService.create(id, content)

    ctx.body = rows
  }

  async getSingle(ctx: RouterContext, next: () => Promise<any>) {
    const id = ctx.params.momentId ?? ''
    const [rows] = await momentService.getSingle(id)

    ctx.body = rows
  }

  async getAll(ctx: RouterContext, next: () => Promise<any>) {
    const { size, offset } = ctx.request.query as unknown as IGetAllMomentParams
    const [rows] = await momentService.getAll(size, offset)

    ctx.body = rows
  }
}

export default new MomentController()
