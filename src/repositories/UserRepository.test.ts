import getEntityManagerMock from '../__mocks__/getEntityManagerMock'
import { UserRepository } from './UserRepository'
import { getMockUser } from '../__mocks__/mockUser'

describe('UserRepository', () => {
  const mockUser = getMockUser()

  it('return the saved user when save function is called', async () => {
    const managerMock = await getEntityManagerMock({ saveReturn: mockUser})
    const userRepository = new UserRepository(managerMock)

    const savedUser = await userRepository.save(mockUser)
    expect(savedUser).toHaveProperty("user_id")
    expect(savedUser).toMatchObject({
      name: "Pitossomo",
      email: "pitossomos@hmail.ex"
    })
  })
})