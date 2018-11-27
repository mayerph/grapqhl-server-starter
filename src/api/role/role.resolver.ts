import { RoleController } from './role.controller'
import { PermissionController } from '../permission/permission.controller'

const roleResolver = {
    Query: {
        roles: async (parent, args, context) => {
            return RoleController.roles()
        },
        role: async (parent, { id }, context) => {
            return RoleController.role(id)
        },
    },

    Mutation: {
        createRole: async (parent, { name, permissions }) => {
            return RoleController.createRole(name, permissions)
        },
        deleteRole: async (parent, { id }) => {
            return RoleController.deleteRole(id)
        },
        updateRole: async (parent, { id, name, permissions }) => {
            return RoleController.updateRole(id, name, permissions)
        },
    },
    Role: {
        permissions: async (role, args, { models }) => {
            return RoleController.rolePermissions(role)
        },
    },
}

export { roleResolver }
