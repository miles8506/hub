import { ACCOUNT_OR_PASSWORD_IS_EMPTY, ACCOUNT_HAS_EXIST } from '../constants/error.types'

import type { RouterContext } from 'koa-router'

export function handleError(err: Error, ctx: RouterContext) {
  const errorMsg = err.message
  console.log(errorMsg)
  switch (errorMsg) {
    case ACCOUNT_OR_PASSWORD_IS_EMPTY:
      ctx.status = 400
      ctx.body = 'account or password is empty'
      break
    case ACCOUNT_HAS_EXIST:
      ctx.status = 409
      ctx.body = 'account has exist'
      break
    default:
      ctx.status = 404
      ctx.body = 'not found page'
  }
}
