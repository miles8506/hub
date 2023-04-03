import type { ITokenContext } from "./auth.type";

export interface ICreateMomentContext extends ITokenContext { }
export interface ICreateMomentReq {
  content: string
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
