import { makeMockRequest } from '../__mocks__/mockRequest'
import { makeMockResponse } from '../__mocks__/mockResponse'
import { UserController } from './UserController'

jest.mock('../services/UserService', () => {
  return { UserService: jest.fn().mockImplementation(() => {
    return { createUser: jest.fn() }
  })}
})

describe('UserController', () => {
  const userController = new UserController()
  
  it('must return status 201 and the saved user', async () => {
    const request = makeMockRequest({
      body: {
        name: "Pitossomo",
        email: "pitossomo@hmail.ex"
      }
    })

    const response = makeMockResponse() 
    await userController.createUser(request, response)
    expect(response.state.status).toBe(201)
    expect(response.state.json).toHaveProperty('user_id')
    expect(response.state.json).toMatchObject({
      name: "Pitossomo",
      email: "pitossomo@hmail.ex"
    })
  })
})