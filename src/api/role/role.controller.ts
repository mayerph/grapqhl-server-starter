import { Role } from './role.model'

const RoleController = {
    roles: async () => {
        return Role.find({})
    },
    role: async (id: string) => {
        return Role.findById(id)
    },
    rolesByPermission: async (permission: string) => {
        return Role.find({ permissions: permission })
    },
    createRole: async (name, permissions) => {
        // const permissions = PermissionController.
        const role = new Role({ name, permissions })
        await role.save()
        return role
    },
    updateRole: async (id, name, permissions) => {
        const role = await Role.findById(id)
        if (name) {
            role.name = name
        }
        if (permissions) {
            role.permissions = permissions
        }
        await role.save()
        return role
    },
    deleteRole: async (id: string) => {
        await Role.remove({ _id: id })
        return true
    },
    rolePermissions: async role => {
        return (await Role.findById(role.id)
            .populate('permissions')
            .exec()).permissions
    },
}

export { RoleController }
