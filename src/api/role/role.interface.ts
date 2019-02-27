/**
 * interface of a role (schema)
 * can be used to define non-static methods
 */
export interface IRole {
    id?: any
    name: string
    permissions: string[]
}

/**
 * interface of a role (model)
 * can be used to define static methods
 */
export interface IRoleModel {}
