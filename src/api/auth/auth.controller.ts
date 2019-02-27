import jwt from 'jsonwebtoken'
import { IUser } from '../user/user.interface'

/**
 * Auth-Controller.
 * Implements the logic for the authentication and authorization.
 */
const AuthController = {
    /**
     * Creates a JSON Web Token.
     * @param {IUser} user - user, that has to be encoded.
     * @param {string} secret - private key for token generation.
     * @param {string} expiresIn - valid time of the token.
     */
    createToken: async (user: IUser, secret: string, expiresIn: string) => {
        const token = await jwt.sign(user, secret, { expiresIn })
        return token
    },

    /**
     * Verifies a JSON Web Token.
     * @param {string} token - token to be verified.
     */
    verifyToken: async (userToken: string) => {
        try {
            return await jwt.verify(userToken, process.env.SECRET)
        } catch (e) {
            throw new Error('session expired')
        }
    },
}

export { AuthController }
