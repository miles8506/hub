import * as fs from 'fs'
import * as path from 'path'

import type { AppType } from '../app/index'

const filenames = fs.readdirSync(__dirname)

export default async function useRouter(app: AppType) {
  for (const file of filenames) {
    /**
     * import src/router/ does not include index.ts
     */
    if (file === 'index.ts') continue

    const router = require(path.resolve(__dirname, file)).default
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}
