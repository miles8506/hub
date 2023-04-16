import labelService from '../service/label.service'
import { LABEL_HAS_EXIST } from '../constants/error.types'

import type { Next } from 'koa'
import type { ITokenContext } from '../types/auth.type'
import type { RouterContext } from '../types/base.type'
import type { ICreateLabelBody } from '../types/label.type'

export async function checkName(ctx: RouterContext<ITokenContext>, next: Next) {
  const { name } = <ICreateLabelBody>ctx.request.body

  try {
    const [rows] = await labelService.findName(name)
    if (rows.length > 0) {
      const error = new Error(LABEL_HAS_EXIST)
      ctx.app.emit('error', error, ctx)
      return
    }
  } catch(err) {
    console.error(err)
  }

  await next()
}
