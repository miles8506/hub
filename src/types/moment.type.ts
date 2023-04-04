import type { ITokenContext } from './auth.type'
import type { RouterContext } from './base.type'
import type { Context } from 'koa'

export interface ICreateMomentContext extends RouterContext<any, any> {

}
export interface ICreateMomentReq {
  content: string
}

export interface IMomentOriginData {
  id: number
  content: string
  user_id: number
  createAt: string
  updateAt: string
}

export interface IGetMomentRes {
  id: number
  content: string
  createAt: string
  updateAt: string
  author: {
    id: number
    name: string
    createAt: string
    updateAt: string
  }
}

export interface IGetAllMomentParams {
  offset: string
  size: string
}

export interface IUpdateMomentContext extends ITokenContext {}

export interface IPatchMomentBody {
  content: string
}
