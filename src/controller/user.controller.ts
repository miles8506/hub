import userService from '../service/user.service'

import type { Next } from 'koa'
import type { RouterContext } from '../types/base.type'
import type { IUserRegistryRequest } from '../types/user.type'

class UserController {
  async create(ctx: RouterContext<{}, any>, next: Next) {
    const data = <IUserRegistryRequest>ctx.request.body

    const [rows] = await userService.create(data)

    ctx.body = rows
  }
}

export default new UserController()
