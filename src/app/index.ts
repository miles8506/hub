import Koa from 'koa'
import handleError from './handle-error'
import useRouter from '../router/index'
import './database'

import bodyParser from 'koa-bodyparser'

const app = new Koa()

app.use(bodyParser())
useRouter(app)

app.on('error', handleError)

export default app
export type AppType = typeof app
