import UserService from '../service/user.service'
import { ACCOUNT_OR_PASSWORD_IS_EMPTY, ACCOUNT_HAS_EXIST } from '../constants/error.types'
import { md5Password } from '../utils/handle-password'

import type { Next } from 'koa'
import type { RouterContext } from '../types/base.type'
import type { IUserRegistryRequest } from '../types/user.type'

export async function registryMiddleware(ctx: RouterContext<{}, any>, next: Next) {
  const { name, password } = <IUserRegistryRequest>ctx.request.body

  if (!name || !password) {
    const error = new Error(ACCOUNT_OR_PASSWORD_IS_EMPTY)
    ctx.app.emit('error', error, ctx)
    return
  }

  const [users] = await UserService.findUserName(name)
  if (users.length > 0) {
    const error = new Error(ACCOUNT_HAS_EXIST)
    ctx.app.emit('error', error, ctx)
    return
  }

  await next()
}

export async function handlePassword(ctx: RouterContext<{}, any>, next: Next) {
  const data = <IUserRegistryRequest>ctx.request.body
  data.password = md5Password(data.password)

  await next()
}
