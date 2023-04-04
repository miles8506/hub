import pool from "../app/database"

import type { IMomentOriginData } from "../types/moment.type"

export class AuthService {
  async checkMoment(id: number, momentId: string) {
    const statement = `
      SELECT * FROM moment WHERE moment.user_id = ? && moment.id = ?;
    `
    const res = await pool.promise().execute(statement, [id, momentId]) as unknown as [IMomentOriginData[], any]

    return res
  }
}

export default new AuthService()
