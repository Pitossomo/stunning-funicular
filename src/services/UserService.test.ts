import { getMockUser } from '../__mocks__/mockUser'
import { UserService } from './UserService'

jest.mock('../repositories/UserRepository')
const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
  const mockUser = getMockUser()

  const userService = new UserService({
    userRepository: mockUserRepository,
    name: "Pitossomo",
    email: "pitossomos@hmail.ex"
  })

  it('returns the user when saved', async () => {
    mockUserRepository.save = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockUser)
    })
    const savedUser = await userService.createUser()
    expect(savedUser).toHaveProperty("user_id")
    expect(savedUser).toMatchObject({
      name: "Pitossomo",
      email: "pitossomos@hmail.ex"
    })
  })
})