import UserService from '../service/user.service'
import { ACCOUNT_OR_PASSWORD_IS_EMPTY, ACCOUNT_HAS_EXIST } from '../constants/error.types'
import { md5Password } from '../utils/handle-password'


import type { RouterContext } from 'koa-router'
import type { IUser, IUserRegistryRequest } from '../types/user.type'

export async function registryMiddleware(ctx: RouterContext, next: () => Promise<any>) {
  const { name, password } = <IUserRegistryRequest>ctx.request.body

  if (!name || !password) {
    const error = new Error(ACCOUNT_OR_PASSWORD_IS_EMPTY)
    ctx.app.emit('error', error, ctx)
    return
  }

  const hasName = await UserService.findUserName(name) as IUser[]
  if (hasName.length > 0) {
    const error = new Error(ACCOUNT_HAS_EXIST)
    ctx.app.emit('error', error, ctx)
    return
  }

  await next()
}

export async function handlePassword(ctx: RouterContext, next: () => Promise<any>) {
  const data = <IUserRegistryRequest>ctx.request.body
  data.password = md5Password(data.password)

  await next()
}
