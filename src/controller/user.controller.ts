import userService from '../service/user.service'

import type { RouterContext } from 'koa-router'
import type { IUserRegistryRequest } from '../types/user.type'

class UserController {
  async create(ctx: RouterContext, next: () => Promise<any>) {
    const data = <IUserRegistryRequest>ctx.request.body
    const [rows] = await userService.create(data)

    ctx.body = rows
  }
}

export default new UserController()
