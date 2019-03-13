import { UserController } from './user.controller'
import User from './user.model'

async function throws() {
    throw new Error('hi')
}
test('return error', async () => {
    User.find = jest.fn(async () => {
        throw new Error()
    })
    await expect(UserController.users()).rejects.toThrow()
})
