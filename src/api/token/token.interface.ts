import { IUser } from '../user/user.interface'

export interface IUserToken {
    userToken: IToken
    user: IUser
}

export interface IToken {
    token: string | object
}
