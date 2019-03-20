import { Permission } from './permission.model'
import { RoleController } from '../role/role.controller'

/**
 * Implements all logic related to the permission.
 */
const PermissionController = {
    /**
     * returns all permissions in the database.
     */
    permissions: async () => {
        const permissions = await Permission.find({}).exec()
        return permissions
    },
    /**
     * returns a specific permission by id.
     * @param id - id of the permission
     */
    permission: async (id: string) => {
        const permission = await Permission.findById(id).exec()
        return permission
    },
    /**
     * creates a new permission
     * @param name - name of the permission
     * @param description - description of the new permission
     */
    createPermission: async (name: string, description: string) => {
        const permission = new Permission({ name, description })
        await permission.save()
        return permission
    },

    /**
     * updates an existing permission
     * @param id - id of the permission
     * @param name - updated name of the permission
     * @param description - updated description of the permission
     */
    updatePermission: async (id: string, name: string, description: string) => {
        const permission = await Permission.findById(id).exec()
        if (permission) {
            if (name) {
                permission.name = name
            }
            if (description) {
                permission.description = description
            }
        } else {
            throw new Error('Permission does not exist')
        }
        await permission.save()
        return permission
    },

    /**
     * deletes a permission by id
     * @param - id of the permission to be deleted
     */
    deletePermission: async (id: string) => {
        const roles = await RoleController.rolesByPermission(id)
        if (roles.length !== 0) {
            throw new Error(
                'Permission can not be deleted. There exists a relation to a role.'
            )
        } else {
            await Permission.remove({ _id: id }).exec()
        }

        return true
    },
}

export { PermissionController }
