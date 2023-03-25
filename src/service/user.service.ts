import pool from '../app/database'

import type { IUserRegistryRequest, IUser } from '../types/user.type'

class UserService {
  async create({ name: account, password }: IUserRegistryRequest) {
    const statement = `INSERT INTO users (name, password) VALUES(?, ?);`
    const [rows] = await pool.promise().execute(statement, [account, password])

    return rows
  }

  async findUserName(name: string) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const [rows] = await pool.promise().execute(statement, [name])

    return rows
  }
}

export default new UserService()
