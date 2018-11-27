import User from './user.model'
import { AuthController } from '../auth/auth.controller'
import { Role } from '../role/role.model'
import { RoleController } from '../role/role.controller'
import { FileController } from '../file/file.controller'

const pictureName = 'userImage'

const UserController = {
    users: async () => {
        return User.find({})
    },
    user: async (id: string) => {
        return User.findById(id)
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
            token: AuthController.createToken(
                user.toJSON(),
                token.secret,
                token.expiresIn
            ),
        }
    },
    signIn: async (username: string, password: string, token: any) => {
        const user = await User.findOne({ username })

        if (!user) {
            throw new Error('No user found with this login credentials.')
        }

        const isValid = await user.comparePassword(password)

        if (!isValid) {
            throw new Error('Invalid password.')
        }
        return {
            token: AuthController.createToken(
                user.toJSON(),
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
            img = await FileController.createImageFile(pictureName, img)
            img.save()
        }
        const userRole = await RoleController.role(roleId)
        const user = new User({ username, email, password, userRole, img })
        await user.save()
        return user
    },
    userRole: async user => {
        return (await User.findById(user.id)
            .populate('role')
            .exec()).role
    },
    messageOwner: async (messageId, userId) => {
        return User.findOne({ messages: messageId, _id: userId })
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
            console.log(img)
            user.img = img
        }

        user.save()

        return user
    },
}

export { UserController }
