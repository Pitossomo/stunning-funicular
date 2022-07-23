import { makeMockRequest } from '../__mocks__/mockRequest'
import { makeMockResponse } from '../__mocks__/mockResponse'
import { UserController } from './UserController'
import { getMockUser } from '../__mocks__/mockUser' 
import { User } from '../entities/User'

const mockUser: User = getMockUser()

jest.mock('../services/UserService', () => {
  return { UserService: jest.fn().mockImplementation(() => {
    return { 
      createUser: jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    }
  })}
})

describe('UserController', () => {
  const userController = new UserController()
  
  it('must return status 201 and the saved user', async () => {
    const request = makeMockRequest({
      body: {
        name: "Pitossomo",
        email: "pitossomos@hmail.ex"
      }
    })
    const response = makeMockResponse()

    await userController.createUser(request, response)
    
    expect(response.state.status).toBe(201)
    expect(response.state.json).toHaveProperty("user_id")
    expect(response.state.json).toMatchObject({
      name: "Pitossomo",
      email: "pitossomos@hmail.ex"
    })
  })

  it('must return status 400 when name or email are empty', async () => {
    const request = makeMockRequest({
      body: {
        name: '',
        email: ''
      }
    })
    const response = makeMockResponse() 
  
    await userController.createUser(request, response)
    expect(response.state.status).toBe(400)
       
  })
})