import multer from '@koa/multer'

import { AVATAR_PATH } from '../constants/file-path'

// avatar
const avatarStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, AVATAR_PATH)
  }
  // filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  //   cb(null, uniqueSuffix + path.extname(file.originalname))
  // },
})
const uploadAvatar = multer({
  storage: avatarStorage,
})

export { uploadAvatar }
