import { UserController, ERRORS } from './user.controller'
import User, { IUserMongoose } from './user.model'
import { IUser } from './user.interface'

describe('[UserController.users]', () => {
    const mockUsers: IUser[] = [
        {
            id: '1',
            username: 'admin',
            password: 'sterne123',
            email: 'admin@hm.edu',
            role: null,
            comparePassword: null,
            img: null,
        },
        {
            id: '2',
            username: 'reader',
            password: 'sterne123',
            email: 'reader@hm.edu',
            role: null,
            comparePassword: null,
            img: null,
        },
        {
            id: '3',
            username: 'yoda',
            password: 'sterne123',
            email: 'yoda@hm.edu',
            role: null,
            comparePassword: null,
            img: null,
        },
    ]

    it('db returns error', async () => {
        User.find = jest.fn(() => {
            throw new Error('something went wrong')
        })
        //await expect(UserController.users()).rejects.toThrow()
    })
})
