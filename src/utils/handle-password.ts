import * as crypto from 'crypto'

export function md5Password(password: string) {
  const md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}
