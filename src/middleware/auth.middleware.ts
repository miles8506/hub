import jwt from 'jsonwebtoken'

import {
  ACCOUNT_OR_PASSWORD_IS_EMPTY,
  ACCOUNT_IS_NOT_EXIST,
  PASSWORD_IS_ERROR,
  TOKEN_INVALID,
} from '../constants/error.types'
import UserService from '../service/user.service'
import { md5Password } from '../utils/handle-password'
import { PUBLIC_KEY } from '../app/config'

import type { IAuthLoginRequest, IAuthLoginContext, ITokenContext, IJWTPayload } from '../types/auth.type'
import { RouterContext } from 'koa-router'

export async function verifyLogin(ctx: RouterContext<any, IAuthLoginContext>, next: () => Promise<any>) {
  const { name, password } = <IAuthLoginRequest>ctx.request.body

  if (!name || !password) {
    const error = new Error(ACCOUNT_OR_PASSWORD_IS_EMPTY)
    ctx.app.emit('error', error, ctx)
    return
  }

  const [user] = await UserService.findUserName(name)
  if (user.length === 0) {
    const error = new Error(ACCOUNT_IS_NOT_EXIST)
    ctx.app.emit('error', error, ctx)
    return
  }

  if (user[0].password !== md5Password(password)) {
    const error = new Error(PASSWORD_IS_ERROR)
    ctx.app.emit('error', error, ctx)
    return
  }
  ctx.user = user[0]

  await next()
}

export async function verifyToken(ctx: RouterContext<any, ITokenContext>, next: () => Promise<any>) {
  const token = ctx.header.authorization?.replace('Bearer ', '') ?? ''

  try {
    ctx.info = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }) as IJWTPayload
    await next()
  } catch {
    const error = new Error(TOKEN_INVALID)
    ctx.app.emit('error', error, ctx)
  }
}
