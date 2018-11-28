import { PermissionController } from './permission.controller'

const permissionResolver = {
    Query: {
        permissions: async (parent, args, context) => {
            const permissions = await PermissionController.permissions()
            return permissions
        },
        permission: async (parent, { id }, context) => {
            const permission = await PermissionController.permission(id)
            return permission
        },
    },

    Mutation: {
        createPermission: async (parent, { name, description }) => {
            const permission = await PermissionController.createPermission(
                name,
                description
            )
            return permission
        },
        deletePermission: async (parent, { id }) => {
            const successful = await PermissionController.deletePermission(id)
            return successful
        },
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
