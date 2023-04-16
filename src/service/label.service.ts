import pool from "../app/database"

import type { ILable } from "../types/label.type"
import { ILabel } from "../types/moment.type"

class LabelService {
  async create(name: string) {
    const statement = `
      INSERT INTO label (name) VALUES (?);
    `
    const res = await pool.promise().execute(statement, [name]) as unknown as [any, any]

    return res
  }

  async findName(name: string) {
    const statement = `
      SELECT * FROM label WHERE label.name = ?;
    `
    const res = pool.promise().execute(statement, [name]) as unknown as [ILable[], any]

    return res
  }

  async list(limit: string, offset: string) {
    const statement = `
      SELECT * FROM label LIMIT ? OFFSET ?;
    `
    const res = pool.promise().execute(statement, [limit, offset]) as unknown as [ILabel[], any]

    return res
  }
}

export default new LabelService
