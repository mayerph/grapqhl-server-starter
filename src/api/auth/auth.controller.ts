import jwt from 'jsonwebtoken'
import { IUser } from '../user/user.interface'

const AuthController = {
    createToken: async (user: IUser, secret: string, expiresIn: string) => {
        const token = await jwt.sign(user, secret, { expiresIn })
        return token
    },
    verifyToken: async (userToken: string) => {
        try {
            return await jwt.verify(userToken, process.env.SECRET)
        } catch (e) {
            throw new Error('session expired')
        }
    },
}

export { AuthController }
