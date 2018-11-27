import { IRole } from '../role/role.interface'

// nicht-statische Eigenschaften und Methoden
export interface IUser {
    id?: any
    username: string
    password: string
    email: string
    role: IRole
    comparePassword: comparePasswordFunction
    img: any
}

// statische Methoden
export interface IUserModel {}

export type comparePasswordFunction = (
    candidatePassword: string
) => Promise<boolean>
