import fs from 'fs'
import path from 'path'

import userService from '../service/user.service'
import fileService from '../service/file.service'
import { AVATAR_PATH } from '../constants/file-path'

import type { Next } from 'koa'
import type { RouterContext } from '../types/base.type'
import type { IUserRegistryRequest } from '../types/user.type'

class UserController {
  async create(ctx: RouterContext<{}>, next: Next) {
    const data = <IUserRegistryRequest>ctx.request.body

    const [rows] = await userService.create(data)

    ctx.body = rows
  }

  async avatar(ctx: RouterContext<{}>, next: Next) {
    const id = ctx.params.userId
    const [rows] = await fileService.findAvatar(id)
    ctx.response.set('content-type', rows[0].mimetype)
    const file = fs.createReadStream(path.resolve(`${AVATAR_PATH}/${rows[0].filename}`))

    ctx.body = file
  }
}

export default new UserController()
