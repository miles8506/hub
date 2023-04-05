import pool from '../app/database'

class CommentService {
  async create(content: string, commentId: number, userId: number) {
    const statement = `
      INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?);
    `
    const res = (await pool.promise().execute(statement, [content, commentId, userId])) as unknown as [any, any]

    return res
  }
}

export default new CommentService()
