import { UserController } from './user.controller'
import User, { IUserMongoose } from './user.model'
import { IUser } from './user.interface'

test('UserController.users() --> database access throws error', async () => {
    User.find = jest.fn(async () => {
        throw new Error()
    })
    await expect(UserController.users()).rejects.toThrow()
})

test('UserController.users() --> database access throws error 2', async () => {
    User.find = jest.fn(
        async (): Promise<IUser> => {
            throw new Error()
        }
    )
    let value = null
    try {
        value = await UserController.users()
    } catch (e) {
        value = e
    }

    expect(value).toBe(null)
})

test('UserController.users() --> database access throws no error', async () => {
    User.find = jest.fn(
        async (): Promise<IUser[]> => {
            return [
                {
                    id: 1,
                    username: 'admin',
                    password: 'sterne123',
                    email: 'admin@hm.edu',
                    role: null,
                    comparePassword: null,
                    img: null,
                },
            ]
        }
    )
    await expect(UserController.users()).resolves.not.toBe(null)
})
