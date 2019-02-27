/**
 * interface of a permission (schema)
 * can be used to define non-static methods
 */
export interface IPermission {
    id?: any
    name: string
    description: string
}

/**
 * interface of a permission (model)
 * can be used to define static methods
 */
export interface IPermissionModel {}
