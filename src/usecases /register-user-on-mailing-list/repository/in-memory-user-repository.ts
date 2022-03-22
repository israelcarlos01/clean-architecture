import { IUserRepository } from '../ports/user-repository'
import { IUserData } from '../user-data'

export class InMemoryUserRepository implements IUserRepository {
    private repository: IUserData[]

    constructor (repository: IUserData[]) {
      this.repository = repository
    }

    async add (user: IUserData): Promise<void> {
      const exists = await this.exists(user)
      if (!exists) {
        this.repository.push(user)
      }
    }

    async findUserByEmail (email: string): Promise<IUserData> {
      const users = this.repository.filter(user => user.email === email)

      if (users.length > 0) {
        return users[0]
      }
      return null
    }

    findAllUsers (): Promise<IUserData[]> {
      throw new Error('Method not implemented.')
    }

    async exists (user: IUserData): Promise<boolean> {
      const isExist = await this.findUserByEmail(user.email)
      if (!isExist) {
        return false
      }
      return true
    }
}
