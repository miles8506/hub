import fs from 'fs'
import path from 'path'

import dotenv from 'dotenv'

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'))

const EXPIRES_IN = 60 * 60 * 24

dotenv.config()

const { APP_PORT, DATABASE_HOST, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_LIMIT } = process.env

export {
  APP_PORT,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_LIMIT,
  PRIVATE_KEY,
  PUBLIC_KEY,
  EXPIRES_IN,
}
