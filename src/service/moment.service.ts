import pool from '../app/database'

import type { IGetMomentRes } from '../types/moment.type'

const getSQLStatement = `
  SELECT
    m.id id, m.content, m.createAt, m.updateAt,
    JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt) author
  FROM moment m LEFT JOIN user u ON m.user_id = u.id
`

class MomentService {
  async create(id: number, content: string) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
    const res = await pool.promise().execute(statement, [id, content])

    return res
  }

  async getSingle(id: string) {
    const statement = `
      ${getSQLStatement}
      WHERE m.id = ?;
    `
    const res = (await pool.promise().execute(statement, [id])) as unknown as [IGetMomentRes[], any]

    return res
  }

  async getAll(size: string, offset: string) {
    const statement = `
      ${getSQLStatement}
      LIMIT ? OFFSET ?;
    `
    const res = (await pool.promise().execute(statement, [size, offset])) as unknown as [IGetMomentRes[], any]

    return res
  }

  async update(content: string, momentId: string) {
    const statement = `
      UPDATE moment SET moment.content = ? WHERE moment.id = ?;
    `
    const res = (await pool.promise().execute(statement, [content, momentId])) as unknown as [any, any]

    return res
  }

  async remove(commentId: string) {
    const statement = `
      DELETE FROM moment WHERE moment.id = ?;
    `
    const res = pool.promise().execute(statement, [commentId]) as unknown as [any, any]

    return res
  }
}

export default new MomentService()
