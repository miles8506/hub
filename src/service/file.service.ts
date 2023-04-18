import pool from '../app/database'

import type { IFileAvatarRes } from '../types/file.type'

class FileService {
  async createAvatar(user_id: number, filename: string, mimetype: string, size: number) {
    const statement = `
      INSERT INTO avatar (user_id, filename, mimetype, size) VALUES (?, ? ,?, ?);
    `
    const res = (await pool.promise().execute(statement, [user_id, filename, mimetype, size])) as unknown as [any, any]

    return res
  }

  async findAvatar(id: string) {
    const statement = `
      SELECT * FROM avatar WHERE user_id = ?;
    `
    const res = (await pool.promise().execute(statement, [id])) as unknown as [IFileAvatarRes[], any]

    return res
  }

  async saveAvatarUrl(userId: number, avatarUrl: string) {
    const statement = `
      UPDATE user SET avatar_url = ? WHERE user.id = ?;
    `
    const res = await pool.promise().execute(statement, [avatarUrl, userId])

    return res
  }
}

export default new FileService()
