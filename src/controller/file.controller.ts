import fileService from '../service/file.service'
import { APP_PORT, APP_HOST } from '../app/config'

import type { Next } from 'koa'
import type { ITokenContext } from '../types/auth.type'
import type { RouterContext } from '../types/base.type'

class FileController {
  async createAvatar(ctx: RouterContext<ITokenContext>, next: Next) {
    const { id } = ctx.user!
    const { filename, mimetype, size } = ctx.request.file
    const [rows] = await fileService.createAvatar(Number(id), filename, mimetype, size)
    await fileService.saveAvatarUrl(id, `${APP_HOST}:${APP_PORT}/user/${id}/avatar`)

    ctx.body = rows
  }
}

export default new FileController()
