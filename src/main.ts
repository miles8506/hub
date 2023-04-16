import app from './app'
import { APP_PORT } from './app/config'

app.listen(APP_PORT, () => {
  console.log(`running serve in ${APP_PORT} port`)
})
