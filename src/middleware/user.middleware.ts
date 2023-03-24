import type { RouterContext } from 'koa-router'

export function registryMiddleware(ctx: RouterContext, next: () => Promise<any>) {
  return ctx.app.emit('error', 'is error~', ctx)
}
