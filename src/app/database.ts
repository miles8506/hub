import mysql from 'mysql2'
import { DATABASE_HOST, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_LIMIT } from './config'

import type { Pool, Connection } from 'mysql2'

type IPool = Pool & Connection

const pool = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  connectionLimit: Number(DATABASE_LIMIT),
}) as IPool

pool.getConnection((_, conn) => {
  conn.connect((err) => {
    if (err) throw new Error('plz check database')
  })
})

export default pool
