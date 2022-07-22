import getEntityManagerMock from '../__mocks__/getEntityManagerMock'
import { UserRepository } from './UserRepository'
import { v4 as uuid } from 'uuid'
import { User } from '../entities/User'

describe('UserRepository', () => {
  const newId = uuid() 
  const mockUser: User = {
    user_id: newId,
    name: "Pitossomo",
    email: "pitossomos@hmail.ex"
  }

  it('return the saved user when save function is called', async () => {
    const managerMock = await getEntityManagerMock({ saveReturn: mockUser})
    const userRepository = new UserRepository(managerMock)

    const savedUser = await userRepository.save(mockUser)
    expect(savedUser).toMatchObject({
      user_id: newId,
      name: "Pitossomo",
      email: "pitossomos@hmail.ex"
    })
  })
})