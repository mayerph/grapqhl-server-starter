import { IRole } from '../role/role.interface'

/**
 * interface of an user (schema)
 * can be used to define non-static methods
 */
export interface IUser {
    id?: any
    username: string
    password: string
    email: string
    role: IRole
    comparePassword: comparePasswordFunction
    img: any
}

/**
 * interface of an user (model)
 * can be used to define static methods
 */
export interface IUserModel {}

/**
 * type of a function
 */
export type comparePasswordFunction = (
    candidatePassword: string
) => Promise<boolean>
