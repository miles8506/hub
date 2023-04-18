import pool from '../app/database'

import type { IGetMomentRes, ILabel } from '../types/moment.type'

class MomentService {
  async create(id: number, content: string) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
    const res = await pool.promise().execute(statement, [id, content])

    return res
  }

  async getSingle(id: string) {
    const statement = `
      SELECT
        m.id id, m.content, m.createAt, m.updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt, 'avatar_url', u.avatar_url) author,
        IF(
          COUNT(ml.label_id),
          JSON_ARRAYAGG(
            JSON_OBJECT('id', l.id, 'name', l.name)
          ),
          NULL
        ) labels,
        (SELECT IF(
          COUNT(c.id),
          JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'createAt', c.createAt, 'user', JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url))
          ),
          NULL) FROM comment c LEFT JOIN user u ON c.user_id = u.id WHERE c.moment_id = m.id) comment_list
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON ml.label_id = l.id
      WHERE m.id = ?
      GROUP BY m.id;
    `
    const res = (await pool.promise().execute(statement, [id])) as unknown as [IGetMomentRes[], any]

    return res
  }

  async getAll(size: string, offset: string) {
    const statement = `
      SELECT
        m.id id, m.content, m.createAt, m.updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) comment_count,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) label_count
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ? OFFSET ?;
    `
    const res = await pool.promise().execute(statement, [size, offset]) as unknown as [IGetMomentRes[], any]

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

  async hasId(momentId: string, labelId: number) {
    const statement = `
      SELECT * from moment_label ml WHERE ml.moment_id = ? && ml.label_id = ?;
    `
    const res = await pool.promise().execute(statement, [momentId, labelId]) as unknown as [ILabel[], any]

    return res
  }

  async addLabel(momentId: string, labelId: number) {
    const statement = `
      INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);
    `
    const res = await pool.promise().execute(statement, [momentId, labelId]) as unknown as [any, any]

    return res
  }
}

export default new MomentService()
