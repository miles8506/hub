import pool from "../app/database";

import type { IUserRegistry } from "../types/user.type";

class UserService {
  async create({ name: account, password }: IUserRegistry) {
    const statement = `INSERT INTO users (name, password) VALUES(?, ?);`
    const [rows] = await pool.promise().execute(statement, [account, password])

    return rows
  }
}

export default new UserService()
