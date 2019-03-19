import { UserController } from './user.controller'
import { FileController } from '../file/file.controller'
import { pubsub } from '../app'
import { IUser } from './user.interface'
import { IToken } from '../token/token.interface'
import { IFile, FileUpload } from '../file/file.interface'
import { IRole } from '../role/role.interface'

// constant for all user events
const EVENTS = {
    USER: {
        CREATED: 'USER_CREATED',
        UPDATED: 'USER_UPDATED',
        DELETED: 'USER_DELETED',
    },
}

// constant for all errors for the resolvers
const ERRORS = {
    CREDENTIALS: {
        MISSING: new Error('Credentials are missing!'),
    },
    USER: {
        OBJECT: new Error('User object is missing!'),
        ID: {
            MISSING: new Error('User`s id can`t be null'),
        },
    },
    AUTH: {
        NOUSER: new Error('Authentication failed'),
        NOTOKEN: new Error('JWT information are missing!'),
    },
}

/**
 * Implementation of the GraphQL-Schema of the user
 * every resolver-functions calls a controller-function, which contains the specific logic
 */
const userResolver = {
    Query: {
        /**
         * returns all users in the database.
         */
        users: async () => {
            const users = await UserController.users()
            return users
        },
        /**
         * returns specific user by id.
         */
        user: async (parent: any, args: { id: string }): Promise<IUser> => {
            const { id } = { ...args }
            if (!id) {
                throw ERRORS.USER.ID.MISSING
            }
            const user = await UserController.user(id)
            return user
        },
        /**
         * returns the user-information of the requesting user
         */
        me: async (
            parent: any,
            args: any,
            context: { auth: { me: IUser } }
        ): Promise<IUser> => {
            const { auth } = { ...context }
            const { me } = { ...auth }
            if (!me) {
                throw ERRORS.AUTH.NOUSER
            }
            const user = await UserController.user(me.id)
            return user
        },
    },

    Mutation: {
        /**
         * processes a sign-up operation.
         */
        signUp: async (
            parent: any,
            args: { username: string; email: string; password: string },
            context: { token: { secret: string; expiresIn: string } }
        ): Promise<IToken> => {
            const { username, email, password } = {
                ...args,
            }
            if (!username || !email || !password) {
                throw ERRORS.CREDENTIALS.MISSING
            }

            const { token = null } = { ...context }
            if (!token) {
                throw ERRORS.AUTH.NOTOKEN
            }
            const { userToken, user } = await UserController.signUp(
                username,
                email,
                password,
                token
            )
            // triggers the userCreated event subscription
            await pubsub.publish(EVENTS.USER.CREATED, {
                userCreated: user,
            })
            return userToken
        },
        /**
         * processes a sign-in operation.
         */
        signIn: async (
            parent: any,
            args: { username: string; password: string },
            context: { token: string }
        ): Promise<IToken> => {
            const { username, password } = { ...args }
            if (!username || !password) {
                throw ERRORS.CREDENTIALS.MISSING
            }

            const { token } = { ...context }
            if (!token) {
                throw ERRORS.AUTH.NOTOKEN
            }
            const userToken = await UserController.signIn(
                username,
                password,
                token
            )
            return userToken
        },
        /**
         * deletes a specific user by id.
         */
        deleteUser: async (
            parent: any,
            args: { id: string }
        ): Promise<boolean> => {
            const { id } = { ...args }
            if (!id) {
                throw ERRORS.USER.ID.MISSING
            }
            const successful = await UserController.deleteUser(id)
            // triggers the userDeleted event and subscription
            await pubsub.publish(EVENTS.USER.DELETED, {
                userDeleted: id,
            })
            return successful
        },
        /**
         * creates a new user.
         */
        createUser: async (
            parent: any,
            args: {
                username: string
                email: string
                password: string
                role: string
                img?: FileUpload
            }
        ): Promise<IUser> => {
            const { username, email, password, role, img } = { ...args }
            const user = await UserController.createUser(
                username,
                email,
                password,
                role,
                img
            )
            // triggers the userCreated event and subscription
            await pubsub.publish(EVENTS.USER.CREATED, {
                userCreated: user,
            })

            return user
        },
        /**
         * updates an existing user.
         */
        updateUser: async (
            parent: any,
            args: {
                id: string
                username?: string
                password?: string
                email?: string
                role?: string
                img?: FileUpload
                deleteImage?: boolean
            }
        ): Promise<IUser> => {
            const { id, username, password, email, role, img, deleteImage } = {
                ...args,
            }
            if (!id) {
                throw ERRORS.USER.ID.MISSING
            }
            const user = await UserController.updateUser(
                id,
                username,
                password,
                email,
                role,
                img,
                deleteImage
            )
            // triggers the userUpdated event and subscription
            await pubsub.publish(EVENTS.USER.UPDATED, {
                userUpdated: user,
            })
            return user
        },
        /**
         * updates the user-information of the requesting user.
         */
        updateMe: async (
            parent,
            args: {
                username?: string
                password?: string
                email?: string
                role?: string
                img?: FileUpload
                deleteImage?: boolean
            },
            context: {
                auth: {
                    me: IUser
                }
            }
        ): Promise<IUser> => {
            const { username, password, email, role, img, deleteImage } = {
                ...args,
            }
            const { auth } = { ...context }
            const { me } = { ...auth }

            if (!me) {
                throw ERRORS.AUTH.NOUSER
            }

            const user = await UserController.updateUser(
                me.id,
                username,
                password,
                email,
                role,
                img,
                deleteImage
            )
            // triggers the userUpdated event and subscription
            await pubsub.publish(EVENTS.USER.UPDATED, {
                userUpdated: user,
            })
            return user
        },
    },
    Subscription: {
        /**
         * subscription, that triggers if a new user has been created.
         */
        userCreated: {
            subscribe: () => pubsub.asyncIterator([EVENTS.USER.CREATED]),
        },
        /**
         * subscription, that triggers if a user has been updated.
         */
        userUpdated: {
            subscribe: () => pubsub.asyncIterator([EVENTS.USER.UPDATED]),
        },
        /**
         * subscription, that triggers if a user has been deleted
         */
        userDeleted: {
            subscribe: () => pubsub.asyncIterator([EVENTS.USER.DELETED]),
        },
    },
    User: {
        /**
         * returns the role of a user.
         */
        role: async (user: IUser): Promise<IRole> => {
            if (!user) {
                throw ERRORS.USER.OBJECT
            }
            return UserController.userRole(user)
        },
        /**
         * returns the image of user.
         */
        img: async (user: IUser): Promise<IFile> => {
            if (!user) {
                throw ERRORS.USER.OBJECT
            }
            return FileController.file(user.img)
        },
    },
}

export { userResolver }
