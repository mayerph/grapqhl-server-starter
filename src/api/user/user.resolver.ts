import { UserController } from './user.controller'
import { FileController } from '../file/file.controller'

const userResolver = {
    Query: {
        users: async (parent, args, context) => {
            return UserController.users()
        },
        user: async (parent, { id }, context) => {
            return UserController.user(id)
        },
        me: async (parent, args, { auth: { me } }) => {
            return UserController.user(me.id)
        },
    },

    Mutation: {
        signUp: async (parent, { username, email, password }, { token }) => {
            return UserController.signUp(username, email, password, token)
        },
        signIn: async (parent, { username, password }, { token }) => {
            return UserController.signIn(username, password, token)
        },
        deleteUser: async (parent, { id }, context) => {
            return UserController.deleteUser(id)
        },
        createUser: async (
            parent,
            { username, email, password, role, img },
            context
        ) => {
            return UserController.createUser(
                username,
                email,
                password,
                role,
                img
            )
        },
        updateUser: async (
            parent,
            { id, username, password, email, role, img },
            context
        ) => {
            return UserController.updateUser(
                id,
                username,
                password,
                email,
                role,
                img
            )
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
