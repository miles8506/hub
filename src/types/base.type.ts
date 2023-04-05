import type { ParameterizedContext } from 'koa'
import Router from 'koa-router'

export type RouterContext<CustomT = Router.IRouterParamContext<any, {}>, BodyT = any> = ParameterizedContext<
  any,
  Router.IRouterParamContext<any, CustomT> & CustomT,
  BodyT
>
