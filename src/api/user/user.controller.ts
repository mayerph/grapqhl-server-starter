import User from './user.model'
import { AuthController } from '../auth/auth.controller'
import { Role } from '../role/role.model'
import { RoleController } from '../role/role.controller'
import { FileController } from '../file/file.controller'

const pictureName = 'images/user/userImage'

const UserController = {
    users: async () => {
        const users = await User.find({})
        return users
    },
    user: async (id: string) => {
        const user = await User.findById(id)
        return user
    },
    fullUser: async (id: string) => {
        const user = await User.findById(id).populate({
            path: 'role',
            populate: [
                {
                    path: 'permissions',
                },
            ],
        })
        return user
    },
    signUp: async (
        username: string,
        email: string,
        password: string,
        token: any
    ) => {
        const user = new User({ username, email, password })
        await user.save()
        return {
            userToken: {
                token: AuthController.createToken(
                    user.toJSON(),
                    token.secret,
                    token.expiresIn
                ),
            },
            user,
        }
    },
    signIn: async (username: string, password: string, token: any) => {
        const user = await User.findOne({ username })

        if (!user) {
            throw new Error('No user found with this login credentials.')
        }
        const fullUser = await UserController.fullUser(user.id)
        const isValid = await user.comparePassword(password)

        if (!isValid) {
            throw new Error('Invalid password.')
        }
        return {
            token: AuthController.createToken(
                fullUser.toJSON(),
                token.secret,
                token.expiresIn
            ),
        }
    },
    deleteUser: async (id: string) => {
        await User.remove({ _id: id })
        return true
    },
    createUser: async (
        username: string,
        email: string,
        password: string,
        roleId: string,
        userImage: any
    ) => {
        let img
        if (userImage) {
            img = await FileController.createImageFile(pictureName, userImage)
            img.save()
        }
        const userRole = await RoleController.role(roleId)
        const user = new User({
            username,
            email,
            password,
            role: userRole,
            img,
        })
        await user.save()
        return user
    },
    userRole: async user => {
        return (await User.findById(user.id)
            .populate('role')
            .exec()).role
    },
    messageOwner: async (messageId, userId) => {
        const user = await User.findOne({ messages: messageId, _id: userId })
        return user
    },
    updateUser: async (
        id: any,
        username: string,
        password: string,
        email: string,
        roleId: string,
        userImage: any
    ) => {
        const user = await User.findById(id)
        if (username) {
            user.username = username
        }
        if (password) {
            user.password = password
        }
        if (email) {
            user.email = email
        }
        if (roleId) {
            const userRole = await RoleController.role(roleId)
            user.role = userRole
        }
        if (userImage) {
            const img = await FileController.createImageFile(
                pictureName,
                userImage
            )

            user.img = img
        }

        await user.save()

        return user
    },
}

export { UserController }
