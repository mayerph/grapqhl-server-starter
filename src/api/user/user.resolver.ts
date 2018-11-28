import { UserController } from './user.controller'
import { FileController } from '../file/file.controller'

const userResolver = {
    Query: {
        users: async (parent, args, context) => {
            const users = await UserController.users()
        },
        user: async (parent, { id }, context) => {
            const user = await UserController.user(id)
            return user
        },
        me: async (parent, args, { auth: { me } }) => {
            const user = await UserController.user(me.id)
            return user
        },
    },

    Mutation: {
        signUp: async (parent, { username, email, password }, { token }) => {
            const userToken = await UserController.signUp(
                username,
                email,
                password,
                token
            )
            return userToken
        },
        signIn: async (parent, { username, password }, { token }) => {
            const userToken = await UserController.signIn(
                username,
                password,
                token
            )
            return userToken
        },
        deleteUser: async (parent, { id }, context) => {
            const successful = await UserController.deleteUser(id)
            return successful
        },
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
            return user
        },
        updateUser: async (
            parent,
            { id, username, password, email, role, img },
            context
        ) => {
            const user = await UserController.updateUser(
                id,
                username,
                password,
                email,
                role,
                img
            )
            return user
        },
    },
    User: {
        role: async (user, args, { models }) => {
            return UserController.userRole(user)
        },
        img: async (user, args, { models }) => {
            return FileController.file(user.img)
        },
    },
}

export { userResolver }
