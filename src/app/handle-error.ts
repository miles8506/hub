import {
  ACCOUNT_OR_PASSWORD_IS_EMPTY,
  ACCOUNT_HAS_EXIST,
  ACCOUNT_IS_NOT_EXIST,
  PASSWORD_IS_ERROR,
  TOKEN_INVALID,
  WITHOUT_PERMISSION,
  NOT_FOUND_MOMENT_ID,
  LABEL_HAS_EXIST
} from '../constants/error.types'

import type { RouterContext } from 'koa-router'

export default function handleError(err: Error, ctx: RouterContext) {
  const errorMsg = err.message

  switch (errorMsg) {
    case ACCOUNT_OR_PASSWORD_IS_EMPTY:
      ctx.status = 400
      ctx.body = 'account or password is empty'
      break
    case ACCOUNT_HAS_EXIST:
      ctx.status = 409
      ctx.body = 'account has exist'
      break
    case ACCOUNT_IS_NOT_EXIST:
      ctx.status = 400
      ctx.body = "account isn't exist"
      break
    case PASSWORD_IS_ERROR:
      ctx.status = 400
      ctx.body = 'password is error'
      break
    case TOKEN_INVALID:
      ctx.status = 401
      ctx.body = 'token is invalid'
      break
    case NOT_FOUND_MOMENT_ID:
      ctx.status = 400
      ctx.body = 'not found moment id'
      break
    case WITHOUT_PERMISSION:
      ctx.status = 401
      ctx.body = 'without permission'
      break
    case LABEL_HAS_EXIST:
      ctx.status = 400
      ctx.body = 'label name has exist'
      break
    default:
      ctx.status = 404
      ctx.body = 'not found page'
  }
}
