import { PermissionController } from './permission.controller'

const permissionResolver = {
    Query: {
        permissions: async (parent, args, context) => {
            return PermissionController.permissions()
        },
        permission: async (parent, { id }, context) => {
            return PermissionController.permission(id)
        },
    },

    Mutation: {
        createPermission: async (parent, { name, description }) => {
            return PermissionController.createPermission(name, description)
        },
        deletePermission: async (parent, { id }) => {
            return PermissionController.deletePermission(id)
        },
        updatePermission: async (parent, { id, name, description }) => {
            return PermissionController.updatePermission(id, name, description)
        },
    },
}

export { permissionResolver }
