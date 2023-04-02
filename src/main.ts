import app from './app'
import { APP_PORT } from './app/config'

app.listen(8080, () => {
  console.log(`running serve in ${APP_PORT} port`)
})
