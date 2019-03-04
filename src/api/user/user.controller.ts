import User from './user.model'
import { AuthController } from '../auth/auth.controller'
import { Role } from '../role/role.model'
import { RoleController } from '../role/role.controller'
import { FileController } from '../file/file.controller'

const pictureName = 'images/user/userImage'

const UserController = {
    /**
     * returns all users in the database.
     */
    users: async () => {
        const users = await User.find({})
        return users
    },
    /**
     * returns a specific user by id.
     * @param id - id of the user
     */
    user: async (id: string) => {
        const user = await User.findById(id)
        return user
    },
    /**
     * returns a user with all related properties.
     * @param id - id of the user
     */
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
    /**
     * processes a sign up operation
     * @param username - username of the user
     * @param email - email of the user
     * @param password - password of the user
     * @param token - JSON Web Token of the user
     */
    signUp: async (
        username: string,
        email: string,
        password: string,
        token: any
    ) => {
        const user = new User({ username, email, password })
        await user.save()
        const fullUser = await UserController.fullUser(user.id)
        return {
            userToken: {
                token: AuthController.createToken(
                    fullUser.toJSON(),
                    token.secret,
                    token.expiresIn
                ),
            },
            user,
        }
    },
    /**
     * processes a sign in operation
     * @param username - username of the user
     * @param password - password of the user
     * @param token - JSON Web Token of the user
     */
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
    /**
     * deletes specific user by id.
     * @param id - id of the user
     */
    deleteUser: async (id: string) => {
        await User.remove({ _id: id })
        return true
    },
    /**
     * creates a new user
     * @param username - name of user
     * @param email - email of user
     * @param password - password of user
     * @param roleId - id of the role
     * @param userImage - image of user
     */
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
    /**
     * returns the role of a user.
     * @param user - user object
     */
    userRole: async user => {
        return (await User.findById(user.id)
            .populate('role')
            .exec()).role
    },
    /**
     * returns a user object if user is owner of the message object
     */
    messageOwner: async (messageId, userId) => {
        const user = await User.findOne({ messages: messageId, _id: userId })
        return user
    },
    /**
     * updates existing user.
     * @param id - id of user
     * @param username - name of user
     * @param password - password of user
     * @param email - email of user
     * @param roleId - id of the role
     * @param userImage - image of the user
     * @param deleteImage - information, if image should be removed
     */
    updateUser: async (
        id: any,
        username: string,
        password: string,
        email: string,
        roleId: string,
        userImage: any,
        deleteImage: boolean
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

        if (deleteImage) {
            user.img = null
        }

        await user.save()

        return user
    },
}

export { UserController }
