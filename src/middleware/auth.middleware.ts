import jwt from 'jsonwebtoken'

import {
  ACCOUNT_OR_PASSWORD_IS_EMPTY,
  ACCOUNT_IS_NOT_EXIST,
  PASSWORD_IS_ERROR,
  TOKEN_INVALID,
  NOT_FOUND_MOMENT_ID,
  WITHOUT_PERMISSION,
} from '../constants/error.types'
import userService from '../service/user.service'
import authService from '../service/auth.service'
import { md5Password } from '../utils/handle-password'
import { PUBLIC_KEY } from '../app/config'

import type { Next } from 'koa'
import type { IAuthLoginRequest, IAuthLoginContext, ITokenContext, IJWTPayload } from '../types/auth.type'
import type { RouterContext } from '../types/base.type'

export async function verifyLogin(ctx: RouterContext<IAuthLoginContext>, next: Next) {
  const { name, password } = <IAuthLoginRequest>ctx.request.body

  if (!name || !password) {
    const error = new Error(ACCOUNT_OR_PASSWORD_IS_EMPTY)
    ctx.app.emit('error', error, ctx)
    return
  }

  try {
    const [user] = await userService.findUserName(name)
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
  } catch (error) {
    console.error(error)
  }

  await next()
}

export async function verifyToken(ctx: RouterContext<ITokenContext>, next: Next) {
  const token = ctx.header.authorization?.replace('Bearer ', '') ?? ''

  try {
    ctx.user = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }) as IJWTPayload

    console.log('auth success')

    await next()
  } catch {
    const error = new Error(TOKEN_INVALID)
    ctx.app.emit('error', error, ctx)
  }
}

export async function verifyPermission(ctx: RouterContext<ITokenContext>, next: Next) {
  const id = ctx.user!.id
  const momentId = ctx.params.momentId

  if (isNaN(+momentId)) {
    const error = new Error(NOT_FOUND_MOMENT_ID)
    ctx.app.emit('error', error, ctx)
    return
  }

  try {
    const [rows] = await authService.checkMoment(id, momentId)
    if (!rows.length) {
      const error = new Error(WITHOUT_PERMISSION)
      ctx.app.emit('error', error, ctx)
      return
    }
  } catch (err) {
    console.error(err)
  }

  await next()
}
