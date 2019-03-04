import {
    permissionType,
    permissionQuery,
    permissionMutation,
    permissionEnum,
} from './schema'

/**
 * merges all graphql schema entries of the permission
 */
const permissionSchema = [
    permissionType,
    permissionQuery,
    permissionMutation,
    permissionEnum,
]
export { permissionSchema }
