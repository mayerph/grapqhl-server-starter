import { userResolver } from './user.resolver'
import { UserController } from './user.controller'
import { IUser } from './user.interface'
import { isNull } from 'util'

describe('[Query.users]', () => {
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

    it('description', async () => {
        UserController.users = jest.fn(() => {
            return mockUsers
        })
        // parent, args, context, info
        const res = await userResolver.Query.users()
        expect(res[0].id).toEqual('1')
    })
})

describe('[Query.user]', () => {
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

    it('call with argument', async () => {
        UserController.user = jest.fn(
            async (id: string): Promise<IUser> => {
                const user = mockUsers.find(e => {
                    return e.id === id
                })
                return user
            }
        )
        const res = await userResolver.Query.user(null, { id: '1' })
        expect(res.username).toBe('admin')
    })

    it('throws error if controller returns error', async () => {
        UserController.user = jest.fn(
            async (id: string): Promise<IUser> => {
                throw new Error()
            }
        )
        //const res = await userResolver.Query.user(null, { id: '1' })
        await expect(userResolver.Query.user(null, null)).rejects.toThrow()
    })

    it('throws error if argument is null', async () => {
        UserController.user = jest.fn(
            async (id: string): Promise<IUser> => {
                const user = mockUsers.find(e => {
                    return e.id === id
                })
                return user
            }
        )
        try {
            const res = await userResolver.Query.user(null, null)
        } catch (e) {
            expect(e.message).toBe('the id can’t be null')
        }

        //expect(res.username).toBe('admin')
    })
})

describe('[Query.me]', () => {
    const mockContext = {
        auth: {
            me: {
                id: '1',
                username: 'admin',
                password: 'sterne123',
                email: 'admin@hm.edu',
                role: null,
                comparePassword: null,
                img: null,
            },
        },
    }
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

    it('call with context object works', async () => {
        UserController.user = jest.fn(
            async (id: string): Promise<IUser> => {
                const user = mockUsers.find(e => {
                    return e.id === id
                })
                return user
            }
        )
        const res = await userResolver.Query.me(null, null, mockContext)
        expect(res.username).toBe('admin')
    })

    it('throws error if me property is null', async () => {
        UserController.user = jest.fn(
            async (id: string): Promise<IUser> => {
                const user = mockUsers.find(e => {
                    return e.id === id
                })
                return user
            }
        )

        try {
            const res = await userResolver.Query.me(null, null, {
                auth: { me: null },
            })
        } catch (e) {
            expect(e.message).toBe('the authentification failed')
        }
    })

    it('throws error if UserController throws error', async () => {
        UserController.user = jest.fn(() => {
            throw new Error('es gab ein Fehler')
        })

        try {
            const res = await userResolver.Query.me(null, null, mockContext)
        } catch (e) {
            expect(e.message).toBe('es gab ein Fehler')
        }
    })
})

describe('[Mutation.signUp]', () => {
    const mockContext = {
        token: 'myToken',
    }
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

    it('throws error if arguments are null', async () => {
        UserController.user = jest.fn(() => {
            throw new Error('es gab ein Fehler')
        })

        try {
            const res = await userResolver.Mutation.signUp(
                null,
                null,
                mockContext
            )
        } catch (e) {
            expect(e.message).toBe(
                "Cannot destructure property `username` of 'undefined' or 'null'."
            )
        }
    })

    it('throws error if context is null', async () => {
        UserController.user = jest.fn(() => {
            throw new Error('es gab ein Fehler')
        })

        try {
            const res = await userResolver.Mutation.signUp(
                null,
                null,
                mockContext
            )
        } catch (e) {
            expect(e.message).toBe(
                "Cannot destructure property `username` of 'undefined' or 'null'."
            )
        }
    })
})
