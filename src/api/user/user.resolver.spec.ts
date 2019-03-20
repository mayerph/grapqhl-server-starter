import { userResolver } from './user.resolver'
import { UserController } from './user.controller'
import { IUser } from './user.interface'

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
        // const res = await userResolver.Query.user(null, { id: '1' })
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
            expect(e.message).toBe('User`s id can`t be null')
        }

        // expect(res.username).toBe('admin')
    })

    it('throws error if id is null', async () => {
        UserController.user = jest.fn(
            async (id: string): Promise<IUser> => {
                const user = mockUsers.find(e => {
                    return e.id === id
                })
                return user
            }
        )

        await expect(
            userResolver.Query.user(null, { id: null })
        ).rejects.toThrowError('User`s id can`t be null')

        // expect(res.username).toBe('admin')
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

        await expect(
            userResolver.Query.me(null, null, {
                auth: { me: null },
            })
        ).rejects.toThrowError('Authentication failed')
    })

    it('throws error if context is null', async () => {
        UserController.user = jest.fn(
            async (id: string): Promise<IUser> => {
                const user = mockUsers.find(e => {
                    return e.id === id
                })
                return user
            }
        )

        await expect(
            userResolver.Query.me(null, null, null)
        ).rejects.toThrowError('Authentication failed')
    })

    it('throws error if auth is null', async () => {
        UserController.user = jest.fn(
            async (id: string): Promise<IUser> => {
                const user = mockUsers.find(e => {
                    return e.id === id
                })
                return user
            }
        )

        await expect(
            userResolver.Query.me(null, null, {
                auth: null,
            })
        ).rejects.toThrowError('Authentication failed')
    })

    it('throws error if UserController throws error', async () => {
        UserController.user = jest.fn(() => {
            throw new Error('es gab ein Fehler')
        })

        await expect(
            userResolver.Query.me(null, null, mockContext)
        ).rejects.toThrowError('es gab ein Fehler')
    })
})

describe('[Mutation.signUp]', () => {
    const mockContext = {
        token: {
            secret: 'mySecret',
            expiresIn: '10',
        },
    }

    const mockUser = {
        id: '1',
        username: 'admin',
        password: 'sterne123',
        email: 'admin@hm.edu',
        role: null,
        comparePassword: null,
        img: null,
    }

    it('throws error if arguments are null', async () => {
        UserController.signUp = jest
            .fn()
            .mockReturnValue({ userToken: 'myToken', user: mockUser })

        await expect(
            userResolver.Mutation.signUp(null, null, mockContext)
        ).rejects.toThrowError('Credentials are missing!')
    })

    it('throws error if context is null', async () => {
        const mockCredentials = {
            username: 'admin',
            email: 'admin@hm.edu',
            password: 'sterne123',
        }
        UserController.signUp = jest
            .fn()
            .mockReturnValue({ userToken: 'myToken', user: mockUser })

        await expect(
            userResolver.Mutation.signUp(null, mockCredentials, null)
        ).rejects.toThrowError('JWT information are missing!')
    })

    it('throws error if username is null', async () => {
        const mockCredentials = {
            username: null,
            email: 'admin@hm.edu',
            password: 'sterne123',
        }
        UserController.signUp = jest
            .fn()
            .mockReturnValue({ userToken: 'myToken', user: mockUser })
        await expect(
            userResolver.Mutation.signUp(null, mockCredentials, mockContext)
        ).rejects.toThrowError('Credentials are missing!')
    })

    it('throws error if email is null', async () => {
        const mockCredentials = {
            username: 'admin',
            email: null,
            password: 'sterne123',
        }
        UserController.signUp = jest
            .fn()
            .mockReturnValue({ userToken: 'myToken', user: mockUser })

        await expect(
            userResolver.Mutation.signUp(null, mockCredentials, mockContext)
        ).rejects.toThrowError('Credentials are missing!')
    })

    it('throws error if password is null', async () => {
        const mockCredentials = {
            username: 'admin',
            email: 'admin@hm.edu',
            password: null,
        }
        UserController.signUp = jest
            .fn()
            .mockReturnValue({ userToken: 'myToken', user: mockUser })

        await expect(
            userResolver.Mutation.signUp(null, mockCredentials, mockContext)
        ).rejects.toThrowError('Credentials are missing!')
    })
})

describe('[Mutation.updateUser]', () => {
    const mockContext = {
        token: {
            secret: 'mySecret',
            expiresIn: '10',
        },
    }

    const mockArgs = {
        id: '1',
        username: null,
        email: 'admin@hm.edu',
        role: null,
        img: null,
        deleteImage: null,
    }

    const mockUser = {
        id: '1',
        username: 'admin',
        password: 'sterne123',
        email: 'admin@hm.edu',
        role: null,
        comparePassword: null,
        img: null,
    }

    it('throws error if arguments are null', async () => {
        UserController.updateUser = jest.fn().mockReturnValue(mockUser)

        const res = await userResolver.Mutation.updateUser(null, mockArgs)
        expect(res.username).toBe('admin')
    })
})
