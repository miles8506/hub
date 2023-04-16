import labelService from '../service/label.service'

import type { Next } from 'koa'
import type { ITokenContext } from '../types/auth.type'
import type { RouterContext } from '../types/base.type'
import type { ICreateLabelBody } from '../types/label.type'
import type { ILabel } from '../types/moment.type'

class LabelController {
  async create(ctx: RouterContext<ITokenContext>, next: Next) {
    const { name } = <ICreateLabelBody>ctx.request.body
    const [rows] = await labelService.create(name)

    ctx.body = rows
  }

  async list(ctx: RouterContext<{}, ILabel[]>, next: Next) {
    const { limit, offset } = ctx.request.query
    try {
      const [rows] = await labelService.list(limit as string, offset as string)

      ctx.body = rows
    } catch(err) {
      console.error(err)
    }
  }
}

export default new LabelController()
