import jwt from 'jsonwebtoken'
import { PRIVATE_KEY, EXPIRES_IN } from '../app/config'

import type { Next } from 'koa'
import type { RouterContext } from '../types/base.type'
import type { IAuthLoginContext, ITokenContext, IAuthLoginRes } from '../types/auth.type'

class AuthController {
  login(ctx: RouterContext<IAuthLoginContext, IAuthLoginRes>, next: Next) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, { expiresIn: EXPIRES_IN, algorithm: 'RS256' })

    ctx.body = { id, name, token }
  }

  /**
   * test
   */
  success(ctx: RouterContext<ITokenContext>, next: Next) {
    ctx.body = ctx.user
  }
}

export default new AuthController()
