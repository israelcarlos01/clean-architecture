import { IUserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  test('shold return null if user is not found', async () => {
    const users: IUserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  test('shold return user if it is found in the repository', async () => {
    const users: IUserData[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email })
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user.name).toBe('any_name')
  })

  test('shold return all users in the repository', async () => {
    const users: IUserData[] = [
      { name: 'any_name', email: 'any@mail.com' },
      { name: 'second_name', email: 'second@mail.com' }
    ]
    const userRepo = new InMemoryUserRepository(users)
    const returnedUsers = userRepo.findAllUsers()
    expect((await returnedUsers).length).toBe(2)
  })
})
