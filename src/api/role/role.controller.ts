import { Role } from './role.model'

/**
 * Implements all logic related to a role.
 */
const RoleController = {
    /**
     * returns all roles in the database.
     */
    roles: async () => {
        const roles = await Role.find({}).exec()
        return roles
    },
    /**
     * returns a specific role by id.
     * @param id - id of the role
     */
    role: async (id: string) => {
        const role = await Role.findById(id).exec()
        return role
    },
    /**
     * returns all roles identified by a permission.
     * @param permission - permission
     */
    rolesByPermission: async (permission: string) => {
        const roles = await Role.find({ permissions: permission }).exec()
        return roles
    },
    /**
     * creates new role in the database.
     * @param name - name of the role
     * @param permissions - permissions related to the role
     */
    createRole: async (name, permissions) => {
        // const permissions = PermissionController.
        const role = new Role({ name, permissions })
        await role.save()
        return role
    },
    /**
     * updates an existing role.
     * @param id - id of the role
     * @param name - name of the role
     * @param permissions - permissions related to the role
     */
    updateRole: async (id, name, permissions) => {
        const role = await Role.findById(id).exec()
        if (name) {
            role.name = name
        }
        if (permissions) {
            role.permissions = permissions
        }
        await role.save()
        return role
    },
    /**
     * deletes a role by id.
     * @param id - id of the role
     */
    deleteRole: async (id: string) => {
        await Role.remove({ _id: id }).exec()
        return true
    },
    /**
     * returns the permissions of a role.
     * @param role - related role
     */
    rolePermissions: async role => {
        return (await Role.findById(role.id)
            .populate('permissions')
            .exec()).permissions
    },
}

export { RoleController }
