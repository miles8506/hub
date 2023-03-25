export interface IUser {
  id: number
  name: string
  password: string
  createAt: string
  updateAt: string
}

export interface IUserRegistryRequest {
  name: string
  password: string
}
