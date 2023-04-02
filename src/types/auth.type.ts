import type { RouterContext } from 'koa-router'
import type { IUser } from './user.type'
import type { JwtPayload } from 'jsonwebtoken'

export interface IAuthLoginRequest {
  name: string
  password: string
}

export interface IAuthLoginContext {
  user: IUser
}

export interface IJWTPayload extends JwtPayload {
  id: number
  name: string
}

export interface ITokenContext {
  info: IJWTPayload
}
