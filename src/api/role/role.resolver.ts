import { RoleController } from './role.controller'
import { PermissionController } from '../permission/permission.controller'

/**
 * Implementation of the GraphQL-Schema of the role
 * every resolver-functions calls a controller-function, which contains the specific logic
 */
const roleResolver = {
    Query: {
        /**
         * returns all roles in the database.
         */
        roles: async (parent, args, context) => {
            const roles = await RoleController.roles()
            return roles
        },
        /**
         * returns specific role by id.
         */
        role: async (parent, { id }, context) => {
            const role = await RoleController.role(id)
            return role
        },
    },

    Mutation: {
        /**
         * create new role in the database.
         */
        createRole: async (parent, { name, permissions }) => {
            const role = await RoleController.createRole(name, permissions)
            return role
        },
        /**
         * deletes role by id.
         */
        deleteRole: async (parent, { id }) => {
            const successful = await RoleController.deleteRole(id)
            return successful
        },
        /**
         * updates an existing role.
         */
        updateRole: async (parent, { id, name, permissions }) => {
            const role = await RoleController.updateRole(id, name, permissions)
            return role
        },
    },
    Role: {
        /**
         * returns the permissions of a role
         */
        permissions: async (role, args, { models }) => {
            const permissions = await RoleController.rolePermissions(role)
            return permissions
        },
    },
}

export { roleResolver }
