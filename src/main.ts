import app from './app/app'
import './app/database'
import userRouter from './router/user.router'
import { handleError } from './app/error-handle'
import { APP_PORT } from './app/config'

import bodyParser  from 'koa-bodyparser'

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.on('error', handleError)

app.listen(8080, () => {
  console.log(`running serve in ${APP_PORT} port`)
})
