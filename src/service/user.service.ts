import pool from '../app/database'

import type { IUser, IUserRegistryRequest } from '../types/user.type'

class UserService {
  async create({ name, password }: IUserRegistryRequest) {
    const statement = `INSERT INTO user (name, password) VALUES(?, ?);`
    const res = await pool.promise().execute(statement, [name, password])

    return res
  }

  async findUserName(name: string) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const rows = (await pool.promise().execute(statement, [name])) as unknown as [IUser[], any]

    return rows
  }
}

export default new UserService()
