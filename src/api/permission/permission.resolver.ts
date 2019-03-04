import { PermissionController } from './permission.controller'

/**
 * Implementation of the GraphQL-Schema of the permission
 * every resolver-functions calls a controller-function, which contains the specific logic
 */
const permissionResolver = {
    Query: {
        /**
         * returns all permissions in the database.
         */
        permissions: async (parent, args, context) => {
            const permissions = await PermissionController.permissions()
            return permissions
        },
        /**
         * returns a specific permission by id.
         */
        permission: async (parent, { id }, context) => {
            const permission = await PermissionController.permission(id)
            return permission
        },
    },

    Mutation: {
        /**
         * creates a new permission.
         */
        createPermission: async (parent, { name, description }) => {
            const permission = await PermissionController.createPermission(
                name,
                description
            )
            return permission
        },
        /**
         * deletes a specific permission by id.
         */
        deletePermission: async (parent, { id }) => {
            const successful = await PermissionController.deletePermission(id)
            return successful
        },
        /**
         * updates an existing permission.
         */
        updatePermission: async (parent, { id, name, description }) => {
            const permission = await PermissionController.updatePermission(
                id,
                name,
                description
            )
            return permission
        },
    },
}

export { permissionResolver }
