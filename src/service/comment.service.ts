import pool from '../app/database'

function formatStatement(field: string[], count: number) {
  const names = field.join(', ')
  const values = Array(count).fill('?').join(', ')
  return `INSERT INTO comment (${names}) VALUES(${values})`
}

class CommentService {
  async create(content: string, momentId: number, userId: number) {
    const filed = ['content', 'moment_id', 'user_id']
    const statement = formatStatement(filed, filed.length)
    const res = (await pool.promise().execute(statement, [content, momentId, userId])) as unknown as [any, any]

    return res
  }

  async reply(content: string, momentId: number, userId: number, commentId: string) {
    const field = ['content', 'moment_id', 'user_id', 'comment_id']
    const statement = formatStatement(field, field.length)
    const res = (await pool.promise().execute(statement, [content, momentId, userId, commentId])) as unknown as [any, any]

    return res
  }

  async update(commentId: string, content: string) {
    const statement = `
      UPDATE comment SET content = ? WHERE comment.id = ?;
    `
    const res = pool.promise().execute(statement, [content, commentId]) as unknown as [any, any]

    return res
  }

  async remove(commentId: string) {
    const statement = `
      DELETE FROM comment WHERE id = ?;
    `
    const res = await pool.promise().execute(statement, [commentId]) as unknown as [any, any]

    return res
  }
}

export default new CommentService()
