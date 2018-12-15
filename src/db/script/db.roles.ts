import { Role } from '../../api/role/role.model'
import { Permission } from '../../api/permission/permission.model'

const dropRoles = async () => {
    await Role.deleteMany({})
}
const createRoles = async () => {
    let adminRole
    let readerRole

    adminRole = await Role.findOne({ name: 'ADMIN' })

    if (!adminRole) {
        const permissions = await Permission.find({})
        adminRole = new Role({
            name: 'ADMIN',
            permissions,
        })
        adminRole.save()
    }

    readerRole = await Role.findOne({ name: 'READER' })
    if (!readerRole) {
        const permissionNames = ['createMessage', 'deleteMessage']
        const permissions = await Permission.find({ name: permissionNames })

        readerRole = new Role({
            name: 'READER',
            permissions,
        })
        readerRole.save()
    }
}

export { createRoles, dropRoles }
