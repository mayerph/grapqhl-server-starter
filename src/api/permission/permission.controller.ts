import { Permission } from './permission.model'
import { RoleController } from '../role/role.controller'

const PermissionController = {
    permissions: async () => {
        return Permission.find({})
    },
    permission: async (id: string) => {
        return Permission.findById(id)
    },
    createPermission: async (name: string, description: string) => {
        const permission = new Permission({ name, description })
        await permission.save()
        return permission
    },
    updatePermission: async (id: string, name: string, description: string) => {
        const permission = await Permission.findById(id)
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
    deletePermission: async (id: string) => {
        const roles = await RoleController.rolesByPermission(id)
        if (roles.length !== 0) {
            throw new Error(
                'Permission can not be deleted. There exists a relation to a role.'
            )
        } else {
            await Permission.remove({ _id: id })
        }

        return true
    },
}

export { PermissionController }
