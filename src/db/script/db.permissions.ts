import { Permission } from '../../api/permission/permission.model'

/**
 * drops all permissions in the database.
 */
const dropPermissions = async () => {
    await Permission.deleteMany({})
}

/**
 * creates default permissions in the database.
 */
const createPermissions = async () => {
    let adminDefaultPermission
    let readDefaultPermission
    let adminUserPermission
    let deleteUserPermission
    let updateUserPermission
    let createUserPermission
    let deleteMessagePermission
    let updateMessagePermission
    let createMessagePermission

    adminDefaultPermission = await Permission.findOne({ name: 'adminDefault' })
    if (!adminDefaultPermission) {
        adminDefaultPermission = new Permission({
            name: 'adminDefault',
            description: 'default permissions for administration',
        })
        adminDefaultPermission.save()
    }

    readDefaultPermission = await Permission.findOne({
        name: 'readDefault',
    })
    if (!readDefaultPermission) {
        readDefaultPermission = new Permission({
            name: 'readDefault',
            description: 'default permissions for reading',
        })
        readDefaultPermission.save()
    }

    deleteUserPermission = await Permission.findOne({ name: 'deleteUser' })
    if (!deleteUserPermission) {
        deleteUserPermission = new Permission({
            name: 'deleteUser',
            description: 'Ability to delete Users',
        })
        deleteUserPermission.save()
    }

    adminUserPermission = await Permission.findOne({ name: 'adminUser' })
    if (!adminUserPermission) {
        adminUserPermission = new Permission({
            name: 'adminUser',
            description: 'Ability to administrate User',
        })
        adminUserPermission.save()
    }

    updateUserPermission = await Permission.findOne({ name: 'updateUser' })
    if (!updateUserPermission) {
        updateUserPermission = new Permission({
            name: 'updateUser',
            description: 'Ability to update Users',
        })
        updateUserPermission.save()
    }

    createUserPermission = await Permission.findOne({ name: 'createUser' })
    if (!createUserPermission) {
        createUserPermission = new Permission({
            name: 'createUser',
            description: 'Ability to create Users',
        })
        createUserPermission.save()
    }

    deleteMessagePermission = await Permission.findOne({
        name: 'deleteMessage',
    })
    if (!deleteMessagePermission) {
        deleteMessagePermission = new Permission({
            name: 'deleteMessage',
            description: 'Ability to delete Messages',
        })
        deleteMessagePermission.save()
    }

    updateMessagePermission = await Permission.findOne({
        name: 'updateMessage',
    })
    if (!updateMessagePermission) {
        updateMessagePermission = new Permission({
            name: 'updateMessage',
            description: 'Ability to update Messages',
        })
        updateMessagePermission.save()
    }

    createMessagePermission = await Permission.findOne({
        name: 'createMessage',
    })
    if (!createMessagePermission) {
        createMessagePermission = new Permission({
            name: 'createMessage',
            description: 'Ability to create Messages',
        })
        createMessagePermission.save()
    }
}

export { createPermissions, dropPermissions }