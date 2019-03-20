import { Role } from '../../api/role/role.model'
import { Permission } from '../../api/permission/permission.model'

/**
 * drops all roles in the database.
 */
const dropRoles = async () => {
    await Role.deleteMany({}).exec()
}

/**
 * creates the default roles in the database.
 */
const createRoles = async () => {
    let adminRole
    let readerRole

    adminRole = await Role.findOne({ name: 'ADMIN' }).exec()

    if (!adminRole) {
        const permissions = await Permission.find({}).exec()
        adminRole = new Role({
            name: 'ADMIN',
            permissions,
        })
        adminRole.save()
    }

    readerRole = await Role.findOne({ name: 'READER' }).exec()
    if (!readerRole) {
        const permissionNames = ['readDefault']
        const permissions = await Permission.find({
            name: permissionNames,
        }).exec()

        readerRole = new Role({
            name: 'READER',
            permissions,
        })
        readerRole.save()
    }
}

export { createRoles, dropRoles }
