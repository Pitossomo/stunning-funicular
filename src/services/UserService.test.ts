import { UserService } from './UserService'
import { v4 as uuid } from 'uuid'

jest.mock('../repositories/UserRepository')
const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
  const newId = uuid() 
  const mockUser = {
    user_id: newId,
    name: "Xistossomo",
    email: "xistossomo@hmail.ex"
  }

  const userService = new UserService({
    userRepository: mockUserRepository,
    name: "Xistossomo",
    email: "xistossomos@hmail.ex"
  })

  it('returns the user when saved', async () => {
    mockUserRepository.save = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockUser)
    })
    const savedUser = await userService.createUser()
    expect(savedUser).toMatchObject({
      user_id: newId,
      name: "Xistossomo",
      email: "xistossomo@hmail.ex"
    })
  })
})