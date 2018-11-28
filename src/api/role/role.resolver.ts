import { RoleController } from './role.controller'
import { PermissionController } from '../permission/permission.controller'

const roleResolver = {
    Query: {
        roles: async (parent, args, context) => {
            const roles = await RoleController.roles()
            return roles
        },
        role: async (parent, { id }, context) => {
            const role = await RoleController.role(id)
            return role
        },
    },

    Mutation: {
        createRole: async (parent, { name, permissions }) => {
            const role = await RoleController.createRole(name, permissions)
            return role
        },
        deleteRole: async (parent, { id }) => {
            const successful = await RoleController.deleteRole(id)
            return successful
        },
        updateRole: async (parent, { id, name, permissions }) => {
            const role = await RoleController.updateRole(id, name, permissions)
            return role
        },
    },
    Role: {
        permissions: async (role, args, { models }) => {
            const permissions = await RoleController.rolePermissions(role)
            return permissions
        },
    },
}

export { roleResolver }
