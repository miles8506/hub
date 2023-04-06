import pool from '../app/database'

import type { IMomentOriginData } from '../types/moment.type'

export class AuthService {
  async checkTable(tableName: string, id: number, tid: string) {
    const statement = `
      SELECT * FROM ${tableName} WHERE user_id = ? && id = ?;
    `
    const res = (await pool.promise().execute(statement, [id, tid])) as unknown as [IMomentOriginData[], any]

    return res
  }
}

export default new AuthService()
