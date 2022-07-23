import axios from "axios";

const server = axios.create({
  baseURL: 'http://localhost:5001'
})

describe('/users', () => {
  it('return status 201 when successful creating new user', async () => {
    const user = await server.post('/user', {
      name: 'Pitossomo',
      email: 'pitossomos@hmail.ex'
    })

    expect(user.status).toBe(201)
  })
})