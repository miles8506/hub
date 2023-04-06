export interface ICreateCommentReq {
  momentId: number
  content: string
}

export interface IReplyCommentReq {
  momentId: number
  content: string
}

export interface IUpdateCommentReq {
  content: string
}
