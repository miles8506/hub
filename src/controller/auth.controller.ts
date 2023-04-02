import jwt from 'jsonwebtoken'
import { PRIVATE_KEY, EXPIRES_IN } from '../app/config'

import type { RouterContext } from 'koa-router'
import type { IAuthLoginContext, ITokenContext } from '../types/auth.type'

class AuthController {
  login(ctx: RouterContext<any, IAuthLoginContext>, next: () => Promise<any>) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, { expiresIn: EXPIRES_IN, algorithm: 'RS256' })

    ctx.body = { id, name, token }
  }

  success(ctx: RouterContext<any, ITokenContext>, next: () => Promise<any>) {
    console.log('auth token success')

    ctx.body = ctx.info
  }
}

export default new AuthController()
