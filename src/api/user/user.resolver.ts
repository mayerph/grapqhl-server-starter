import { UserController } from './user.controller'
import { FileController } from '../file/file.controller'
import { pubsub } from '../app'

// constant for all user events
const EVENTS = {
    USER: {
        CREATED: 'USER_CREATED',
        UPDATED: 'USER_UPDATED',
        DELETED: 'USER_DELETED',
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
        users: async (parent, args, context) => {
            const users = await UserController.users()
            return users
        },
        /**
         * returns specific user by id.
         */
        user: async (parent, { id }, context) => {
            const user = await UserController.user(id)
            return user
        },
        /**
         * returns the user-information of the requesting user
         */
        me: async (parent, args, { auth: { me } }) => {
            const user = await UserController.user(me.id)
            return user
        },
    },

    Mutation: {
        /**
         * processes a sign-up operation.
         */
        signUp: async (parent, { username, email, password }, { token }) => {
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
        signIn: async (parent, { username, password }, { token }) => {
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
        deleteUser: async (parent, { id }, context) => {
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
            parent,
            { username, email, password, role, img },
            context
        ) => {
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
            parent,
            { id, username, password, email, role, img, deleteImage },
            context
        ) => {
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
            { username, password, email, role, img, deleteImage },
            { auth: { me } }
        ) => {
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
        role: async (user, args, { models }) => {
            return UserController.userRole(user)
        },
        /**
         * returns the image of user.
         */
        img: async (user, args, { models }) => {
            return FileController.file(user.img)
        },
    },
}

export { userResolver }
