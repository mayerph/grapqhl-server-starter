import User, { IUserMongoose } from './user.model'
import { AuthController } from '../auth/auth.controller'
import { Role } from '../role/role.model'
import { RoleController } from '../role/role.controller'
import { FileController } from '../file/file.controller'
import { IToken, IUserToken } from '../token/token.interface'
import { IRole } from '../role/role.interface'
import { IUser } from './user.interface'

const pictureName = 'images/user/userImage'

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
    DB: {
        USERS: {
            QUERY: new Error('Error occured during users query'),
        },
        USER: {
            QUERY: new Error('Error occured during user query'),
        },
    },
}

const UserController = {
    /**
     * returns all users in the database.
     */
    users: async (): Promise<IUser[]> => {
        try {
            const users = await User.find({}).exec()
            return users
        } catch (e) {
            throw ERRORS.DB.USERS
        }
    },
    /**
     * returns a specific user by id.
     * @param id - id of the user
     */
    user: async (id: string): Promise<IUser> => {
        if (!id) {
            throw ERRORS.USER.ID
        }
        try {
            const user = await User.findById(id).exec()
            return user
        } catch (e) {
            throw ERRORS.DB.USER.QUERY
        }
    },
    /**
     * returns a user with all related properties.
     * @param id - id of the user
     */
    fullUser: async (id: string): Promise<IUserMongoose> => {
        if (!id) {
            throw ERRORS.USER.ID
        }
        try {
            const user = await User.findById(id)
                .populate({
                    path: 'role',
                    populate: [
                        {
                            path: 'permissions',
                        },
                    ],
                })
                .exec()
            return user
        } catch (e) {
            throw ERRORS.DB.USER.QUERY
        }
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
        token: { secret: string; expiresIn: string }
    ): Promise<IUserToken> => {
        const { secret, expiresIn } = { ...token }
        if (!username || !email || !password) {
            throw ERRORS.CREDENTIALS.MISSING
        }

        if (!secret || !expiresIn) {
            throw ERRORS.AUTH.NOTOKEN
        }

        const user = new User({ username, email, password })
        await user.save()

        const fullUser = await UserController.fullUser(user.id)
        return {
            userToken: {
                token: AuthController.createToken(
                    fullUser.toJSON(),
                    secret,
                    expiresIn
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
    signIn: async (
        username: string,
        password: string,
        token: any
    ): Promise<IToken> => {
        try {
            const user = await User.findOne({ username }).exec()

            if (!user) {
                throw new Error('No user found with this login credentials.')
            }
            const fullUser = await UserController.fullUser(user.id)
            const isValid = await user.comparePassword(password)

            if (!isValid) {
                throw new Error('Invalid password.')
            }
            const jwt = {
                token: AuthController.createToken(
                    fullUser.toJSON(),
                    token.secret,
                    token.expiresIn
                ),
            }
            return jwt
        } catch (e) {
            throw e
        }
    },
    /**
     * deletes specific user by id.
     * @param id - id of the user
     */
    deleteUser: async (id: string): Promise<boolean> => {
        try {
            await User.deleteOne({ _id: id }).exec()
            return true
        } catch (e) {
            const error = new Error('user not found')
            throw error
        }
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
    ): Promise<IUser> => {
        try {
            let img
            if (userImage) {
                img = await FileController.createImageFile(
                    pictureName,
                    userImage
                )
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
        } catch (e) {
            throw e
        }
    },
    /**
     * returns the role of a user.
     * @param user - user object
     */
    userRole: async (user: IUser): Promise<IRole> => {
        try {
            const role = (await User.findById(user.id)
                .populate('role')
                .exec()).role
            return role
        } catch (e) {
            throw e
        }
    },
    /**
     * returns a user object if user is owner of the message object
     */
    messageOwner: async (messageId, userId): Promise<IUser> => {
        try {
            const user = await User.findOne({
                messages: messageId,
                _id: userId,
            }).exec()
            return user
        } catch (e) {
            throw e
        }
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
    ): Promise<IUser> => {
        try {
            const user = await User.findById(id).exec()
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
        } catch (e) {
            throw e
        }
    },
}

export { UserController, ERRORS }
